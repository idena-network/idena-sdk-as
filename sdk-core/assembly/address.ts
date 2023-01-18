import {Bytes} from './bytes';
import {util} from './utils';

export class Address extends Bytes {
  static fromBytes(data: Uint8Array): Address {
    return changetype<Address>(data);
  }

  toHex(): string {
    return util.toHexString(changetype<Uint8Array>(this), false);
  }

  toString(): string {
    return this.toHex();
  }

  @inline
  @operator('==')
  static eq(a: Address, b: Address): bool {
    if (a.length != b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }

  @inline
  @operator('!=')
  static ne(a: Address, b: Address): bool {
    return !Address.eq(a, b);
  }
}
