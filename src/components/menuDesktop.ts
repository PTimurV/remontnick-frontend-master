import { setElementVisibleAttribute } from '../utils'

interface CurrentMenu {
  category: HTMLElement
  subcategory: HTMLElement | null
}

export default class MenuDesktop {
  el: HTMLElement
  categories: NodeListOf<HTMLElement>
  _current: CurrentMenu | undefined

  constructor(el: HTMLElement) {
    this.el = el
    const categories = el.querySelectorAll<HTMLElement>('[data-category-id]')

    if (!categories) {
      throw new Error('Not found categories items at desktop menu')
    }

    this.categories = categories
  }

  get current() {
    return this._current
  }

  set current(value) {
    if (!value) {
      return
    }

    // for removing current if hover category only href
    // if (this._current) {
    if (this._current && value.subcategory) {
      this.hideCategory(this._current)
    }

    this.showCategory(value)
    this._current = value
  }

  init() {
    this.categories.forEach((category) => {
      const id = category.dataset.categoryId

      const subcategory = this.el.querySelector<HTMLElement>(
        `[data-category-by="${id}"]`
      )

      category.addEventListener('mouseover', () => {
        this.current = { category, subcategory }
      })
    })
    this.setInitialCategory()
  }

  setInitialCategory() {
    const category = Array.from(this.categories).find((category) => {
      return category.dataset.categoryId
    })
    if (!category) {
      throw new Error('Not found initial category')
    }

    const categoryId = category.dataset.categoryId
    const subcategory = this.el.querySelector<HTMLElement>(
      `[data-category-by="${categoryId}"]`
    )

    if (!subcategory) {
      throw new Error('Not found initial subcategory')
    }

    this.current = { category, subcategory }
  }

  showCategory({ category, subcategory }: CurrentMenu) {
    category.classList.add('list-el-active')
    if (subcategory) {
      setElementVisibleAttribute(subcategory, 'data-subcategory', true)
    }
  }

  hideCategory({ category, subcategory }: CurrentMenu) {
    category.classList.remove('list-el-active')
    if (subcategory) {
      setElementVisibleAttribute(subcategory, 'data-subcategory')
    }
  }
}
