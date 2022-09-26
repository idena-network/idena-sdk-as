import {Address} from './address';
import {env, util} from 'idena-sdk-core';

export namespace Context {
  export function Sender(): Address {
    return Address.fromBytes(util.ptrToBytes(env.caller()));
  }
}
