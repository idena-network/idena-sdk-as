import {Bytes} from "./bytes";
import {env} from "./env";
import {Region} from "./region";
import {util} from "./utils";

export class PersistentMap<K, V> {
  private readonly _elementPrefix: Bytes;
  private readonly _encodeKey: (key: K) => Bytes;
  private readonly _encodeValue: (value: V) => Bytes;
  private readonly _decodeValue: (a: Bytes) => V;

  constructor(
    prefix: string,
    encodeKey: (key: K) => Bytes,
    encodeValue: (value: V) => Bytes ,
    decodeValue: (bytes: Bytes) => V
  ) {
    this._elementPrefix = Bytes.fromBytes(util.stringToBytes(prefix));
    this._encodeKey = encodeKey;
    this._encodeValue =encodeValue;
    this._decodeValue = decodeValue;
  }

  private encodeKey(key: K): usize {
    let keyBytes = this._encodeKey(key);
    keyBytes = keyBytes.prepend(this._elementPrefix);
    return changetype<usize>(new Region(keyBytes));
  }

  delete(key: K): void {
    env.removeStorage(this.encodeKey(key));
  }

  get(key: K, defaultValue: V): V {
    let valuePtr = env.getStorage(this.encodeKey(key));
    if (valuePtr == 0) {
      return defaultValue;
    }
    let value = changetype<Region>(valuePtr);
    let bytes = Bytes.fromBytes(value.read());
    return this._decodeValue(bytes);
  }

  set(key: K, value: V): void {
    let valueRegion = changetype<usize>(new Region(this._encodeValue(value)));
    env.setStorage(this.encodeKey(key), valueRegion);
  }
}