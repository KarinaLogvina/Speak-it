import Layout from './Elements/App/layout';
import WordGenerator from './Elements/App/wordGenerator';
import cardsInformation, { buttonCreator } from './Elements/App/helpers';


const layout = new Layout();
const wordsGenerator = new WordGenerator();
const mbWords = wordsGenerator.getNextWords();
mbWords.then((words) => {
  const cards = words.map((object) => cardsInformation(object));
  layout.fillCardContainer(...cards);
});


document.querySelectorAll('.category-button').forEach((b) => b.addEventListener('click', () => {
  const buttonContent = b.textContent;
  wordsGenerator.setGroup(buttonContent);
  const mbNewWords = wordsGenerator.returnCurrentWords();
  mbNewWords.then((words) => {
    const cards = words.map((object) => cardsInformation(object));
    layout.fillCardContainer(...cards);
  });
}));
