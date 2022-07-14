import { setElementVisibleAttribute } from '../utils'

export default class MenuMobile {
  el: HTMLElement
  category: HTMLElement | null
  categoriesButtons: HTMLElement[] | null
  subcategories: HTMLElement[] | null
  categoryBackButtons: HTMLElement[] | null
  currentSubcategory: HTMLElement | null
  menuVariant: HTMLElement | null
  listeners: {
    el: HTMLElement
    callback: (event: MouseEvent) => void
  }[]

  constructor(el: HTMLElement) {
    this.el = el
    this.category = null
    this.categoriesButtons = null
    this.subcategories = null
    this.categoryBackButtons = null
    this.currentSubcategory = null
    this.menuVariant = null
    this.listeners = []
  }

  unBindMenuElements() {
    if (this.menuVariant) {
      setElementVisibleAttribute(this.menuVariant, 'data-menu-variant')
    }
    this.category = null
    this.categoriesButtons = null
    this.subcategories = null
    this.categoryBackButtons = null
    this.currentSubcategory = null
    this.listeners.forEach((item) =>
      item.el.removeEventListener('click', item.callback)
    )
    this.listeners = []
  }

  findElements(target: HTMLElement) {
    const menuVariantValue = target.dataset.menuVariantBtn
    this.menuVariant = this.el.querySelector<HTMLElement>(
      `[data-menu-variant=${menuVariantValue}]`
    )
    if (!this.menuVariant) {
      throw new Error('Not found category menu variant at mobile menu')
    }
    setElementVisibleAttribute(this.menuVariant, 'data-menu-variant', true)

    const category =
      this.menuVariant.querySelector<HTMLElement>(`[data-category]`)
    if (!category) {
      throw new Error('Not found category element at mobile menu')
    }
    this.category = category

    // show category element
    this.category.setAttribute('shown', '')

    this.categoriesButtons = Array.from(
      category.querySelectorAll<HTMLElement>(
        '[data-category-id]:not([data-category-id=""])'
      )
    )
    this.subcategories = Array.from(
      this.el.querySelectorAll<HTMLElement>('[data-subcategory]')
    )
    this.categoryBackButtons = Array.from(
      this.el.querySelectorAll('[data-category-back]')
    )
    this.currentSubcategory = null
  }

  init() {
    this.categoriesButtons?.forEach((categoryButton) => {
      const callback = () => {
        this.handleCategoryBtnClick(categoryButton)
      }
      this.listeners.push({
        el: categoryButton,
        callback,
      })

      categoryButton.addEventListener('click', callback)
    })

    this.categoryBackButtons?.forEach((categoryBackButton) => {
      const callback = () => {
        this.hideSubcategory()
      }
      this.listeners.push({
        el: categoryBackButton,
        callback,
      })

      categoryBackButton.addEventListener('click', callback)
    })
  }

  showSubcategory(subcategory: HTMLElement) {
    if (this.category) {
      setElementVisibleAttribute(this.category, 'data-category')
    }
    setElementVisibleAttribute(subcategory, 'data-subcategory', true)
    this.currentSubcategory = subcategory
  }

  hideSubcategory() {
    if (this.category) {
      setElementVisibleAttribute(this.category, 'data-category', true)
    }
    if (this.currentSubcategory) {
      setElementVisibleAttribute(this.currentSubcategory, 'data-subcategory')
      this.currentSubcategory = null
    }
  }

  handleCategoryBtnClick(categoryButton: HTMLElement) {
    const categoryId = categoryButton.dataset.categoryId

    const subcategory = this.subcategories?.find((subcategory) => {
      const subcategoryId = subcategory.getAttribute('data-category-by')

      return subcategoryId === categoryId
    })

    if (subcategory) {
      this.showSubcategory(subcategory)
    }
  }
}
