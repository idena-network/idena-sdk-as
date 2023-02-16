import {util, env, Bytes, Address, Balance} from 'idena-sdk-core';
import {allocate} from './allocate';
import {models} from './proto/models';
import {Protobuf} from 'as-proto';

const PROMISE_FAILED = 0;
const PROMISE_EMTPY = 1;
const PROMISE_VALUE = 2;
const DEFAULT_MAX_DATA_SIZE = 1024;

export class PromiseId {
  idx: i32;
  constructor(idx: i32) {
    this.idx = idx;
  }

  then(method: string, args: Bytes[], deposit: Balance, gasLimit: u32): void {
    env.then(
      this.idx,
      util.strToPtr(method),
      util.bytesToPtr(util.packProtobufArguments(args)),
      util.bytesToPtr(deposit.toBytes()),
      gasLimit
    );
  }
}

export class PromiseResult {
  data: Bytes;
  status: i32;

  constructor(data: Bytes, status: i32) {
    this.data = data;
    this.status = status;
  }
  failed(): bool {
    return this.status == PROMISE_FAILED;
  }
  empty(): bool {
    return this.status == PROMISE_EMTPY;
  }
  value(): Bytes {
    return this.data;
  }
}

export namespace Host {
  export function setStorage<K, V>(key: K, value: V): void {
    let k = util.bytesToPtr(obj_to_bytes<K>(key));
    let v = util.bytesToPtr(obj_to_bytes<V>(value));
    env.setStorage(k, v);
  }

  export function getStorage<K, V>(key: K, defaulValue: V): V {
    let k = util.bytesToPtr(obj_to_bytes<K>(key));
    const valuePtr = env.getStorage(k);
    if (valuePtr == 0) {
      return defaulValue;
    }
    return bytes_to_obj<V>(util.ptrToBytes(valuePtr));
  }

  export function getSome<K, V>(key: K): V {
    let k = util.bytesToPtr(obj_to_bytes<K>(key));
    const valuePtr = env.getStorage(k);
    assert(valuePtr != 0, 'key is not found');
    return bytes_to_obj<V>(util.ptrToBytes(valuePtr));
  }

  export function hasStorage<K>(key: K): bool {
    let k = util.bytesToPtr(obj_to_bytes<K>(key));
    return env.getStorage(k) != 0;
  }

  export function removeStorage<K>(key: K): void {
    let k = util.bytesToPtr(obj_to_bytes<K>(key));
    env.removeStorage(k);
  }

  export function createCallFunctionPromise(
    contract: Address,
    method: string,
    args: Bytes[],
    deposit: Balance,
    gasLimit: u32
  ): PromiseId {
    const idx = env.createCallFunctionPromise(
      util.bytesToPtr(contract),
      util.strToPtr(method),
      util.bytesToPtr(util.packProtobufArguments(args)),
      util.bytesToPtr(deposit.toBytes()),
      gasLimit
    );
    return new PromiseId(idx);
  }

  export function createDeployContractPromise(
    code: Uint8Array,
    args: Bytes[],
    nonce: Bytes,
    deposit: Balance,
    gasLimit: u32
  ): PromiseId {
    const idx = env.createDeployContractPromise(
      util.bytesToPtr(code),
      util.bytesToPtr(util.packProtobufArguments(args)),
      util.bytesToPtr(nonce),
      util.bytesToPtr(deposit.toBytes()),
      gasLimit
    );
    return new PromiseId(idx);
  }

  export function createTransferPromise(to: Address, amount: Balance): void {
    env.createTransferPromise(
      util.bytesToPtr(to),
      util.bytesToPtr(amount.toBytes())
    );
  }

  export function createReadContractDataPromise(
    contract: Address,
    key: Uint8Array,
    gasLimit: u32
  ): PromiseId {
    const idx = env.createReadContractDataPromise(
      util.bytesToPtr(contract),
      util.bytesToPtr(key),
      gasLimit
    );
    return new PromiseId(idx);
  }

  export function createGetIdentityPromise(
    addr: Address,
    gasLimit: u32
  ): PromiseId {
    const idx = env.createGetIdentityPromise(util.bytesToPtr(addr), gasLimit);
    return new PromiseId(idx);
  }

  export function promiseResult(): PromiseResult {
    let statusPtr = allocate(1);
    let result = env.promiseResult(statusPtr);
    let statusBytes = util.ptrToBytes(statusPtr);

    return new PromiseResult(
      util.ptrToBytes(result),
      statusBytes.length > 0 ? statusBytes[0] : 0
    );
  }

  export function contractAddressByHash(
    code_hash: Bytes,
    args: Bytes[],
    nonce: Bytes
  ): Address {
    return Address.fromBytes(
      util.ptrToBytes(
        env.contractAddressByHash(
          util.bytesToPtr(code_hash),
          util.bytesToPtr(util.packProtobufArguments(args)),
          util.bytesToPtr(nonce)
        )
      )
    );
  }

  export function emitEvent(eventName: string, args: Bytes[]): void {
    env.emitEvent(
      util.strToPtr(eventName),
      util.bytesToPtr(util.packProtobufArguments(args))
    );
  }

  export function blockHeader(height: u64): models.ProtoBlockHeader {
    let data = util.ptrToBytes(env.blockHeader(height));
    return Protobuf.decode<models.ProtoBlockHeader>(
      data,
      models.ProtoBlockHeader.decode
    );
  }

  export function keccac256(data: Uint8Array): Bytes {
    return util.ptrToBytes(env.keccak256(util.bytesToPtr(data)));
  }

  export function globalState(): models.ProtoStateGlobal {
    let data = util.ptrToBytes(env.globalState());
    return Protobuf.decode<models.ProtoStateGlobal>(
      data,
      models.ProtoStateGlobal.decode
    );
  }

  export function ecrecover(data: Uint8Array, sig: Uint8Array): Bytes {
    return util.ptrToBytes(
      env.ecrecover(util.bytesToPtr(data), util.bytesToPtr(sig))
    );
  }

  export function burn(amount: Balance): void {
    env.burn(util.bytesToPtr(amount.toBytes()));
  }
}
