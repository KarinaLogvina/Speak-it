export default class Component {
  constructor(tag) {
    this.element = document.createElement(tag);
  }

  addClasses(...classes) {
    this.element.classList.add(...classes);
    return this;
  }

  removeClasses(...classes) {
    this.element.classList.remove(...classes);
    return this;
  }

  setTextContent(text) {
    this.element.textContent = text;
    return this;
  }

  setAttribute(atribute, content) {
    this.element.setAttribute(atribute, content);
    return this;
  }
  
  append(...childs) {
    childs.forEach((a) => this.element.append(a.element));
    return this;
  }
}