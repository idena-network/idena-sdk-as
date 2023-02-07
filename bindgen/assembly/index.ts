import { JSONEncoder as _JSONEncoder, JSON } from "idena-assemblyscript-json";
import { Bytes, env, u256, storage, util, u128, allocate, Address, base64, debug, Balance} from 'idena-sdk-core';
// Runtime functions
// tslint:disable: no-unsafe-any
/* eslint-disable  @typescript-eslint/no-unused-vars */

// @ts-ignore
@global 
function __allocate(size : u32) : usize {
  return allocate(size);
}


// @ts-ignore
@global
function isNull<T>(t: T): bool {
  if (isNullable<T>() || isReference<T>()) {
    return changetype<usize>(t) == 0;
  }
  return false;
}

// @ts-ignore
@global
function notPayable(): void {
  return;
}

// @ts-ignore
@global
function requireParameter<T>(name: string): T {
  assert(
    false,
    "Parameter " +
      name +
      " with type " +
      nameof<T>() +
      " is required but missing"
  );
  return defaultValue<T>();
}

@global
class JSONEncoder extends _JSONEncoder {
  encode<T>(name: string, val: T): void {
    encode<T, JSONEncoder>(val, name, this);
  }
}

type Usize = u64;

@global
function log(str : string) : void {
  debug(str);
}


// @ts-ignore
@global
function encode<T, Output = Uint8Array>(
  value: T,
  name: string | null = "",
  encoder: JSONEncoder = new JSONEncoder()
): Output {
  if (isBoolean<T>()) {
    // @ts-ignore
    encoder.setBoolean(name, value);
  } else if (isInteger<T>()) {
    if (value instanceof i64 || value instanceof u64) {
      // @ts-ignore
      encoder.setString(name, value.toString());
    } else {
      // @ts-ignore
      encoder.setInteger(name, value);
    }
  } else if (isFloat<T>()) {
    // @ts-ignore
    encoder.setFloat(name, value);
  } else if (isString<T>()) {
    if (isNull<T>(value)) {
      encoder.setNull(name);
    } else {
      // @ts-ignore
      encoder.setString(name, value);
    }
  } else if (isReference<T>()) {
    // @ts-ignore
    if (isNull<T>(value)) {
      encoder.setNull(name);
    } else {
      // @ts-ignore
      if (isDefined(value._encode)) {
        if (isNullable<T>()) {
          if (value != null) {
            // @ts-ignore
            value._encode(name, encoder);
          } else {
            encoder.setNull(name);
          }
        } else {
          // @ts-ignore
          value._encode(name, encoder);
        }
      } else if (isArrayLike<T>(value)) {
        if (value instanceof Uint8Array) {
          // @ts-ignore
          encoder.setString(name, base64.encode(<Uint8Array>value));
        } else {
          encoder.pushArray(name);
          for (let i: i32 = 0; i < value.length; i++) {
            // @ts-ignore
            encode<valueof<T>, JSONEncoder>(value[i], null, encoder);
          }
          encoder.popArray();
        }
      } else {

        if (value instanceof Balance) {
          encoder.setString(name, value.toString());
        }
        // Is an object
        if (value instanceof u128) {
          // @ts-ignore
          encoder.setString(name, value.toString());
        } else if (value instanceof Map) {
          assert(
            // @ts-ignore
            nameof<indexof<T>>() == "String",
            "Can only encode maps with string keys"
          );
          let keys = value.keys();
          encoder.pushObject(name);
          for (let i = 0; i < keys.length; i++) {
            // @ts-ignore
            encode<valueof<T>, JSONEncoder>(
              value.get(keys[i]),
              keys[i],
              encoder
            );
          }
          encoder.popObject();
        } else if (value instanceof Set) {
          // @ts-ignore
          let values: Array<indexof<T>> = value.values();
          encoder.pushArray(name);
          for (let i = 0; i < values.length; i++) {
            // @ts-ignore
            encode<indexof<T>, JSONEncoder>(values[i], null, encoder);
          }
          encoder.popArray();
        }
      }
    }
  } else {
    throw new Error(
      "Encoding failed " +
        (name != null && name != "" ? " for " + name : "") +
        " with type " +
        nameof<T>()
    );
  }
  var output: Output;
  // @ts-ignore
  if (output instanceof Uint8Array) {
    // @ts-ignore
    return <Output>encoder.serialize();
  }
  assert(
    // @ts-ignore
    output instanceof JSONEncoder,
    // @ts-ignore
    "Bad return type " + nameof < Output > +" for encoder"
  );
  // @ts-ignore
  return <Output>encoder;
}

