import Component from './component';
import {
  createNButtons, createLink, statisticModal, createModal,
} from './helpers';
import getTranslation from './getTranslate';

export default class Layout extends Component {
  constructor() {
    super('div');
    this.addClasses('container');
    this.speakInput = new Component('input');
    this.speakInput.addClasses('input');
    this.imageContainer = new Component('div');
    this.imageContainer.addClasses('image-container');
    this.translation = new Component('span');
    this.translation.addClasses('translation');
    this.cardImage = new Component('img');
    this.cardImage.addClasses('card-img');
    this.cardImage.setAttribute('src', './dist/blank.jpg');
    this.cardContainer = new Component('div');
    this.cardContainer.addClasses('card-container');
    this.categoryContainer = new Component('div');
    this.categoryContainer.addClasses('category-container');
    this.categoryButtons = createNButtons(6, []);
    this.categoryButtons[0].addClasses('selected');
    this.categoryContainer.append(...this.categoryButtons);
    this.buttonContainer = new Component('div');
    this.buttonContainer.addClasses('button-container');
    this.restartButton = new Component('button');
    this.restartButton.addClasses('button', 'repeat-button');
    this.restartButton.setTextContent('Restart');
    this.startGameButton = new Component('button');
    this.startGameButton.addClasses('button', 'start-button');
    this.startGameButton.setTextContent('Speak Please');
    this.statisticButton = new Component('button');
    this.statisticButton.addClasses('button', 'statistic-button');
    this.statisticButton.setTextContent('Statistic');
    this.statisticButton.addEventListener('click', () => {
      document.body.append(createModal(statisticModal()).element);
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
