const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;

    const items = document.querySelectorAll(slides);


    const showSlides = (n) => {
        if (n > items.length) {
            slideIndex = 1
        }

        if (n < 1) {
            slideIndex = items.length
        }

        items.forEach(el => {
            el.classList.add('animated')
            el.style.display = 'none'
        })

        items[slideIndex - 1].style.display = 'block'
    }

    showSlides(slideIndex)

    const plusSlide = (n) => {
        showSlides(slideIndex += n)
    }

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlide(-1)
            items[slideIndex - 1].classList.remove('slideInLeft')
            items[slideIndex - 1].classList.add('slideInRight')
        })
        nextBtn.addEventListener('click', () => {
            plusSlide(1)
            items[slideIndex - 1].classList.remove('slideInRight')
            items[slideIndex - 1].classList.add('slideInLeft')
        })
    } catch (e) { }

    const activateAnimation = () => {
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlide(1)
                items[slideIndex - 1].classList.add('slideInDown')
            }, 3000)
        } else {
            paused = setInterval(() => {
                plusSlide(1)
                items[slideIndex - 1].classList.remove('slideInRight')
                items[slideIndex - 1].classList.add('slideInLeft')
            }, 3000)
        }
    }
    activateAnimation()

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused)
    })

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation()
    })

}

export default sliders