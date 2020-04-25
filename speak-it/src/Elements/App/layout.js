import Component from './component';
import WordGenerator from './wordGenerator';

export default class Layout extends Component {
  constructor() {
    super('div');
    this.addClasses('container');
    const speakInput = new Component('input');
    const cardContainer = new Component('div');
    cardContainer.addClasses('card-container');
    const cards = new WordGenerator();
    cardContainer.append(cards);
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
    this.append(speakInput, cardContainer, buttonContainer);
    document.body.append(this.element);
  }
}
