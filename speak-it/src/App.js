import Layout from './Elements/App/layout';
import WordGenerator from './Elements/App/wordGenerator';
import cardsInformation, {
  createModal, createStartScreen, createRecognition, createLink,
} from './Elements/App/helpers';
import Card from './Elements/App/Card';

/**
 * Центральна точка приложения
 * Конструктора нет - потому что инициализация проходит асинхронно и вызывать её надо явно и результат обрабатывать явно
 */
export default class App {
  async init() {
    this.layout = new Layout();
    this.recognition = createRecognition();
    this.wordsGenerator = new WordGenerator(); // генератор создан, но он еще ничего не скачал
    await this.wordsGenerator.fetchCurrent(); // качаем
    this.cards = this.wordsGenerator.getCurrentWords()
      .map((wordObj) => new Card(wordObj)); // конструктор все сделает
    this.layout.cardContainer.append(...this.cards); // просто в контейнер кладем карточки

    // а вот так можно заменить карточки теперь
    const nextWords = await this.wordsGenerator.getNextWords();
    //берем карту и её индекс и по этому индексу обьект со словом
    //передаем в метод обьект со словом - он заменит содержимое карты
    this.cards.map((card, i) => card.replaceContent(nextWords[i])); // содержимое карточек и их элементов сменилось
    // в лейауте делать ничего не надо
  }
}