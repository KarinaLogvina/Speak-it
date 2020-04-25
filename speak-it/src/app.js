import getTranslation from './Elements/App/getTranslate';
import getWords from './Elements/App/loader';
import Layout from './Elements/App/layout';
import WordGenerator from './Elements/App/wordGenerator';
import cardsInformation from './Elements/App/helpers';

const layout = new Layout();
const words = new WordGenerator();
const cards = cardsInformation();

// getWords(0, 0).then((b) => {
//   const words = new WordGenerator();
//   return words;
// });
// getTranslation('source').then((a) => {
//   console.log(a);
// });
