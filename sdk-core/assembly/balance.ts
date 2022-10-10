import {u128} from 'idena-sdk-core';

export type Balance = u128;

export function balanceToBytes(b: Balance): Uint8Array {
  return b.toUint8Array(true);
}

export function bytesToBalance(data: Uint8Array): Balance {
  return u128.fromUint8ArrayBE(data);
}

export const BASE_IDNA: Balance = u128.fromString('1000000000000000000', 10);
