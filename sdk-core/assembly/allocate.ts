import {Region} from "./region";
import {debug} from "./debug";

export function allocate(size: u32): usize {
  let data = new Uint8Array(size);
  let r = new Region(data);
  let result = changetype<usize>(r);
  debug(`allocate:${size} , ptr=${result}`);
  return result;
}