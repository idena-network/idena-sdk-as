import {Bytes} from "./bytes";
import {util} from "./utils";

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
}
