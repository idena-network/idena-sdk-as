import {
  Node,
  FunctionDeclaration,
  NodeKind,
  Source,
  SourceKind,
  TypeNode,
  ClassDeclaration,
  DeclarationStatement,
  CommonFlags,
  FieldDeclaration,
  ParameterNode,
} from 'visitor-as/as';
import {BaseVisitor, utils} from 'visitor-as';
import {SimpleParser, toString, makeSnakeCase} from './utils';

const IDENA_DECORATOR = 'idenaBindgen';
const IDENA_IGNORE_FUNC_DECORATOR = 'idenaBindgenIgnore';
const WRAPPER_PREFIX = '__wrapper_';

function returnsVoid(node: FunctionDeclaration): boolean {
  return toString(node.signature.returnType) === 'void';
}

function numOfParameters(node: FunctionDeclaration): number {
  return node.signature.parameters.length;
}

function hasIdenaDecorator(stmt: Source): boolean {
  const res =
    isUserFile(stmt) ||
    stmt.statements.some(
      (s) =>
        s instanceof DeclarationStatement &&
        utils.hasDecorator(s, IDENA_DECORATOR)
    );
  if (res) {
    console.log(
      `transformed file path=${stmt.normalizedPath} entry=${stmt.range.source.sourceKind}`
    );
  }
  return res;
}

export function isEntry(source: Source | Node): boolean {
  return source.range.source.sourceKind == SourceKind.USER_ENTRY;
}

export function isUserFile(source: Source | Node): boolean {
  return (
    source.range.source.sourceKind == SourceKind.USER_ENTRY ||
    source.range.source.sourceKind == SourceKind.USER
  );
}

function isClass(type: Node): boolean {
  return type.kind == NodeKind.CLASSDECLARATION;
}

function isField(mem: DeclarationStatement) {
  return mem.kind == NodeKind.FIELDDECLARATION;
}

function isStatic(mem: DeclarationStatement) {
  return mem.is(CommonFlags.STATIC);
}

function isEncodable(mem: DeclarationStatement) {
  return isField(mem) && !isStatic(mem);
}

function isPayable(func: FunctionDeclaration): boolean {
  return (
    func.decorators != null &&
    func.decorators.some((s) => toString(s.name) != 'payable')
  );
}

function createDecodeStatements(_class: ClassDeclaration): string[] {
  return _class.members
    .filter(isEncodable)
    .map((field: FieldDeclaration): string => {
      const name = toString(field.name);
      return (
        createDecodeStatement(field, `this.${name} = obj.has("${name}") ? `) +
        `: ${
          field.initializer != null
            ? toString(field.initializer)
            : `this.${name}`
        };`
      );
    });
}

function createPtrDecodeStatement(
  field: FieldDeclaration | ParameterNode,
  setterPrefix = ''
): string {
  let T = toString(field.type!);
  let name = toString(field.name);
  return `${setterPrefix}readRegion<${T}>(${name})`;
}

function createDecodeStatement(
  field: FieldDeclaration | ParameterNode,
  setterPrefix = ''
): string {
  let T = toString(field.type!);
  let name = toString(field.name);
  return `${setterPrefix}decode<${T}, JSON.Obj>(obj, "${name}")`;
}

function createEncodeStatements(_class: ClassDeclaration): string[] {
  return _class.members
    .filter(isEncodable)
    .map((field: FieldDeclaration): string => {
      let T = toString(field.type!);
      let name = toString(field.name);
      return `encode<${T}, JSONEncoder>(this.${name}, "${name}", encoder);`;
    });
}

// TODO: Extract this into separate module, preferrable pluggable
export class JSONBindingsBuilder extends BaseVisitor {
  private sb: string[] = [];
  private exportedClasses: Map<string, ClassDeclaration> = new Map();
  static isTest = false;
  wrappedFuncs: Set<string> = new Set();

  static build(source: Source): string {
    return new JSONBindingsBuilder().build(source);
  }

  static idenaFiles(sources: Source[]): Source[] {
    return sources.filter(hasIdenaDecorator);
  }

  static checkTestBuild(sources: Source[]) {
    this.isTest = sources.some((s) => s.normalizedPath.includes('.spec.'));
  }

  visitClassDeclaration(node: ClassDeclaration): void {
    if (!this.exportedClasses.has(toString(node.name))) {
      this.exportedClasses.set(toString(node.name), node);
    }
    super.visitClassDeclaration(node);
  }

  needsWrapper(node: FunctionDeclaration): boolean {
    let isExport = node.is(CommonFlags.EXPORT);
    let alreadyWrapped = this.wrappedFuncs.has(toString(node.name));
    let noInputOrOutput = numOfParameters(node) == 0 && returnsVoid(node);
    let isIgnore = utils.hasDecorator(node, IDENA_IGNORE_FUNC_DECORATOR);
    if (
      isIgnore ||
      !isExport ||
      alreadyWrapped ||
      noInputOrOutput ||
      JSONBindingsBuilder.isTest
    )
      return false;
    return isEntry(node) || utils.hasDecorator(node, IDENA_DECORATOR);
  }

