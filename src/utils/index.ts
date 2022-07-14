export function setElementVisibleAttribute(
  element: HTMLElement,
  attributeName: string,
  show?: boolean
) {
  if (show) {
    element.setAttribute('shown', '')
  } else {
    element.removeAttribute('shown')
  }
}

export function useDebounce(callback: () => void, time: number) {
  let timer: NodeJS.Timeout | null = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback()
    }, time)
  }
}

let scrollLockDeps = 0

export function changeBodyScroll(block?: boolean) {
  if (block) {
    scrollLockDeps += 1
    document.body.classList.add('overflow-hidden')
  } else {
    scrollLockDeps -= 1

    if (!scrollLockDeps) {
      document.body.classList.remove('overflow-hidden')
    }
  }
}