// @ts-ignore
@inline
function getStr(val: JSON.Value, name: string): string {
  assert(
    val instanceof JSON.Str,
    "Value with Key: " + name + " is not a string or null"
  );
  return (<JSON.Str>val)._str;
}

function decodeArray<T>(val: JSON.Value, name: string): Array<T> {
  assert(
    val instanceof JSON.Arr,
    "Value with Key: " + name + " is not an array or null."
  );
  const res = new Array<T>();
  const arr = (<JSON.Arr>val)._arr;
  for (let i: i32 = 0; i < arr.length; i++) {
    let item: T = decode<T, JSON.Value>(arr[i]);
    res.push(item);
  }
  return res;
}

function decodeMap<V>(aVal: JSON.Value, name: string): Map<string, V> {
  assert(
    aVal instanceof JSON.Obj,
    "Value with Key: " + name + " is not an Obj."
  );
  let val = <JSON.Obj>aVal;
  let map = new Map<string, V>();
  for (let i = 0; i < val.keys.length; i++) {
    let key = val.keys[i];
    map.set(key, decode<V, JSON.Value>(<JSON.Value>val.get(key)));
  }
  return map;
}

function decodeSet<V>(aVal: JSON.Value, name: string): Set<V> {
  assert(
    aVal instanceof JSON.Arr,
    "Value with Key: " + name + " is not an Obj."
  );
  let arr = (<JSON.Arr>aVal)._arr;
  let set = new Set<V>();
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    set.add(decode<V, JSON.Value>(val));
  }
  return set;
}

function isReallyNullable<T>(): bool {
  return (
    isReference<T>() || isArrayLike<T>() || isNullable<T>() || isString<T>()
  );
}

function JSONTypeToString<T>(t: T): string {
  if (t instanceof JSON.Str) {
    return "string";
  }
  if (t instanceof JSON.Bool) {
    return "Boolean";
  }
  if (t instanceof JSON.Obj) {
    return "Object";
  }
  if (t instanceof JSON.Arr) {
    return "Array";
  }
  if (t instanceof JSON.Null) {
    return "Null";
  }
  if (t instanceof JSON.Integer) {
    return "Integer";
  }
  return "UNKNOWN TYPE";
}

function isNumber<T>(): boolean {
  return isFloat<T>() || isInteger<T>();
}

