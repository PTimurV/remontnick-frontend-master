import { ControlBlockVisible } from '../classes/index'

export default class Accordion extends ControlBlockVisible {
  constructor(el: HTMLElement, titleEl: HTMLElement, innerEl: HTMLElement) {
    const height = innerEl.scrollHeight
    super({
      el,
      controlAttribute: 'data-accordion',
      toggleElements: [titleEl],
      callbacks: {
        onShow() {
          innerEl.style.maxHeight = height + 'px'
        },
        onHide() {
          innerEl.style.maxHeight = '0'
        },
      },
    })
  }
}
