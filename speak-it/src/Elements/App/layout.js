import Component from './component';
import { createNButtons } from './helpers';
import getTranslation from './getTranslate';

export default class Layout extends Component {
  constructor() {
    super('div');
    this.addClasses('container');
    const speakInput = new Component('input');
    this.translation = new Component('span');
    this.translation.addClasses('translation');
    this.cardContainer = new Component('div');
    this.cardContainer.addClasses('card-container');
    const categoryContainer = new Component('div');
    categoryContainer.addClasses('category-container');
    const categoryButtons = createNButtons(6, []);
    categoryContainer.append(...categoryButtons);
    const buttonContainer = new Component('div');
    buttonContainer.addClasses('button-container');
    const repeatButton = new Component('button');
    repeatButton.addClasses('button', 'repeat-button');
    repeatButton.setTextContent('Repeat');
    const startGameButton = new Component('button');
    startGameButton.addClasses('button', 'start-button');
    startGameButton.setTextContent('Speak Please');
    const statisticButton = new Component('button');
    statisticButton.addClasses('button', 'statistic-button');
    statisticButton.setTextContent('Statistic');
    buttonContainer.append(repeatButton, startGameButton, statisticButton);
    this.append(categoryContainer, this.translation, speakInput, this.cardContainer, buttonContainer);
    document.body.append(this.element);
  }

  fillCardContainer(...cards) {
    this.cardContainer.deleteAllChilds();
    this.cardContainer.append(...cards);
    cards.forEach((c) => c.addEventListener('click', () => {
      const { word } = c;
      getTranslation(word).then((a) => {
        this.translation.setTextContent(a);
      });
    }));
  }
}
