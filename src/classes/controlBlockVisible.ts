import { setElementVisibleAttribute } from '../utils'

interface IControlBlockVisibleParameters {
  el: HTMLElement
  closeElements?: HTMLElement[] | null
  openElements?: HTMLElement[] | null
  toggleElements?: HTMLElement[] | null
  controlAttribute: string
  callbacks?: {
    onInit?: (target: HTMLElement) => void
    onShow?: (target: HTMLElement) => void
    onHide?: (target: HTMLElement) => void
    onToggle?: (value: boolean, target: HTMLElement) => void
  }
}

export default class ControlBlockVisible {
  el: IControlBlockVisibleParameters['el']
  isShown: boolean
  isInit: boolean
  controlAttribute: Required<IControlBlockVisibleParameters>['controlAttribute']
  closeElements: IControlBlockVisibleParameters['closeElements']
  openElements: IControlBlockVisibleParameters['openElements']
  toggleElements: IControlBlockVisibleParameters['toggleElements']
  callbacks?: IControlBlockVisibleParameters['callbacks']

  constructor({
    el,
    controlAttribute,
    openElements,
    closeElements,
    toggleElements,
    callbacks,
  }: IControlBlockVisibleParameters) {
    this.el = el
    this.isShown = false
    this.isInit = false
    this.controlAttribute = controlAttribute || 'data-control-block-visible'
    this.closeElements = closeElements
    this.openElements = openElements
    this.toggleElements = toggleElements
    this.callbacks = callbacks
  }

  initOpenElements(openElements: HTMLElement[]) {
    openElements.forEach((openElement) => {
      openElement.addEventListener('click', (event) => {
        event.stopPropagation()
        this.show(openElement)
      })
    })
  }

  initCloseElements(closeElements: HTMLElement[]) {
    closeElements.forEach((closeElement) => {
      closeElement.addEventListener('click', (event) => {
        event.stopPropagation()
        this.hide(closeElement)
      })
    })
  }

  initToggleElements(toggleElements: HTMLElement[]) {
    toggleElements.forEach((toggleElement) => {
      toggleElement.addEventListener('click', (event) => {
        event.stopPropagation()
        this.toggle(toggleElement)
      })
    })
  }

  addControlElements(controlElements: {
    closeElements: IControlBlockVisibleParameters['closeElements']
    openElements: IControlBlockVisibleParameters['openElements']
    toggleElements: IControlBlockVisibleParameters['toggleElements']
  }) {
    const { openElements, closeElements, toggleElements } = controlElements

    if (openElements) {
      this.openElements = this.openElements
        ? this.openElements.concat(openElements)
        : openElements

      this.initOpenElements(openElements)
    }

    if (closeElements) {
      this.closeElements = this.closeElements
        ? this.closeElements.concat(closeElements)
        : closeElements

      this.initCloseElements(closeElements)
    }

    if (toggleElements) {
      this.toggleElements = this.toggleElements
        ? this.toggleElements.concat(toggleElements)
        : toggleElements

      this.initToggleElements(toggleElements)
    }
  }

  initElements() {
    if (this.openElements) {
      this.initOpenElements(this.openElements)
    }

    if (this.closeElements) {
      this.initCloseElements(this.closeElements)
    }

    if (this.toggleElements) {
      this.initToggleElements(this.toggleElements)
    }
  }

  show(target: HTMLElement) {
    setElementVisibleAttribute(this.el, this.controlAttribute, true)
    this.isShown = true
    this.callbacks?.onShow?.(target)
    if (!this.isInit) {
      this.isInit = true
      this.callbacks?.onInit?.(target)
    }
  }

  hide(target: HTMLElement) {
    setElementVisibleAttribute(this.el, this.controlAttribute)
    this.isShown = false
    this.callbacks?.onHide?.(target)
  }

  toggle(target: HTMLElement) {
    if (this.isShown) {
      this.hide(target)
    } else {
      this.show(target)
    }
    this.callbacks?.onToggle?.(this.isShown, target)
  }
}
