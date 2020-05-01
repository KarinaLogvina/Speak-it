export default class CardClick extends CustomEvent {
  constructor(card) {
    super('cardClick');
    this.card = card; //карточка на которую кликнули нам еще понадобиться при обработке
  }
}