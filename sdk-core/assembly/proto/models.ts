import { Writer, Reader } from "as-proto";

export namespace models {
  export class ProtoStateIdentity {
    static encode(message: ProtoStateIdentity, writer: Writer): void {
      writer.uint32(10);
      writer.bytes(message.stake);

      writer.uint32(24);
      writer.uint32(message.birthday);

      writer.uint32(32);
      writer.uint32(message.state);
    }

    static decode(reader: Reader, length: i32): ProtoStateIdentity {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ProtoStateIdentity();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.stake = reader.bytes();
            break;

          case 3:
            message.birthday = reader.uint32();
            break;

          case 4:
            message.state = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    stake: Uint8Array;
    birthday: u32;
    state: u32;

    constructor(
      stake: Uint8Array = new Uint8Array(0),
      birthday: u32 = 0,
      state: u32 = 0
    ) {
      this.stake = stake;
      this.birthday = birthday;
      this.state = state;
    }
  }

  export class ProtoTransactionIndex {
    static encode(message: ProtoTransactionIndex, writer: Writer): void {
      writer.uint32(10);
      writer.bytes(message.blockHash);

      writer.uint32(16);
      writer.uint32(message.idx);
    }

    static decode(reader: Reader, length: i32): ProtoTransactionIndex {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ProtoTransactionIndex();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.blockHash = reader.bytes();
            break;

          case 2:
            message.idx = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    blockHash: Uint8Array;
    idx: u32;

    constructor(blockHash: Uint8Array = new Uint8Array(0), idx: u32 = 0) {
      this.blockHash = blockHash;
      this.idx = idx;
    }
  }

  export class ProtoCallContractArgs {
    static encode(message: ProtoCallContractArgs, writer: Writer): void {
      const args = message.args;
      if (args.length !== 0) {
        for (let i = 0; i < args.length; ++i) {
          writer.uint32(10);
          writer.bytes(args[i]);
        }
      }
    }

    static decode(reader: Reader, length: i32): ProtoCallContractArgs {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new ProtoCallContractArgs();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.args.push(reader.bytes());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    args: Array<Uint8Array>;

    constructor(args: Array<Uint8Array> = []) {
      this.args = args;
    }
  }
}
