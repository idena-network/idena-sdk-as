import {Bytes} from "./bytes";
import {env} from "./env";
import {util} from "./utils";
@idenaBindgen
export class PersistentMap<K, V> {
  private _elementPrefix: Bytes;
  
  constructor(
    prefix: Uint8Array) {
    this._elementPrefix = Bytes.fromBytes(prefix);
  } 

  static withStringPrefix<K, V>(prefix : string) : PersistentMap<K,V> {
    return new PersistentMap<K,V>(Bytes.fromBytes(util.stringToBytes(prefix)));
  }

  private encodeKey(key: K): usize {    
    let keyBytes = Bytes.fromBytes(obj_to_bytes<K>(key));
    keyBytes = keyBytes.prepend(this._elementPrefix);
    return util.bytesToPtr(keyBytes);
  }

  delete(key: K): void {
    env.removeStorage(this.encodeKey(key));
  }

  get(key: K, defaultValue: V): V {
    let valuePtr = env.getStorage(this.encodeKey(key));
    if (valuePtr == 0) {
      return defaultValue;
    }
    let value = util.ptrToBytes(valuePtr);
    return bytes_to_obj<V>(value);
  }

  set(key: K, value: V): void {
    let valueRegion = util.bytesToPtr(obj_to_bytes<V>(value));
    env.setStorage(this.encodeKey(key), valueRegion);
  }
}
