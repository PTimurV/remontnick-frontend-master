import { ControlBlockVisible } from '../classes/index'

export default class Dropdown extends ControlBlockVisible {
  constructor(el: HTMLElement, titleElement: HTMLElement[] | null) {
    super({
      el,
      toggleElements: titleElement || null,
      controlAttribute: 'data-dropdown',
    })

    const innerElement = this.el.querySelector<HTMLElement>(
      '[data-dropdown-inner]'
    )

    if (!innerElement) {
      throw new Error('Not found dropdown inner element')
    }

    innerElement.addEventListener('click', (event) => event.stopPropagation())
  }
}
