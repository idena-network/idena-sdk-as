import {Bytes} from "./bytes";
import {Protobuf} from "as-proto";
import {Argument, ProtoArgs} from "./proto/callargs";
import {Region} from "./region";
import {env} from "./env";
import {u128} from "./index";

export namespace util {
    
    /**
     * Convert a given string into a Uint8Array encoded as UTF-8.
     * @param s data to encode
     */
    export function stringToBytes(s: string): Uint8Array {
      let len = String.UTF8.byteLength(s, true) - 1;
      let bytes = new Uint8Array(len);
      memory.copy(bytes.dataStart, toUTF8(s), len);
      return bytes;
    }

    /**
     * Decode an UTF-8 encoded Uint8Array into a string.
     * @param bytes array to decode
     */
    export function bytesToString(bytes: Uint8Array | null): string {
      if (bytes == null) {
        return "";
      }
      return String.UTF8.decode(uint8ArrayToBuffer(bytes), true);
    }

    /**
     * Calculates the byte length of the specified UTF-8 string, which can optionally be null terminated.
     * @param str data
     * @param nullTerminated
     */
    export function UTF8Length(str: string, nullTerminated = false): usize {
      return String.UTF8.byteLength(str, nullTerminated);
    }

    /**
     * Parses the given bytes array to return a value of the given generic type.
     * Supported types: bool, integer, string and data objects defined in model.ts.
     *
     * @param bytes Bytes to parse. Bytes must be not null.
     * @returns A parsed value of type T.
     */
    // export function parseFromBytes<T>(bytes: Uint8Array): T {
    //   return decode<T>(bytes);
    // }

    /**
     * Parses the given string to return a value of the given generic type.
     * Supported types: bool, integer, string and data objects defined in model.ts.
     *
     * @param s String to parse. Must be not null.
     * @returns A parsed value of type T.
     */
    export function parseFromString<T>(s: string): T {
      if (isString<T>()) {
        // @ts-ignore
        return s;
      } else if (isInteger<T>()) {
        if (isBoolean<T>()) {
          // @ts-ignore
          return <T>(s == 'true');
        } else if (isSigned<T>()) {
          // @ts-ignore
          return <T>I64.parseInt(s);
        } else {
          // @ts-ignore
          return <T>U64.parseInt(s);
        }
      } else {
        // @ts-ignore v will have decode method
        return decode<T>(stringToBytes(s));
      }
    }

    export function decodeFromHex(str: string): Uint8Array {
      let s = stripHexPrefix(str);
      let array = new Uint8Array(s.length >>> 1);

      for (let i = 0; i < s.length >>> 1; ++i) {
        array.fill(i32(I64.parseInt('0x' + s.substr(i * 2, 2), 16)), i, i + 1);
      }

      return array;
    }

    export function toHexString(
      data: Uint8Array,
      withPrefix: bool = true
    ): string {    
      const r = env.bytes_to_hex(bytesToPtr(data)) ;
      return (withPrefix ? '0x' : '') + (util.bytesToString(ptrToBytes(r)) as string);            
    }


    export function packPlainArguments(data: Bytes): Bytes {
      const result = new Bytes(data.length + 1);
      result[0] = 0; // plain format
      memory.copy(result.dataStart + 1, data.dataStart, data.length);
      return result;
    }

    export function packProtobufArguments(data: Bytes[]): Bytes {
      let args = new Array<Argument>();
      for (let i = 0; i < data.length; i++) {
        args.push(new Argument(changetype<Uint8Array>(data[i]), data[i]==null));
      }

      let protoArgs = new ProtoArgs(args);

      let protoBytes = Protobuf.encode<ProtoArgs>(protoArgs, ProtoArgs.encode);
      const result = new Bytes(protoBytes.length + 1);
      result[0] = 1; // protobuf format
      memory.copy(result.dataStart + 1, protoBytes.dataStart, protoBytes.length);
      return result;
    }

    export function u128ToBytes(v: u128): Uint8Array {
      return v.toUint8Array(true);
    }

    export function bytesToU128(data: Uint8Array): u128 {
      const filled = new Bytes(16);
      memory.copy(filled.dataStart + 16 - data.length, data.dataStart, data.length);
      return u128.fromBytes(filled, true);
    }

    export function assert(value: bool, msg: string): void {
      if (value) {
        return;
      }      
      env.panic(util.strToPtr(msg));
    }

    export function ptrToBytes(ptr: usize): Bytes {
      if (ptr == 0) {
        return new Bytes(0);
      }
      let region = changetype<Region>(ptr);
      return Bytes.fromBytes(region.read());
    }

    export function bytesToPtr(data: Uint8Array): usize {
      if (data.length == 0) {
        return 0;
      }
      let r = new Region(data);
      return regionToPtr(r);
    }

    export function regionToPtr(r: Region): usize {      
      return changetype<usize>(r);
    }

    export function strToPtr(data: string): usize {
      if (data.length == 0) {
        return 0;
      }
      let r = new Region(util.stringToBytes(data));
      return regionToPtr(r);
    }

    // Private helpers
    function toUTF8(str: string, nullTerminated: boolean = false): usize {
      return changetype<usize>(String.UTF8.encode(str, nullTerminated));
    }

    function uint8ArrayToBuffer(array: Uint8Array): ArrayBuffer {
      return array.buffer.slice(
        array.byteOffset,
        array.byteLength + array.byteOffset
      );
    }

    function isHexPrefixed(str: string): bool {
      return str.slice(0, 2) == '0x';
    }

    function stripHexPrefix(str: string): string {
      return isHexPrefixed(str) ? str.slice(2) : str;
    }

    export function parseFromBytes<T>(bytes: Uint8Array): T {
      return decode<T>(bytes);
    }

    export function allocate<T>(): T {
      return changetype<T>(__new(offsetof<T>(), idof<T>()));
    }
}

// @ts-ignore
@inline
export function isPrimitive<T>(): boolean {
  return isInteger<T>() || isFloat<T>() || isString<T>();
}
