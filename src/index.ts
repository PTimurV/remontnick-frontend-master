import '../src/assets/style/index.css'
import initFooter from './layouts/footer'
import initHeader from './layouts/header'
import initBehaviours from './behaviours'
import {
  initAside,
  initDesktopMenu,
  initMobileMenu,
  initSearchBar,
  initSearchForm,
} from './modules'
import breakpoints from './plugins/breakpoints'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}

function init() {
  initSearchForm()

  if (breakpoints.isMd()) {
    initDesktopMenu()
  } else {
    initAside()
    initSearchBar()
    initMobileMenu()
  }

  initFooter()
  initHeader()
  initBehaviours()
}
