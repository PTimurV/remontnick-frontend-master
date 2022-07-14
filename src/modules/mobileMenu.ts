import MenuMobile from '../components/menuMobile'
import { ControlBlockVisible } from '../classes'

export function initMobileMenu() {
  const menu = document.getElementById('menu')
  if (!menu) {
    console.error('not found mobile menu element')
    return
  }

  const catalogBtns =
    document.querySelectorAll<HTMLElement>('[data-menu-toggle]')

  const closeMenuButton =
    document.querySelectorAll<HTMLElement>('[data-menu-close]')

  const Menu = new MenuMobile(menu)

  const mobileMenuModule = new ControlBlockVisible({
    el: menu,
    toggleElements: Array.from(catalogBtns),
    closeElements: Array.from(closeMenuButton),
    controlAttribute: 'data-menu',
    callbacks: {
      onHide() {
        Menu.unBindMenuElements()
      },
      onShow(target) {
        Menu.findElements(target)
        Menu.init()
      },
    },
  })

  mobileMenuModule.initElements()

  return mobileMenuModule
}
