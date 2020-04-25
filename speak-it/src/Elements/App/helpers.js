import Component from './component';

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
  card.word = word;
  card.image = image;
  const engAudio = new Audio(audio);
  card.append(engWord, engTranscription);
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

export default cardsInformation;
export { buttonCreator, createNButtons };
