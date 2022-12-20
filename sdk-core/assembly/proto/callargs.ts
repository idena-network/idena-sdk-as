import { Writer, Reader } from "as-proto";
export class Argument {
  static encode(message: Argument, writer: Writer): void {
    if (message.value.length > 0) {
      writer.uint32(10);
      writer.bytes(message.value);
    }

    if (message.is_nil) {
      writer.uint32(16);
      writer.bool(message.is_nil);
    }
  }

  static decode(reader: Reader, length: i32): Argument {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Argument();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.bytes();
          break;

        case 2:
          message.is_nil = reader.bool();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  value: Uint8Array;
  is_nil: bool;

  constructor(value: Uint8Array = new Uint8Array(0), is_nil: bool = false) {
    this.value = value;
    this.is_nil = is_nil;
  }
}

export class ProtoArgs {
  static encode(message: ProtoArgs, writer: Writer): void {
    const args = message.args;
    for (let i = 0; i < args.length; ++i) {
      writer.uint32(10);
      writer.fork();
      Argument.encode(args[i], writer);
      writer.ldelim();
    }
  }

  static decode(reader: Reader, length: i32): ProtoArgs {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new ProtoArgs();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.args.push(Argument.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  args: Array<Argument>;

  constructor(args: Array<Argument> = []) {
    this.args = args;
  }
}