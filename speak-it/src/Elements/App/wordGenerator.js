import InfinityIterator from './infinityIterator';
import getWords from './loader';

export default class WordGenerator {
  constructor(groups, pages, parts) {
    this.groups = new InfinityIterator(groups);
    this.pages = new InfinityIterator(pages);
    this.parts = new InfinityIterator(parts);
  }

  async getNextWords() {
    // флаг - надо ли запрашивть следующие слова
    let fetchRequired = false;
    if (!this.parts.next()) {
      // если часть обнулилась - значит берем следующую страницу, а её надо загрузить (следующие 20 слов)
      // а значит надо пометить что - грузим след слова
      fetchRequired = true;
      if (!this.pages.next()) {
        this.groups.next();
      }
    }

    // качаем если надо
    // если страница с 0 стала 1 - качать не надо, все есть.
    if (fetchRequired) this.currentsWords = await this.fetchCurrent();

    return this.currentsWords[this.parts.current];
  }

  async setGroup(groupNumber) {
    this.groups.current = groupNumber;
  }

  // должна просто вытягивать из инета по текущим группе, странице и т.д.abs
  // переименовываем - в соотв. с тем, что делает
  async fetchCurrent() {
    // скачаные слова - еще не готовы
    const fetchedWords = await getWords(this.groups.current, this.pages.current);
    const partZero = fetchedWords.slice(0, 10);
    const partOne = fetchedWords.slice(10);
    this.currentsWords = [partZero, partOne];
  }
  // делаем в соотв. с названием - выдает текущие 10 слов
  getCurrentWords() {
    return this.currentsWords[this.parts.current];
  }
}
