import breakpoints from '../plugins/breakpoints'
import Search from '../components/search'

export function initSearchForm() {
  let search
  if (breakpoints.isMd()) {
    search = document.getElementById('search-desktop')
  } else {
    search = document.getElementById('search-mobile')
  }

  if (!search) {
    console.error('not found menu search')
    return
  }

  const searchFormModule = new Search(search)

  searchFormModule.init()

  return searchFormModule
}
