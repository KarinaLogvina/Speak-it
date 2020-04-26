import Layout from './Elements/App/layout';
import WordGenerator from './Elements/App/wordGenerator';
import cardsInformation, {
  createModal, createStartScreen, recognitionFunc, createLink,
} from './Elements/App/helpers';

const layout = new Layout();
const recognition = recognitionFunc();
const wordsGenerator = new WordGenerator();
const mbWords = wordsGenerator.returnCurrentWords();
mbWords.then((words) => {
  const cards = words.map((object) => cardsInformation(object));
  layout.fillCardContainer(...cards);
  document.addEventListener('playWord', (event) => {
    const currentWords = wordsGenerator.getCurrentWords();
    const word = currentWords.find((c) => c.word === event.word);
    if (word) {
      new Audio(createLink(word.audio)).play();
    }
  });
});

window.addEventListener('load', () => {
  const startScreen = createStartScreen();
  const modal = createModal(startScreen);
  document.body.append(modal.element);
});


document.querySelector('.start-button').addEventListener(('click'), (event) => {
  event.target.classList.add('selected');
  recognition.addEventListener('end', recognition.start);
  recognition.start();
});


document.querySelectorAll('.category-button').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.category-button').forEach((a) => a.classList.remove('selected'));
  b.classList.add('selected');
  const buttonContent = b.textContent - 1;
  wordsGenerator.setGroup(buttonContent);
  const mbNewWords = wordsGenerator.returnCurrentWords();
  mbNewWords.then((words) => {
    const cards = words.map((object) => cardsInformation(object));
    layout.fillCardContainer(...cards);
  });
}));

document.querySelector('.restart-button').addEventListener('click', () => {
  document.querySelectorAll('.card').forEach((c) => c.classList.remove('select'));
});
