import breakpoints from '../plugins/breakpoints'
import Accordion from '../components/accordion'

export default function initFooter() {
  const el = document.getElementById('footer')

  if (!el) {
    return
  }

  if (!breakpoints.isMd()) {
    const accordions = el.querySelectorAll<HTMLElement>('[data-accordion]')
    accordions.forEach((accordion) => {
      const titleEl = accordion.querySelector<HTMLElement>(
        '[data-accordion-title]'
      )
      const innerEl = accordion.querySelector<HTMLElement>(
        '[data-accordion-inner]'
      )
      if (!titleEl || !innerEl) {
        throw new Error('AAA')
      }

      new Accordion(accordion, titleEl, innerEl).initElements()
    })
  }
}
