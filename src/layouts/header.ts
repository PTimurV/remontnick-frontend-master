import Dropdown from '../components/dropdown'
import breakpoints from '../plugins/breakpoints'

export default function initHeader() {
  if (breakpoints.isMd()) {
    initDropdownLists()
  }

  // dropdown items
  function initDropdownLists() {
    const header = document.getElementById('header') as HTMLElement
    if (!header) {
      throw new Error('Not Found header')
    }

    const dropdowns = header.querySelectorAll<HTMLElement>('[data-dropdown]')
    dropdowns.forEach((dropdown) => {
      const titleElement = dropdown.querySelector<HTMLElement>(
        '[data-dropdown-title]'
      )
      if (!titleElement) {
        throw new Error('Not found dropdown title element')
      }
      new Dropdown(dropdown, [titleElement]).initElements()
    })
  }
}