  visitFunctionDeclaration(node: FunctionDeclaration): void {
    if (!this.needsWrapper(node)) {
      if (
        (isEntry(node) || utils.hasDecorator(node, IDENA_DECORATOR)) &&
        !this.wrappedFuncs.has(toString(node.name)) &&
        node.is(CommonFlags.EXPORT)
      ) {
        this.sb.push(this.camelCaseToSnakeCaseExport(toString(node.name), ''));
        this.wrappedFuncs.add(toString(node.name));
      }
      super.visitFunctionDeclaration(node);
      return;
    }
    this.generateWrapperFunction(node);
    // Change function to not be an export
    node.flags = node.flags ^ CommonFlags.EXPORT;
    this.wrappedFuncs.add(toString(node.name));
    super.visit(node);
  }

  camelCaseToSnakeCaseExport(
    name: string,
    prefix: string = WRAPPER_PREFIX
  ): string {
    let s = makeSnakeCase(name);
    if (s.normalize() === name.normalize()) {
      return '';
    }
    return `export { ${prefix + name} as ${s} }`;
  }

  /*
  Create a wrapper function that will be export in the function's place.
  */
  private generateWrapperFunction(func: FunctionDeclaration) {
    let signature = func.signature;
    let params = signature.parameters;
    let returnType = signature.returnType;
    let returnTypeName = toString(returnType)
      .split('|')
      .map((name) => name.trim())
      .filter((name) => name !== 'null')
      .join('|');
    let hasNull = toString(returnType).includes('null');
    let name = func.name.text;
    if (func.decorators && func.decorators.length > 0) {
      this.sb.push(
        func.decorators.map((decorator) => toString(decorator)).join('\n')
      );
    }

    var ptrParamsSb = params
      .map((param) => {
        let name = toString(param.name);
        return `${name} : u32`;
      })
      .join(', ');

    var wrappedReturnType = 'void';
    if (toString(returnType) !== 'void') {
      wrappedReturnType = 'usize';
    }

    this.sb.push(
      `function __wrapper_${name}(${ptrParamsSb}): ${wrappedReturnType} {`
    );
    if (toString(returnType) !== 'void') {
      this.sb.push(`  let result: ${toString(returnType)} = ${name}(`);
    } else {
      this.sb.push(`  ${name}(`);
    }
    if (params.length > 0) {
      this.sb[this.sb.length - 1] += params
        .map((param) => {
          let name = toString(param.name);
          let type = toString(param.type);
          let res = `${name}>0 ? ${createPtrDecodeStatement(param)} : ${
            param.initializer
              ? toString(param.initializer)
              : `requireParameter<${type}>("${name}")`
          }`;
          return res;
        })
        .join(',\n    ');
    }
    this.sb[this.sb.length - 1] += ');';
    if (toString(returnType) !== 'void') {
      this.sb.push(`
      return write_region<${toString(returnType)}>(result);`);
    }
    this.sb.push(`}
export { ${WRAPPER_PREFIX + name} as ${name} }
${this.camelCaseToSnakeCaseExport(name)}
`);
  }

  private typeName(type: TypeNode | ClassDeclaration): string {
    if (!isClass(type)) {
      return toString(type);
    }
    type = <ClassDeclaration>type;
    let className = toString(type.name);
    if (type.isGeneric) {
      className += '<' + type.typeParameters!.map(toString).join(', ') + '>';
    }
    return className;
  }

  build(source: Source): string {
    this.sb = [];
    this.visit(source);

    let sourceText = source.statements.map((stmt) => {
      let str;

      if (isClass(stmt)) {
        let _class = <ClassDeclaration>stmt;
        let isIgnore = utils.hasDecorator(_class, IDENA_IGNORE_FUNC_DECORATOR);
        if (!isIgnore) {
          let fields = _class.members
            .filter(isField)
            .map((field: FieldDeclaration) => field);
          if (fields.some((field) => field.type == null)) {
            throw new Error('All Fields must have explicit type declaration.');
          }
          fields.forEach((field) => {
            if (field.initializer == null) {
              field.initializer = SimpleParser.parseExpression(
                `defaultValue<${toString(field.type!)}>())`
              );
            }
          });
          str = toString(stmt);
          str = str.slice(0, str.lastIndexOf('}'));
          let className = this.typeName(_class);
          str += `
  decode<_V = Uint8Array>(buf: _V): ${className} {
    let json: JSON.Obj;
    if (buf instanceof Uint8Array) {
      json = JSON.parse(buf);
    } else {
      assert(buf instanceof JSON.Obj, "argument must be Uint8Array or Json Object");
      json = <JSON.Obj> buf;
    }
    return this._decode(json);
  }

  static decode(buf: Uint8Array): ${className} {
    return decode<${className}>(buf);
  }

  private _decode(obj: JSON.Obj): ${className} {
    ${createDecodeStatements(_class).join('\n    ')}    
    return this;
  }

  _encode(name: string | null = "", _encoder: JSONEncoder | null = null): JSONEncoder {
    let encoder = _encoder == null ? new JSONEncoder() : _encoder;
    encoder.pushObject(name);
    ${createEncodeStatements(_class).join('\n    ')}
    encoder.popObject();
    return encoder;
  }
  encode(): Uint8Array {
    return this._encode().serialize();
  }

  serialize(): Uint8Array {
    return this.encode();
  }

  toJSON(): string {
    return this._encode().toString();
  }
}`;
        } else {
          str = toString(stmt);
        }
      } else {
        str = toString(stmt);
      }
      return str;
    });
    return sourceText.concat(this.sb).join('\n');
  }
}