// @ts-ignore
@global
function decode<T, V = Uint8Array>(buf: V, name: string = ""): T {
  const buffer = <JSON.Value>(
    (buf instanceof Uint8Array ? JSON.parse(buf) : buf)
  );
  var val: JSON.Value;
  if (buffer instanceof JSON.Obj && name != "") {
    const obj: JSON.Obj = <JSON.Obj>buffer;
    let res = obj.get(name);
    if (res == null) {
      if (isReallyNullable<T>() && !isNumber<T>()) {
        if (isFloat<T>()) {
          throw new Error("type " + nameof<T>() + " cannot be null.");
        } else if (isInteger<T>()) {
          throw new Error("type " + nameof<T>() + " cannot be null.");
        } else {
          // @ts-ignore
          return changetype<T>(res);
        }
      } else {
        throw new Error("type " + nameof<T>() + " cannot be null.");
      }
    }
    val = res;
  } else {
    val = <JSON.Value>buffer;
  }
  if (isBoolean<T>()) {
    assert(
      val instanceof JSON.Bool,
      "Value with Key: " +
        name +
        " with type " +
        nameof<T>() +
        " is not a string"
    );
    // @ts-ignore
    return (<JSON.Bool>val)._bool;
  }
  var value: T;
  if (isInteger<T>()) {
    // @ts-ignore
    if (value instanceof u64 || value instanceof i64) {
      assert(
        val instanceof JSON.Str,
        "Value with Key: " +
          name +
          " with type " +
          nameof<T>() +
          " is an 64-bit integer and is expected to be encoded as a string"
      );
      let str = (<JSON.Str>val)._str;
      // @ts-ignore
      return <T>(isSigned<T>() ? I64.parseInt(str) : U64.parseInt(str));
    }
    assert(
      val instanceof JSON.Integer,
      "Value with Key: " +
        name +
        " with type " +
        nameof<T>() +
        " is not an Integer"
    );
    // @ts-ignore
    return <T>(<JSON.Integer>val)._num;
  }
  if (val instanceof JSON.Null) {
    assert(
      isReallyNullable<T>(),
      "Key: " + name + " with type " + nameof<T>() + "is not nullable"
    );
    // @ts-ignore
    return changetype<T>(<usize>0);
  }
  if (isString<T>()) {
    // @ts-ignore
    return getStr(val, name);
  }
  assert(
    isReference<T>(),
    name +
      " with type " +
      nameof<T>() +
      " must be an integer, boolean, string, object, or array"
  );
  // @ts-ignore
  if (isDefined(value.decode)) {
    assert(
      val instanceof JSON.Obj || val instanceof JSON.Obj,
      "Value with Key: " +
        name +
        " with type " +
        nameof<T>() +
        " is not an object or null " +
        (val instanceof JSON.Obj).toString()
    );
    value = util.allocate<T>();
    if (isNullable<T>()) {
      if (value != null) {
        // @ts-ignore
        return value.decode<JSON.Obj>(<JSON.Obj>val);
      }
    } else {
      // @ts-ignore
      return value.decode<JSON.Obj>(<JSON.Obj>val);
    }
  }
  // @ts-ignore
  if (value instanceof Map) {
    assert(
      val instanceof JSON.Obj,
      "Value with Key: " +
        name +
        " of type map expected a JSON.Obj, but recevied " +
        JSONTypeToString(val)
    );
    assert(
      // @ts-ignore
      nameof<indexof<T>>() == "String",
      "Value with Key: " +
        name +
        " cannot decode a map which has an index type " +
        // @ts-ignore
        nameof<indexof<T>>() +
        ", it must be a string"
    );
    // @ts-ignore
    return <T>decodeMap<valueof<T>>(<JSON.Obj>val, name);
  }
  // @ts-ignore
  if (value instanceof Set) {
    assert(
      val instanceof JSON.Arr,
      "Value with Key: " +
        name +
        " of type map expected a JSON.Obj, but recevied " +
        JSONTypeToString(val)
    );
    // @ts-ignore
    return <T>decodeSet<indexof<T>>(val, name);
  }
  if (isArrayLike<T>()) {
    // @ts-ignore
    if (value instanceof Uint8Array) {
      // @ts-ignore
      return changetype<T>(base64.decode(getStr(val, name)));
    }
    // @ts-ignore
    // assert(val instanceof Arr, "Value with Key: " +  name + " with type " + nameof<T>()  + " is expected to be an array")
    // @ts-ignore only checking the instance
    return <T>decodeArray<valueof<T>>(val, name);
  }
  // @ts-ignore
  if (value instanceof u128) {
    assert(
      val instanceof JSON.Str,
      "Value with Key: " +
        name +
        " expected type string to decode u128 but got " +
        JSONTypeToString(val)
    );
    // @ts-ignore
    return u128.fromString(getStr(val, name));
  }
   // @ts-ignore
  if (value instanceof Balance) {
    assert(
      val instanceof JSON.Str,
      "Value with Key: " +
        name +
        " expected type string to decode Balance but got " +
        JSONTypeToString(val)
    );
    // @ts-ignore
    return Balance.fromString(getStr(val, name));
  }
  throw new Error(
    "Error when trying to decode " +
      name +
      " with type " +
      nameof<T>() +
      " and unexpected JSON type " +
      JSONTypeToString(val) +
      "\nPerhaps @nearBindgen decorator needs to be added to class " +
      nameof<T>()
  );
}

// @ts-ignore
@global
function defaultValue<T>(): T {
  if (isInteger<T>() || isFloat<T>()) {
    // @ts-ignore
    return <T>0;
  }
  return changetype<T>(0);
}

/**
 * Singleton support functions
 */

/* eslint-disable indent */
// @ts-ignore
@lazy
const __STATE_KEY = "STATE";

// @ts-ignore
@global
function __checkState(): bool {
  return storage.contains(__STATE_KEY);
}

// @ts-ignore
@global
function __getState<T>(): T {
  return storage.getSome<T>(__STATE_KEY);
}

// @ts-ignore
@global
function __setState<T>(state: T): void {
    storage.set(__STATE_KEY, state);
}

@global
function readRegion<T>(ptr: usize) : T {
  let data = ptrToBytes(ptr);
  return bytes_to_obj<T>(data);
}


@global
function write_region<T>(value: T) : usize {  
  var data = obj_to_bytes<T>(value);
  return util.bytesToPtr(data);
}


@global
function obj_to_bytes<T>(val: T) : Uint8Array { 
  var r = encodeToBytes(val);
  if (r.success) {
    return r.value;
  }
  return encode<T>(val);  
}

@global
function bytes_to_obj<T>(data : Bytes) : T {    


  var r = decodeBytes<T>(data);
  if (r.success) {
    return r.value;
  }
  return decode<T>(data);    
}

