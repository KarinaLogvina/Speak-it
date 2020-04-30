export default class SpeechRecognitionResult extends CustomEvent {
  constructor(result) { //надо же где-то потом брать результаты
    super('speechRecognitionResult'); // тип или имя нашего событие - передаем в конструктор CustomEvent
    this.result = result;
  }
}