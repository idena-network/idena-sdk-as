const VECTOR_LENGTH_KEY_SUFFIX = '-l';
import {Host} from './host';
const VECTOR_ELEMENT_SUFFIX = '-el';

@idenaBindgen
export class Vector<T> {
  private _elementPrefix: string;
  private _lengthKey: string;
  private _length: i32;

  /** @ignore */
  [key: number]: T;

  constructor(prefix: string) {
    this._lengthKey = prefix + VECTOR_LENGTH_KEY_SUFFIX;
    this._elementPrefix = prefix + VECTOR_ELEMENT_SUFFIX;
    this._length = -1;
  }

  private _key(index: i32): string {
    return this._elementPrefix + index.toString();
  }

  containsIndex(index: i32): bool {
    return index >= 0 && index < this.length;
  }
  
  get length(): i32 {
    if (this._length < 0) {
      this._length = Host.getStorage<string, i32>(this._lengthKey, 0);
    }
    return this._length;
  }

  /**
   * Internally sets the length of the vector
   * @internal
   */
  // @ts-ignore
  private set length(value: i32) {
    this._length = value;
    Host.setStorage(this._lengthKey, value);
  }

  get isEmpty(): bool {
    return this.length == 0;
  }

  @operator('[]')
  private __get(index: i32): T {
    assert(this.containsIndex(index), 'Index out of range');
    return this.__unchecked_get(index);
  }

  @operator('{}')
  private __unchecked_get(index: i32): T {
    return Host.getSome<string, T>(this._key(index));
  }

  @operator('[]=')
  private __set(index: i32, value: T): void {
    assert(this.containsIndex(index), 'Index out of range');
    this.__unchecked_set(index, value);
  }

  @operator('{}=')
  private __unchecked_set(index: i32, value: T): void {
    Host.setStorage<string, T>(this._key(index), value);
  }

  push(element: T): i32 {
    let index = this.length;
    this.length = index + 1;
    this.__unchecked_set(index, element);
    return index;
  }

  @inline
  pushBack(element: T): i32 {
    return this.push(element);
  }

  pop(): T {
    assert(this.length > 0, 'Vector is empty');
    let index = this.length - 1;
    this.length = index;
    let result = this.__unchecked_get(index);
    Host.removeStorage(this._key(index));
    return result;
  }

  @inline
  popBack(): T {
    return this.pop();
  }

  replace(index: i32, new_element: T): T {
    assert(index < this.length, 'Index out of bounds');
    let evicted = this.__unchecked_get(index);
    Host.setStorage(this._key(index), new_element);
    return evicted;
  }

  get back(): T {
    return this.__get(this.length - 1);
  }

  @inline
  get last(): T {
    return this.back;
  }

  get front(): T {
    return this.__get(0);
  }

  @inline
  get first(): T {
    return this.front;
  }
}
