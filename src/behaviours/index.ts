export default function initBehaviours() {
  document.querySelectorAll('[data-btn]').forEach((item) => {
    item.addEventListener('keypress', (event: any): void => {
      if (!event || !event.keyCode) {
        return
      }

      if ([13, 32].includes(event.keyCode)) {
        event.preventDefault()
        event.target?.dispatchEvent(new Event('click'))
      }
    })
  })

  let scrollPrev = 0
  window.addEventListener('scroll', () => {
    checkScroll()
  })

  function checkScroll() {
    const scrolled = window.scrollY

    if (scrolled > 100 && scrolled > scrollPrev) {
      document.body.classList.add('scrolled')
    } else {
      document.body.classList.remove('scrolled')
    }

    scrollPrev = scrolled
  }
}
