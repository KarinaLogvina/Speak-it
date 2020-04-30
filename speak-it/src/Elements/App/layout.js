import Component from './component';
import {
  createNButtons, createLink, statisticModal, createModal,
} from './helpers';
import getTranslation from './getTranslate';

export default class Layout extends Component {
  constructor() {
    super('div');
    this.addClasses('container');
    // Далее - так как наши методы addClasses, addEventListener, addAttribute возвращают this (тек. обьект)
    // из них можно создавать цепочки - что повыаешт читаемость
    // так называемый builder pattern
    this.speakInput = new Component('input').addClasses('input');
    this.imageContainer = new Component('div').addClasses('image-container');
    this.translation = new Component('span').addClasses('translation');
    this.cardImage = new Component('img').addClasses('card-img').setAttribute('src', './dist/blank.jpg');
    this.cardContainer = new Component('div').addClasses('card-container');
    this.categoryContainer = new Component('div').addClasses('category-container');
    this.categoryButtons = createNButtons(6, []);
    this.categoryButtons[0].addClasses('selected');
    this.categoryContainer.append(...this.categoryButtons);
    this.buttonContainer = new Component('div').addClasses('button-container');
    this.restartButton = new Component('button')
      .addClasses('button', 'restart-button')
      .setTextContent('Restart'); // не забываем про длинну строки
      // если пред. выражение многострочное, лучше отделить его пустой строкой
    
    this.startGameButton = new Component('button')
      .addClasses('button', 'start-button')
      .setTextContent('Speak Please');

    this.statisticButton = new Component('button')
      .addClasses('button', 'statistic-button')
      .setTextContent('Statistic')
      .addEventListener('click', () => { // вот здесь мы просто говорим документу что надо создать модалку статистики
        document.dispatchEvent(new CustomEvent('createStatsModal')); //просто свое событие - от него надо только его тип (имя)
    });
    this.buttonContainer.append(this.restartButton, this.startGameButton, this.statisticButton);
    this.imageContainer.append(this.cardImage, this.translation);
    this.append(this.categoryContainer,
      this.imageContainer,
      this.speakInput,
      this.cardContainer,
      this.buttonContainer);
    document.body.append(this.element);
  }

  fillCardContainer(...cards) {
    this.cardContainer.deleteAllChilds();
    this.cardContainer.append(...cards);
    cards.forEach((c) => c.addEventListener('click', () => {
      const { word } = c;
      this.cardImage.setAttribute('src', createLink(c.image));
      new Audio(createLink(c.audio)).play();
      getTranslation(word).then((a) => {
        this.translation.setTextContent(a);
      });
    }));
  }
}
