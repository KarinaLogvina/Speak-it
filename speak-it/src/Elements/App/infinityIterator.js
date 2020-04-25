export default class InfinityIterator {
  constructor(length) {
    this.length = length;
    this.current = 0;
  }

  next() {
    if (this.current === this.length - 1) {
      this.current = 0;
    } else {
      this.current += 1;
    }
    return this.current;
  }
}
