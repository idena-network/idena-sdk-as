@unmanaged
export class Region {
  offset: u32;
  len: u32;
  capacity: u32;
  constructor(data: Uint8Array) {
    this.offset = data.dataStart as u32;
    this.len = data.length as u32;
    this.capacity = data.length as u32;
  }
  read(): Uint8Array {
    let data = new Uint8Array(this.len);
    memory.copy(data.dataStart, this.offset, this.len);
    return data;
  }
}
