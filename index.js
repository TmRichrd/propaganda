const glide = new Glide('.glide')
const captionsEl = document.querySelectorAll('.slide-caption')
const burgerEl = document.querySelector('.burger')
const navMenu = document.querySelector('nav')
const navMenuItems = document.querySelectorAll('nav a')
const scrollToTop = document.querySelector('.scrollToTop')
const headerEl = document.querySelector('header')

window.addEventListener('scroll', () => {
  let height = headerEl.getBoundingClientRect().height
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains('sticky')) {
      headerEl.classList.add('sticky')
    }
  } else {
    headerEl.classList.remove('sticky')
  }
})

// 导航折叠效果
// burger.addEventListener('click', () => {
//   burger.classList.toggle('active')
//   navMenu.classList.toggle('open')
//   navMenuItems.forEach((item, index) => {
//     if (item.style.animation) {
//       item.style.animation = ''
//     } else {
//       item.style.animation = `.3s ease-in slideIn forwards ${index * 0.1 +
//         0.3}s`
//     }
//   })
// })
// 返回顶部
window.addEventListener('scroll', () => {
  // console.log(window.pageYOffset)
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = 'block'
  } else {
    scrollToTop.style.display = 'none'
  }
})

function returnTop() {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
// 轮播
glide.on(['mount.after', 'run.after'], () => {
  const caption = captionsEl[glide.index]
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: 'linear',
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0]
  })
})

glide.on('run.before', () => {
  document.querySelectorAll('.slide-caption>*').forEach(el => {
    el.style.opacity = 0
  })
})

glide.mount()

// 成功案例
const isotope = new Isotope('.cases', {
  layoutMode: 'fitRows',
  itemSelector: '.case-item'
})

const filterBtns = document.querySelector('.filter-btns')

filterBtns.addEventListener('click', e => {
  let { target } = e
  const filterOption = target.getAttribute('data-filter')
  if (filterOption) {
    document
      .querySelectorAll('.filter-btn.active')
      .forEach(btn => btn.classList.remove('active'))
    target.classList.add('active')
    isotope.arrange({ filter: filterOption })
  }
})
// 元素淡入淡出
// 配置
const staggeringOption = {
  delay: 300,
  distance: '50px',
  duration: 500,
  easing: 'ease-in-out',
  origin: 'bottom'
}
// interval等350ms出现下一个
ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 })
ScrollReveal().reveal('.service-item', { ...staggeringOption, interval: 350 })
const dataSectionEl = document.querySelector('.data-section')
ScrollReveal().reveal('.data-section', {
  beforeReveal: () => {
    anime({
      targets: '.data-piece .num',
      innerHTML: el => {
        return [0, el.innerHTML]
      },
      duration: 2000,
      round: 1,
      easing: 'easeInExpo'
    })
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect()
      .bottom / 5}px)`
  }
})
// 背景视觉差

window.addEventListener('scroll', () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom
  const top = dataSectionEl.getBoundingClientRect().top
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom /
      5}px)`
  }
})
// 流畅滑动到对应的区域
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: 'header',
  offset: 80
})

document.addEventListener('scrollStart', () => {
  if (headerEl.classList.contains('open')) {
    headerEl.classList.remove('open')
  }
})

const exploreBtnEls = document.querySelectorAll('.explore-btn')
// console.log(exploreBtnEls)
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener('click', () => {
    scroll.animateScroll(document.querySelector('#company-activities'))
  })
})
// 折叠按钮
burgerEl.addEventListener('click', () => {
  headerEl.classList.toggle('open')
  // burgerEl.classList.toggle('open')
})
