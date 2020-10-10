import { Directive } from 'vue'

const RIPPLE_ENABLED_CLASS = 'surc-ripple'
const RIPPLE_ROOT_CLASS = 'surc-ripple-root'
const RIPPLE_ELEMENT_CLASS = 'surc-ripple-element'

const rippleClickHandler = (rippleRoot: Element) => (e: HTMLElementEventMap['mousedown']) => {
  const target = e.currentTarget as HTMLElement
  const { top, left, width, height } = target.getBoundingClientRect()
  const size = Math.max(width, height) * 2

  const rippleElement = document.createElement('span')
  rippleElement.classList.add(RIPPLE_ELEMENT_CLASS)
  rippleElement.style.setProperty('--surc-ripple-size', `${size}px`)
  rippleElement.style.setProperty('--surc-ripple-x', `${e.clientX - left - (size / 2)}px`)
  rippleElement.style.setProperty('--surc-ripple-y', `${e.clientY - top - (size / 2)}px`)
  rippleElement.style.setProperty('--surc-ripple-color', 'radial-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0) 70%)')

  rippleRoot.appendChild(rippleElement)

  rippleElement.addEventListener('animationend', () => {
    rippleElement.remove()
  })
}

export const RippleDirective: Directive<HTMLElement> = {
  beforeMount (el) {
    el.classList.add(RIPPLE_ENABLED_CLASS)

    const rippleRoot = document.createElement('span')
    rippleRoot.classList.add(RIPPLE_ROOT_CLASS)
    el.appendChild(rippleRoot)

    el.addEventListener('mousedown', rippleClickHandler(rippleRoot))
  },
  beforeUnmount (el) {
    const rippleRoot = el.querySelector(RIPPLE_ROOT_CLASS)

    if (rippleRoot) {
      el.removeEventListener('mousedown', rippleClickHandler(rippleRoot))
    }
  }
}
