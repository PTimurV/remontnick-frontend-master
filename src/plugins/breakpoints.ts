import config from '../../tailwind.config'

const breakpoints = {
  sm: parseInt(config.theme.extend.screens.sm),
  md: parseInt(config.theme.extend.screens.md),
  xl: parseInt(config.theme.extend.screens.xl),
  '2xl': parseInt(config.theme.extend.screens['2xl']),
}

export default {
  breakpoints,
  isMd() {
    return document.documentElement.offsetWidth >= breakpoints.md
  },
}
