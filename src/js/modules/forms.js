import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]')

    const message = {
        loading: "Télécharger...",
        success: "Nous serons bientôt en contact avec vous !",
        failer: "Quelque chose n'a pas fonctionné :(",
        spinner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png",
    }

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(item => item.value = '')
        upload.forEach(item => item.previousElementSibling.textContent = 'choisir le fichier')
    }

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0].name)
            let dots;

            const arr = item.files[0].name.split('.')[0];

            arr.length > 5 ? dots = '...' : dots = '.'

            const name = arr.substring(0, 6) + dots + item.files[0].name.split('.')[1]
            item.previousElementSibling.textContent = name
        })
    })

    form.forEach(item => item.addEventListener('submit', (e) => {
        e.preventDefault()

        let statusMessage = document.createElement('div')
        statusMessage.classList.add('status')
        item.classList.add('animated', 'fadeOutUp')
        item.parentNode.appendChild(statusMessage)

        setTimeout(() => {
            item.style.display = 'none'
        }, 400)

        let statusImg = document.createElement('img');
        statusImg.classList.add('animated', 'fadeInUp')
        statusImg.setAttribute('src', message.spinner)
        statusMessage.appendChild(statusImg)

        let textMessage = document.createElement('div');
        textMessage.textContent = message.loading
        statusMessage.appendChild(textMessage)

        let api;
        item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

        const formData = new FormData(item);

        postData('assets/server.php', formData)
            .then(res => {
                console.log(res)
                statusImg.setAttribute('sr c', message.ok)
                textMessage.textContent = message.success
            })
            .catch(() => {
                statusImg.setAttribute('src', message.fail)
                textMessage.textContent = message.failer
            })
            .finally(() => {
                clearInputs()
                setTimeout(() => {
                    statusMessage.remove()
                    item.style.display = 'block'
                    item.classList.remove('fadeOutUp')
                    item.classList.add('fadeInUp')
                }, 5000)
            })
    }))
};

export default forms;





