import Component from "./component";
import CardClick from "../../Events/CardClick";


/**
 * класс карточки - принимает параметр обьект в котором необходимая информация для создания карточки
 * должен уметь заменять информацию (когда меняем слова), что бы не создавать новые
 * должен уметь создавать нужные события которые уже обрабатывать будем на верхнем уровне
 */
export default class Card extends Component {
  constructor(params) {
    super('div'); // компонент с тэгом div
    this.addClasses('card')
    // создаем событие "клик по карточке", туда передаем эту карточку, что бы обработать потом в соотв. с тем на что кликнули
      .addEventListener('click', () => document.dispatchEvent(new CardClick(this)));

    const {
      word, transcription, image, audio,
    } = params;
    
    this.engWord = new Component('span')
      .addClasses('word')
      .setTextContent(word);
    
    this.engTranscription = new Component('span')
     .addClasses('transcription')
     .setTextContent(transcription);
    
    const soundIcon = new Component('img')
      .setAttribute('src', './dist/sound.svg')
      .addClasses('icon');
    
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.append(soundIcon, engWord, engTranscription);
  }

  /** заменяет содержимое */
  replaceContent(params) {
    const {
      word, transcription, image, audio,
    } = params;
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.engTranscription.setTextContent(transcription);
    this.engWord.setTextContent(word);

    return this; //что бы можно было заменять через map - функция мэп должна что-то возвращать
  }
}