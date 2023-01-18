import {u128} from 'idena-sdk-core';

export class Balance {

  @inline static get Zero(): Balance { return new Balance(u128.Zero); }

  value: u128;

  constructor(value: u128) {
    this.value = value;
  }

  static min(a : Balance, b : Balance) : Balance {
    if (a <= b) {
      return a;
    }
    return b;    
  }

  static max(a : Balance, b : Balance) : Balance {
    if (a >= b) {
      return a;
    }
    return b;
  }

  static from<T>(value: T): Balance {
    return new Balance(u128.from(value));
  }
  static fromString(value: string, radix: i32 = 10): Balance {
    return new Balance(u128.fromString(value, radix));
  }

  static fromBytes(data: Uint8Array): Balance {
    const u128Size = 16;
    if (data.length < u128Size) {
      let newData = new Uint8Array(u128Size);
      memory.copy(
        newData.dataStart + u128Size - data.length,
        data.dataStart,
        data.length
      );
      data = newData;
    }
    return new Balance(u128.fromUint8ArrayBE(data));
  }

  toBytes(): Uint8Array {
    return this.value.toUint8Array(true);
  }

  toString() : string {
    return this.value.toString();
  }

  @operator('+')
  static add(a: Balance, b: Balance): Balance {
    return new Balance(u128.add(a.value, b.value));
  }

  @operator('-')
  static sub(a: Balance, b: Balance): Balance {
    return new Balance(u128.sub(a.value, b.value));
  }

  @operator('*')
  static mul(a: Balance, b: Balance): Balance {
    return new Balance(u128.mul(a.value, b.value));
  }

  @operator('/')
  static div(a: Balance, b: Balance): Balance {
    return new Balance(u128.div(a.value, b.value));
  }

  @inline @operator('==')
  static eq(a: Balance, b: Balance): bool {
    return u128.eq(a.value, b.value);
  }

  @inline @operator('!=')
  static ne(a: Balance, b: Balance): bool {
    return !Balance.eq(a, b);
  }

  @inline @operator('<')
  static lt(a: Balance, b: Balance): bool {
    return u128.lt(a.value, b.value);
  }

  @inline @operator('>')
  static gt(a: Balance, b: Balance): bool {
    return u128.gt(a.value, b.value);    
  }

  @inline @operator('<=')
  static le(a: Balance, b: Balance): bool {
    return !Balance.gt(a, b);
  }

  @inline @operator('>=')
  static ge(a: Balance, b: Balance): bool {
    return !Balance.lt(a, b);
  }
}

export const BASE_IDNA: Balance = Balance.fromString('1000000000000000000', 10);
