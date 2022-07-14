import { ControlBlockVisible } from '../classes'
import { changeBodyScroll } from '../utils'

export function initSearchBar() {
  const search = document.getElementById('search-mobile')
  const searchInput =
    search && search.querySelector<HTMLInputElement>('[data-search-input]')

  if (!search || !searchInput) {
    console.error('not found search or searchInput element')
    return
  }

  const searchShowButtons =
    document.querySelectorAll<HTMLElement>('[data-search-show]')
  const searchHideButtons = document.querySelectorAll<HTMLElement>(
    '[data-search-close]'
  )

  const searchBarModule = new ControlBlockVisible({
    el: search,
    controlAttribute: 'data-search',
    openElements: Array.from(searchShowButtons),
    closeElements: Array.from(searchHideButtons),
    callbacks: {
      onShow() {
        // focus on aside to get control from keyboard
        searchInput.focus()
        changeBodyScroll(true)
      },
      onHide() {
        changeBodyScroll()
      },
    },
  })

  searchBarModule.initElements()

  return searchBarModule
}
