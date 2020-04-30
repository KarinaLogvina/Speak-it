import Layout from './Elements/App/layout';
import WordGenerator from './Elements/App/wordGenerator';
import cardsInformation, {
  createModal, createStartScreen, createRecognition, createLink,
} from './Elements/App/helpers';

/**
 * Центральна точка приложения
 * Конструктора нет - потому что инициализация проходит асинхронно и вызывать её надо явно и результат обрабатывать явно
 */
export default class App {


  async init() {
    this.layout = new Layout();
    this.recognition = createRecognition();
    this.wordsGenerator = new WordGenerator();
  }


}