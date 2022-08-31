import {env} from './env';
import {isPrimitive, util} from './utils';

/**
 * This class represents contract storage.
 *
 * It is a key-value store that is persisted on the NEAR blockchain.
 */
export class Storage {
  /**
   * Store string value under given key. Both key and value are encoded as UTF-8 strings.
   *
   * ```ts
   * storage.setString("myKey", "myValue")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @param value The value stored at a particular key in a key-value store
   */
  static setString(key: string, value: string): void {
    let keyPtr = util.strToPtr(key);
    let valuePtr = util.strToPtr(value);
    env.setStorage(keyPtr, valuePtr);
  }

  /**
   * Get string value stored under given key. Both key and value are encoded as UTF-8 strings.
   *
   * ```ts
   * let value = storage.getString("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @returns String value stored under given key
   */
  static getString(key: string): string | null {
    return util.bytesToString(this._internalReadBytes(key));
  }

  /**
   * Store byte array under given key. Key is encoded as UTF-8 strings.
   * Byte array stored as is.
   *
   * It's convenient to use this together with `domainObject.encode()`.
   *
   * ```ts
   * let data = new Uint8Array([1,2,3])
   * storage.setBytes("myKey", data)
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @param value The value stored at a particular key in a key-value store
   */
  static setBytes(key: string, value: Uint8Array): void {
    let keyPtr = util.strToPtr(key);
    env.setStorage(keyPtr, util.bytesToPtr(value));
  }

  /**
   * Get byte array stored under given key. Key is encoded as UTF-8 strings.
   * Byte array stored as is.
   *
   * It's convenient to use this together with `DomainObject.decode()`.
   *
   * ```ts
   * storage.getBytes("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @returns Byte array stored under given key
   */
  static getBytes(key: string): Uint8Array | null {
    return this._internalReadBytes(key);
  }

  /**
   * Returns true if the given key is present in the storage.
   *
   * ```ts
   * storage.contains("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @returns True if the given key is present in the storage.
   */
  static contains(key: string): bool {
    let keyPtr = util.strToPtr(key);
    return env.getStorage(keyPtr) > 0;
  }

  /**
   * Returns true if the given key is present in the storage.
   *
   * ```ts
   * // alias for method contains()
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @returns True if the given key is present in the storage.
   */
  static hasKey(key: string): bool {
    return this.contains(key);
  }

  /**
   * Deletes a given key from the storage.
   *
   * ```ts
   * storage.delete("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value Store
   * @returns True if the given key was present in storage
   */
  static delete(key: string): void {
    let keyPtr = util.strToPtr(key);
    env.removeStorage(keyPtr);
  }

  /**
   * Stores given generic value under the key. Key is encoded as UTF-8 strings.
   * Supported types: bool, integer, string and data objects defined in model.ts.
   *
   * ```ts
   * storage.set<string>("myKey", "myValue")
   * storage.set<u16>("myKey", 123)
   * storage.set<MyCustomObject>("myKey", new MyCustomObject())
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @param value The value stored at a particular key in a key-value store
   */
  static set<T>(key: string, value: T): void {
    if (isString<T>()) {
      // @ts-ignore
      this.setString(key, value);
    } else if (isInteger<T>()) {
      // @ts-ignore
      this.setString(key, value.toString());
    } else {
      // @ts-ignore
      this.setBytes(key, encode<T>(value));
    }
  }

  /**
   * Gets given generic value stored under the key. Key is encoded as UTF-8 strings.
   * Supported types: string and data objects defined in model.ts.
   * Please use getPrimitive<T> for getting primitives with a default value, and
   * getSome<T> for primitives and non-primitives in case it's known that a particular key exists.
   *
   * ```ts
   * storage.get<string>("myKey")
   * storage.get<u16>("myKey")
   * storage.get<MyCustomObject>("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @param defaultValue The default value if the key is not available
   * @returns A value of type T stored under the given key.
   */
  static get<T>(key: string, defaultValue: T | null = null): T | null {
    if (isString<T>()) {
      const strValue = this.getString(key);
      return strValue == null
        ? defaultValue
        : util.parseFromString<T>(<string>strValue);
    } else {
      const byteValue = this.getBytes(key);
      return byteValue == null
        ? defaultValue
        : util.parseFromBytes<T>(byteValue);
    }
  }

  /**
   * Gets given generic value stored under the key. Key is encoded as UTF-8 strings.
   * Supported types: bool, integer.
   *
   * This function will throw if type T can not be cast as integer
   *
   * ```ts
   * storage.getPrimitive<string>("myKey", "default value")
   * storage.getPrimitive<u16>("myKey", 123)
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @param defaultValue The default value if the key is not available
   * @returns A value of type T stored under the given key.
   */
  static getPrimitive<T>(key: string, defaultValue: T): T {
    if (!isPrimitive<T>()) {
      ERROR(
        'Operation not supported. Please use storage.get<T> for non-primitives'
      );
    }
    const strValue = this.getString(key);
    return strValue == null
      ? defaultValue
      : util.parseFromString<T>(<string>strValue);
  }

  /**
   * Gets given generic value stored under the key. Key is encoded as UTF-8 strings.
   * Supported types: bool, integer, string and data objects defined in model.ts.
   *
   * This function will throw if the key does not exist in the storage.
   *
   * ```ts
   * storage.getSome<string>("myKey")
   * storage.getSome<u16>("myKey")
   * ```
   *
   * @param key The unique identifier associated with a value in a key-value store
   * @returns A value of type T stored under the given key.
   */
  static getSome<T>(key: string): T {
    if (!this.hasKey(key)) {
      assert(false, "Key '" + key + "' is not present in the storage");
    }
    if (isString<T>() || isInteger<T>()) {
      return util.parseFromString<T>(this.getString(key)!);
    } else {
      return util.parseFromBytes<T>(this.getBytes(key)!);
    }
  }

  private static _internalReadBytes(key: string): Uint8Array | null {
    let key_encoded = util.stringToBytes(key);

    let res = env.getStorage(util.strToPtr(key));
    if (res == 0) {
      return null;
    }
    return util.ptrToBytes(res);
  }
}

export {Storage as storage};
