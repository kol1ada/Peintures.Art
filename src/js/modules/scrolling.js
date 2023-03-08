const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn')
            upElem.classList.remove('fadeOut')
        } else {
            upElem.classList.add('fadeOut')
            upElem.classList.remove('fadeIn')
        }
    })

    //* Scrolling winth RAF (Request Animation Frame)

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => link.addEventListener('click', function (e) {
        e.preventDefault()

        let widthTop = document.documentElement.scrollTop,
            hash = this.hash,
            toBlock = document.querySelector(this.hash).getBoundingClientRect().top,
            start = null;

        requestAnimationFrame(step)

        function step(time) {
            if (start === null) {
                start = time
            }

            let progress = time - start,
                r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

            document.documentElement.scrollTo(0, r)

            if (r !== widthTop + toBlock) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash
            }
        }
    }))

    //* Pure js scrolling :D

    // const element = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function (e) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop)

    //         if (this.hash !== '') {
    //             e.preventDefault()
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop
    //                 hashElement = hashElement.offsetParent
    //             }

    //             hashElementTop = Math.round(hashElementTop)
    //             smoothScroll(scrollTop, hashElementTop, this.hash)
    //         }
    //     })
    // }

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 30
    //     } else {
    //         speed = -30
    //     }

    //     let move = setInterval(function () {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop)

    //         if (
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to > from && scrollTop <= to)
    //         ) {
    //             clearInterval(move)
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash)
    //             history.replaceState(history.state, document.title, location.href + '111')
    //         } else {
    //             body.scrollTop += speed
    //             element.scrollTop += speed
    //             prevScrollTop = scrollTop
    //         }
    //     }, timeInterval)
    // }

    // calcScroll()
}

export default scrolling