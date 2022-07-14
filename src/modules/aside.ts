import { ControlBlockVisible } from '../classes'
import { changeBodyScroll } from '../utils'

export function initAside() {
  const aside = document.getElementById('aside')

  if (!aside) {
    console.error('not found aside element')
    return
  }

  const toggleAsideBtns =
    document.querySelectorAll<HTMLElement>('[data-aside-btn]')
  const closeAsideBtns =
    document.querySelectorAll<HTMLElement>('[data-aside-close]')

  const asideInstance = new ControlBlockVisible({
    el: aside,
    controlAttribute: 'data-aside',
    toggleElements: Array.from(toggleAsideBtns),
    closeElements: Array.from(closeAsideBtns),
    callbacks: {
      onShow() {
        // focus on aside to get control from keyboard
        aside.focus()
        changeBodyScroll(true)
      },
      onHide() {
        changeBodyScroll()
      },
    },
  })
  asideInstance.initElements()

  return asideInstance
}
