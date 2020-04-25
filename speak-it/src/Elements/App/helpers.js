import Component from './component';

const cardsInformation = (object) => {
  const {
    word, transcription, image, audio,
  } = object;
  const card = new Component('div');
  const engWord = new Component('span');
  engWord.addClasses('word');
  engWord.setTextContent(word);
  const engTranscription = new Component('span');
  engTranscription.addClasses('transcription');
  engTranscription.setTextContent(transcription);
  card.image = image;
  const engAudio = new Audio(audio);
  card.append(engWord, engTranscription, engAudio);
  return card;
};

export default cardsInformation;
