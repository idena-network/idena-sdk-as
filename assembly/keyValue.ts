import {Bytes} from "./bytes";
import {Region} from "./region";
import {env} from "./env";

export class KeyValue<K, V> {
  private readonly key: Bytes;
  private readonly _encodeValue: (value: V) => Bytes;
  private readonly _decodeValue: (a: Bytes) => V;

  constructor(
    key: K, 
    encodeKey: (key: K) => Bytes,
    encodeValue: (value: V) => Bytes,
    decodeValue: (bytes: Bytes) => V
  ) {
    this.key = encodeKey(key);
    this._encodeValue = encodeValue;
    this._decodeValue = decodeValue;
  }

  private encodeKey(): usize {
    return changetype<usize>(new Region(this.key));
  }

  set(value: V): void {
    env.setStorage(this.encodeKey(), changetype<usize>(new Region(this._encodeValue(value))));
  }

  private static _empty(v: i32): bool {
    return v == 0;
  }

  empty(): bool {
    return KeyValue._empty(env.getStorage(this.encodeKey()));
  }

  get(defaultValue: V): V {
    let ptr = env.getStorage(this.encodeKey());
    if (KeyValue._empty(ptr)) {
      return defaultValue;
    }
    let bytes = Bytes.fromBytes(changetype<Region>(ptr).read());
    return this._decodeValue(bytes);
  }
}