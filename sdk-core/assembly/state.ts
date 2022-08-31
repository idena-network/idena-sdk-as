import { Bytes } from "./bytes";


export abstract class ContractState {
  abstract Key() : Bytes;  
  abstract Save(): void;
  abstract Load(): void;
}
