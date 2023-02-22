const modals = () => {
    let btnPressed;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                }

                btnPressed = true

                if (destroy) {
                    el.remove()
                }

                windows.forEach(item => {
                    item.style.display = 'none'
                    item.classList.add('animated', 'fadeIn')
                })

                modal.style.display = 'block'
                document.body.style.overflow = 'hidden'
                document.body.style.marginRight = `${scroll}px`
            })
        })

        close.addEventListener('click', () => {
            windows.forEach(item => item.style.display = 'none')
            modal.style.display = 'none'
            document.body.style.overflow = ''
            document.body.style.marginRight = '0px'
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => item.style.display = 'none')
                modal.style.display = 'none'
                document.body.style.overflow = ''
                document.body.style.marginRight = '0px'
            }
        })
    }

    function showByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(el => {
                if (getComputedStyle(el).display !== 'none') {
                    display = 'block'
                }
            })

            if (!block) {
                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = 'hidden'
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`
            }

        }, time)
    }

    function calcScroll() {
        let div = document.createElement('div')

        div.style.width = '50px'
        div.style.height = '50px'
        div.style.overflow = 'scroll'
        div.style.visibility = 'hidden'

        document.body.appendChild(div)
        let scrollWidth = div.offsetWidth - div.clientHeight;
        div.remove()

        return scrollWidth
    }

    const openByScroll = (selector) => {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight) >= scrollHeight - 30) {
                document.querySelector(selector).click()
            }
        })
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
    openByScroll('.fixed-gift')
    // showByTime('.popup_engineer', 60000)
};

export default modals;