import { gsap } from 'gsap'
export const useTransitions = () => {
  const onBeforeEnter = (el: any) => {
    el.style.opacity = 0
    el.style.height = 0
  }

  const onEnter = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 1,
      delay: 0,
      height: '1em',
      onComplete: done,
    })
  }

  const onLeave = (el: Element, done: () => void) => {
    gsap.to(el, {
      opacity: 0,
      height: 0,
      delay: 0,
      onComplete: done,
    })
  }

  return {
    onBeforeEnter,
    onEnter,
    onLeave,
  }
}
