import InfinityIterator from './infinityIterator';
import getWords from './loader';

export default class WordGenerator {
  constructor(groups, pages, parts) {
    this.groups = new InfinityIterator(groups);
    this.pages = new InfinityIterator(pages);
    this.parts = new InfinityIterator(parts);
  }

  async getNextWords() {
    if (!this.parts.next()) {
      if (!this.pages.next()) {
        this.groups.next();
      }
    }
    const currentsWords = await getWords(this.groups, this.pages);
    const partZero = currentsWords.slice(0, 10);
    const partOne = currentsWords.slice(10, 19);
    const wordsPage = [partZero, partOne];
    return wordsPage(this.parts.current);
  }
}
