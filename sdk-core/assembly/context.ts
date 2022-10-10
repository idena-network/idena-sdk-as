
import {Bytes, env, util, Balance, Address, bytesToBalance} from 'idena-sdk-core';

export namespace Context {
  export function caller(): Address {
    return Address.fromBytes(util.ptrToBytes(env.caller()));
  }

  export function originlCaller(): Address {
    return Address.fromBytes(util.ptrToBytes(env.originalCaller()));
  }

  export function blockTimestamp(): i64 {
    return env.blockTimestamp();
  }

  export function blockSeed(): Bytes {
    return util.ptrToBytes(env.blockSeed());
  }

  export function blockNumber(): u64 {
    return env.blockNumber();
  }

  export function minFeePerGas(): Balance {
    return bytesToBalance(util.ptrToBytes(env.minFeePerGas()));
  }

  export function networkSize(): u64 {
    return env.networkSize();
  }

  export function contractAddress(): Address {
    return Address.fromBytes(util.ptrToBytes(env.contract()));
  }

  export function contractCodeHash(): Bytes {
    return util.ptrToBytes(env.codeHash());
  }
  export function contractCode(): Bytes {
    return util.ptrToBytes(env.code());
  }

  export function epoch() : u16 {
    return env.epoch();
  }

  export function payAmount(): Balance {
    return bytesToBalance(util.ptrToBytes(env.payAmount()));
  }
}
