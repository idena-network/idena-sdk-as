import {util} from './utils';
import {Address} from './address';
import {u128} from './index';

export class Bytes extends Uint8Array {
  static fromBytes(data: Uint8Array): Bytes {
    // @ts-ignore
    return changetype<Bytes>(data);
  }

  toHex(): string {
    return util.toHexString(changetype<Uint8Array>(this), false);
  }

  prepend(_elementPrefix: Bytes): Bytes {
    let bs = new Uint8Array(_elementPrefix.length + this.length);
    memory.copy(bs.dataStart, _elementPrefix.dataStart, _elementPrefix.length);
    memory.copy(
      bs.dataStart + _elementPrefix.length,
      this.dataStart,
      this.length
    );
    return Bytes.fromBytes(bs);
  }

  toBytes(): Bytes {
    return this;
  }

  toU64(): u64 {
    let d = new DataView(this.buffer);
    return d.getUint64(0, true);
  }

  toU32(): u32 {
    let d = new DataView(this.buffer);
    return d.getUint32(0, true);
  }

  toU16(): u16 {
    let d = new DataView(this.buffer);
    return d.getUint16(0, true);
  }

  toU8(): u8 {
    let d = new DataView(this.buffer);
    return d.getUint8(0);
  }

  toI64(): i64 {
    let d = new DataView(this.buffer);
    return d.getInt64(0, true);
  }

  toI32(): i32 {
    let d = new DataView(this.buffer);
    return d.getInt32(0, true);
  }

  toI16(): i16 {
    let d = new DataView(this.buffer);
    return d.getInt16(0, true);
  }

  toI8(): i8 {
    let d = new DataView(this.buffer);
    return d.getInt8(0);
  }

  static fromU8(n: u8): Bytes {
    let bs = new Uint8Array(1);
    let d = new DataView(bs.buffer);
    d.setUint8(0, n);
    return changetype<Bytes>(bs);
  }

  static fromU16(n: u16): Bytes {
    let bs = new Uint8Array(2);
    let d = new DataView(bs.buffer);
    d.setUint16(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromU32(n: u32): Bytes {
    let bs = new Uint8Array(4);
    let d = new DataView(bs.buffer);
    d.setUint32(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromI8(n: i8): Bytes {
    let bs = new Uint8Array(1);
    let d = new DataView(bs.buffer);
    d.setInt8(0, n);
    return changetype<Bytes>(bs);
  }

  static fromI16(n: i16): Bytes {
    let bs = new Uint8Array(2);
    let d = new DataView(bs.buffer);
    d.setInt16(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromI32(n: i32): Bytes {
    let bs = new Uint8Array(4);
    let d = new DataView(bs.buffer);
    d.setInt32(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromI64(n: i64): Bytes {
    let bs = new Uint8Array(8);
    let d = new DataView(bs.buffer);
    d.setInt64(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromU64(n: u64): Bytes {
    let bs = new Uint8Array(8);
    let d = new DataView(bs.buffer);
    d.setUint64(0, n, true);
    return changetype<Bytes>(bs);
  }

  static fromString(v: string): Bytes {
    return changetype<Bytes>(util.stringToBytes(v));
  }
}

// export interface Encodable {
//     toBytes(): Bytes;
// }

export function encodeBytes(v: Bytes): Bytes {
  return changetype<Bytes>(v);
}

export function decodeBytes(v: Bytes): Bytes {
  return changetype<Bytes>(v);
}

export function encodeAddress(v: Address): Bytes {
  return changetype<Bytes>(v);
}

export function decodeAddress(v: Bytes): Address {
  return changetype<Address>(v);
}

export function encodeString(v: string): Bytes {
  return Bytes.fromString(v);
}

export function decodeString(v: Bytes): string {
  return util.bytesToString(v)!;
}

export function encodeU64(v: u64): Bytes {
  return Bytes.fromU64(v);
}

export function decodeU64(v: Bytes): u64 {
  return v.toU64();
}

export function encodeU128(v: u128): Bytes {
  return Bytes.fromBytes(util.u128ToBytes(v));
}

export function decodeU128(v: Bytes): u128 {
  return util.bytesToU128(v);
}
