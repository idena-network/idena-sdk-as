import {u128} from 'idena-sdk-core';

export type Balance = u128;

export function balanceToBytes(b: Balance): Uint8Array {
  return b.toUint8Array(true);
}

export function bytesToBalance(data: Uint8Array): Balance {
  const u128Size = 16;
  if (data.length < u128Size) {
    let newData = new Uint8Array(u128Size);
    memory.copy(newData.dataStart+u128Size - data.length, data.dataStart, data.length);
    data = newData;
  }
  return u128.fromUint8ArrayBE(data);
}

export const BASE_IDNA: Balance = u128.fromString('1000000000000000000', 10);
