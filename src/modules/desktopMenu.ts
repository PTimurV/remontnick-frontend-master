import { ControlBlockVisible } from '../classes'
import { changeBodyScroll, setElementVisibleAttribute } from '../utils'
import MenuDesktop from '../components/menuDesktop'

export function initDesktopMenu() {
  const menu = document.getElementById('menu')
  if (!menu) {
    console.error('not found menu element')
    return
  }

  const catalogBtns =
    document.querySelectorAll<HTMLElement>('[data-menu-toggle]')

  const desktopMenuModule = new ControlBlockVisible({
    el: menu,
    toggleElements: Array.from(catalogBtns),
    controlAttribute: 'data-menu',
    callbacks: {
      onShow() {
        // focus on aside to get control from keyboard
        menu.focus()
        changeBodyScroll(true)
      },
      onHide() {
        changeBodyScroll()
      },
      onInit(target) {
        const el = menu.querySelector<HTMLElement>(
          `[data-menu-variant="${target.dataset.menuVariantBtn}"]`
        )
        if (el) {
          setElementVisibleAttribute(el, 'data-menu-variant', true)
        }
        new MenuDesktop(menu).init()
      },
      onToggle(value) {
        catalogBtns.forEach((btn) => {
          if (value) {
            setElementVisibleAttribute(btn, 'data-menu-toggle', true)
          } else {
            setElementVisibleAttribute(btn, 'data-menu-toggle')
          }
        })
      },
    },
  })

  desktopMenuModule.initElements()

  return desktopMenuModule
}
