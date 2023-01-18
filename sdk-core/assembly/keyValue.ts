import {Bytes} from './bytes';
import {Region} from './region';
import {env} from './env';
import { util } from 'idena-sdk-core';

@idenaBindgen
export class KeyValue<K, V> {
  private key: Bytes;
  
  constructor(key: K) {
    this.key = this.encodeKey<K>(key);
  }

  private encodeKey<K>(key : K): Bytes {
    return Bytes.fromBytes(obj_to_bytes<K>(key));
  }

  private keyPtr(): usize {
    return util.bytesToPtr(this.key);
  }

  set(value: V): void {
    env.setStorage(
      this.keyPtr(),
      util.bytesToPtr(obj_to_bytes<V>(value))
    );
  }

  private static _empty(v: usize): bool {
    return v == 0;
  }

  empty(): bool {
    return KeyValue._empty(env.getStorage(this.keyPtr()));
  }

  get(defaultValue: V): V {
    let ptr = env.getStorage(this.keyPtr());
    if (KeyValue._empty(ptr)) {
      return defaultValue;
    }
    let bytes = util.ptrToBytes(ptr);
    return bytes_to_obj<V>(bytes);
  }
}