function ptrToBytes(ptr : usize) : Bytes {
  if (ptr == 0) {
    return Bytes.fromBytes(new Uint8Array(0));
  }
  return util.ptrToBytes(ptr);
}

function decodeBytes<T>(buf: Uint8Array): Result<T> {
  var value : T;
  const valType = nameof<T>();
  if (isInteger<T>()) {
      let bytes = Bytes.fromBytes(buf);      
      if (value instanceof u8) {
        // @ts-ignore
        return new Result(<T>bytes.toU8());
      }
      if (value instanceof u16) {
        // @ts-ignore
        return new Result(<T>bytes.toU16());
      }
      if (value instanceof u32) {
        // @ts-ignore
        return new Result(<T>bytes.toU32());
      }
      if (value instanceof u64) {
        // @ts-ignore
        return new Result(<T>bytes.toU64());
      }
      if (value instanceof i8) {
        // @ts-ignore
        return new Result(<T>bytes.toI8());
      }
      if (value instanceof i16) {
        // @ts-ignore
        return new Result(<T>bytes.toI16());
      }
      if (value instanceof i32) {
        // @ts-ignore
        return new Result(<T>bytes.toI32());
      }
      if (value instanceof i64) {
        // @ts-ignore
        return new Result(<T>bytes.toI64());
      }
  }
  // @ts-ignore
  if (value instanceof Balance) {
    // @ts-ignore
    return new Result(<T>Balance.fromBytes(buf));
  }

   // @ts-ignore
  if (value instanceof u128) {
    // @ts-ignore
    return new Result(<T>u128.fromBytes(buf, false));
  }
   // @ts-ignore
  if (value instanceof u256) {
    // @ts-ignore
    return new Result(<T>u256.fromBytes(buf, false));
  }
  // @ts-ignore
  if (value instanceof Address){
    // @ts-ignore
    return new Result(<T>Address.fromBytes(buf));
  }

  // @ts-ignore
  if (value instanceof Uint8Array){
    // @ts-ignore
    return new Result(changetype<T>(buf));
  }
  if (isString<T>()){
     // @ts-ignore
     return changetype<T>(util.bytesToString(buf));
  }
    
  return Result.fail<T>(value);
}


function encodeToBytes<T>(value: T): Result<Uint8Array> {  
  const valType = nameof<T>();
  if (isInteger<T>()) {      
    if (value instanceof u8) {
      // @ts-ignore
      return  new Result(Bytes.fromU8(value));
    }
    if (value instanceof u16) {
      // @ts-ignore
      return  new Result(Bytes.fromU16(value));
    }
    if (value instanceof u32) {
      // @ts-ignore
      return new Result(Bytes.fromU32(value));
    }
    if (value instanceof u64) {
      // @ts-ignore
      return new Result(Bytes.fromU64(value));
    }
    if (value instanceof i8) {
      // @ts-ignore
      return new Result(Bytes.fromI8(value));
    }
    if (value instanceof i16) {
      // @ts-ignore
      return new Result(Bytes.fromI16(value));
    }
    if (value instanceof i32) {
      // @ts-ignore
      return new Result(Bytes.fromI32(value));
    }
    if (value instanceof i64) {
      // @ts-ignore
      return new Result(Bytes.fromI64(value));
    }
  }
  // @ts-ignore
  if (value instanceof Balance) {
    // @ts-ignore
    return new Result((value as Balance).toBytes());
  }
   // @ts-ignore
  if (value instanceof u128) {
    // @ts-ignore
    return new Result((value as u128).toUint8Array(false));
  }
   // @ts-ignore
  if (value instanceof u256) {
    // @ts-ignore
    return new Result((value as u256).toUint8Array(false));
  }
  // @ts-ignore
  if (value instanceof Uint8Array){
    // @ts-ignore
    return new Result(changetype<Uint8Array>(value));
  }
  if (isString<T>()){
     // @ts-ignore
     return new Result(util.stringToBytes(value));
  }  
  // @ts-ignore
  return  Result.fail(new Uint8Array(0));
}


class Result<T> {
  value : T;
  success : bool;
  
  constructor(value : T) {
    this.value = value;
    this.success = true;    
  }

  static fail<T>(value : T) : Result<T> {
    let r = new Result(value);
    r.success = false;
    return r;
  }
}


/*
@global
function __assertPrivate(): void {
  let contractName = Context.contractName;
  assert(contractName == Context.predecessor, `Only ${contractName} can call this method.`);
}
*/