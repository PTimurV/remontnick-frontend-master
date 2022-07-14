import { useDebounce } from '../utils'
import getSearchItems, { ISearchResult } from '../api/getSearchItems'
import breakpoints from '../plugins/breakpoints'

const disableSearchCauseProdUseSelfSearch = true

export default class Search {
  el: HTMLElement
  form: HTMLFormElement
  input: HTMLInputElement
  items: HTMLElement
  isActive: boolean
  cache: Map<string, ISearchResult>

  constructor(el: HTMLElement) {
    const form = el.querySelector<HTMLFormElement>('[data-search-form]')
    const input = el.querySelector<HTMLInputElement>('[data-search-input]')
    const items = el.querySelector<HTMLElement>('[data-search-items]')

    if (!form || !input || !items) {
      if (!form) console.log('form')
      if (!input) console.log('input')
      if (!items) console.log('items')
      throw new Error('one of search el not fount')
    }

    this.el = el
    this.form = form
    this.input = input
    this.items = items
    this.isActive = false

    this.cache = new Map()
  }

  init() {
    if (disableSearchCauseProdUseSelfSearch) {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault()
      })
      return
    }

    this.input.addEventListener('focus', () => {
      this.setActive()
    })

    if (breakpoints.isMd()) {
      this.form.addEventListener('click', (event) => {
        event.stopPropagation()
      })

      document.addEventListener('click', () => {
        this.isActive && this.removeActive()
      })
    }

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (!this.input.value) {
        return
      }

      window.location.href = `/search/?s=search&q=${this.input.value}`
    })

    const debounceInput = useDebounce(() => {
      this.getItems()
    }, 300)

    this.input.addEventListener('input', () => {
      debounceInput()
    })
  }

  setActive() {
    this.isActive = true
    this.el.classList.add('search_active')
    this.getItems()
  }

  removeActive() {
    this.isActive = false
    this.items.innerHTML = ''
    this.el.classList.remove('search_active')
  }

  async getItems() {
    if (!this.isActive) {
      return
    }
    const inputValue = this.input.value

    if (!inputValue) {
      this.items.innerHTML = ''
      return
    }

    let result

    if (this.cache.has(inputValue)) {
      result = this.cache.get(inputValue) as ISearchResult
    } else {
      result = await getSearchItems()
      this.cache.set(inputValue, result)
    }

    const { items, categories } = result

    let html = ''

    if (!items && !categories) {
      html += '<div class="body-3 mx-auto w-fit">Нет результатов</div>'
    } else {
      if (categories) {
        categories.forEach((category) => {
          category.title = this.accentMatchString(category.title, inputValue)
        })
        html += this.getRenderCategories(categories)
      }
      if (items) {
        items.forEach((item) => {
          item.title = this.accentMatchString(item.title, inputValue)
        })
        html += this.getRenderItems(items)
      }
    }

    this.items.innerHTML = html
  }

  getRenderCategories(categories: Required<ISearchResult>['categories']) {
    let html = ''

    if (categories.length) {
      html += `<div class='border-b border-black-8'>`
    }

    categories.forEach((category) => {
      html += `
        <a href='${category.href}' class='list-el-revert px-6 inline-block'>
          ${category.title}
        </a>
      `
    })

    if (categories.length) {
      html += `</div>`
    }

    return html
  }

  getRenderItems(items: Required<ISearchResult>['items']) {
    let html = ''

    if (items.length) {
      html += `<div class='py-2 flex flex-col'>`
    }

    items.forEach((item) => {
      html += `
        <a href='${item.href}' class='search-item px-6 py-2 flex gap-[10px] hover:bg-black-2'>
          <img class='object-contain' src='${item.image}' alt='Товар' width='70' height='70'>
          
          <div class='flex flex-col justify-between gap-3'>
            <span class='search-item__title body-1'>${item.title}</span>
            <span class='body-3'>${item.price} руб./шт</span>
          </div>
        </a>
      `
    })

    if (items.length) {
      html += `</div>`
    }

    return html
  }

  accentMatchString(text: string, value: string): string {
    const regex = new RegExp(value.trim(), 'i')

    return text.replace(regex, (match) => {
      return `<span class='inline-block font-semibold'>${match}</span>`
    })
  }
}
