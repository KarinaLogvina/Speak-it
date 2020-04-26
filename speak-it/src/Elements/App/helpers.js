import Component from './component';

const createLink = (file) => `https://raw.githubusercontent.com/KarinaLogvina/rslang-data/master/data/${file.replace('files/', '')}`;
const cardsInformation = (object) => {
  const {
    word, transcription, image, audio,
  } = object;
  const card = new Component('div');
  card.addClasses('card');
  const engWord = new Component('span');
  engWord.addClasses('word');
  engWord.setTextContent(word);
  const engTranscription = new Component('span');
  engTranscription.addClasses('transcription');
  engTranscription.setTextContent(transcription);
  const soundIcon = new Component('img');
  soundIcon.setAttribute('src', './dist/sound.svg');
  soundIcon.addClasses('icon');
  card.word = word;
  card.image = image;
  card.audio = audio;
  card.append(soundIcon, engWord, engTranscription);
  return card;
};

const buttonCreator = (number) => {
  const but = new Component('button');
  but.addClasses('category-button');
  but.setTextContent(number);
  return but;
};

const createNButtons = (number, acc) => { // Хвостовая рекурсия
  if (number === 0) {
    return acc.reverse();
  }
  const btn = buttonCreator(number);
  acc.push(btn);
  return createNButtons(number - 1, acc);
};

const createModal = (content) => {
  const modalContainer = new Component('div');
  modalContainer.addClasses('modal-container');
  modalContainer.append(content);
  return modalContainer;
};

const createStartScreen = () => {
  const startScreenBack = new Component('div');
  startScreenBack.addClasses('start-screen-back');
  const logo = new Component('h1');
  logo.addClasses('logo');
  logo.setTextContent('SPEAK IT');
  const info = new Component('span');
  info.addClasses('info');
  info.setTextContent('Click on the words to hear them sound. Click on the button and speak the words into the microphone.');
  const startButton = new Component('button');
  startButton.addClasses('start-screen-button');
  startButton.setTextContent('Start');
  startButton.addEventListener('click', () => {
    startScreenBack.element.parentElement.remove();
  });
  startScreenBack.append(logo, info, startButton);
  return startScreenBack;
};

const statisticModal = () => {
  const statisticModalContainer = new Component('div');
  statisticModalContainer.addClasses('statistic-modal-container');
  const correctWords = document.querySelectorAll('.select');
  const wrongWords = document.querySelectorAll('.card:not(.select)');
  const mistakeCounter = wrongWords.length;
  const correctCounter = correctWords.length;
  const mistakesContainer = new Component('div');
  const mistakes = new Component('span');
  mistakes.addClasses('mistakes');
  mistakes.setTextContent(`Mistakes: ${mistakeCounter}`);
  mistakesContainer.addClasses('mistakes-container');
  mistakesContainer.append(mistakes);
  mistakesContainer.appendClones(...wrongWords);
  mistakesContainer.element.querySelectorAll('.card').forEach((c) => c.addEventListener('click', () => {
    const playWord = new CustomEvent('playWord');
    playWord.word = c.querySelector('.word').textContent;
    document.dispatchEvent(playWord);
  }));
  const correctContainer = new Component('div');
  correctContainer.addClasses('correct-container');
  const correct = new Component('span');
  correct.addClasses('correct');
  correct.setTextContent(`I know: ${correctCounter}`);
  correctContainer.append(correct);
  correctContainer.appendClones(...correctWords);
  correctContainer.element.querySelectorAll('.card').forEach((c) => c.addEventListener('click', () => {
    const playWord = new CustomEvent('playWord');
    playWord.word = c.querySelector('.word').textContent;
    document.dispatchEvent(playWord);
  }));
  const returnButton = new Component('button');
  returnButton.addClasses('modal-return-button');
  returnButton.setTextContent('Return');
  const newGameButton = new Component('button');
  newGameButton.addClasses('modal-new-game-button');
  newGameButton.setTextContent('New Game');
  returnButton.addEventListener('click', () => {
    statisticModalContainer.element.parentElement.remove();
  });
  statisticModalContainer.append(mistakesContainer, correctContainer, returnButton, newGameButton);
  return statisticModalContainer;
};

const recognitionFunc = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('')
      .toLowerCase();
    document.querySelector('.input').value = transcript;
    const match = [...document.querySelectorAll('.card:not(.select)')].find((el) => el.querySelector('.word').textContent.toLowerCase() === transcript);
    if (match) {
      match.classList.add('select');
    }
    if (document.querySelectorAll('.card:not(.select)').length === 0) {
      const mistake = 0;
      const correct = 10;
      const statistic = statisticModal(mistake, correct);
      const modal = createModal(statistic);
      document.body.append(modal.element);
      recognition.abort();
    }
  });
  return recognition;
};

export default cardsInformation;
export {
  buttonCreator,
  createNButtons,
  createLink,
  createModal,
  createStartScreen,
  statisticModal,
  recognitionFunc,
};
