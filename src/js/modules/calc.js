const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    const caclFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value))

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Veuillez choisir la taille et le matériau de la photo'
        } else if (promocodeBlock === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7) + '€'
        } else {
            resultBlock.textContent = sum + '€'
        }
    }

    sizeBlock.addEventListener('change', caclFunc)
    materialBlock.addEventListener('change', caclFunc)
    optionsBlock.addEventListener('change', caclFunc)
    promocodeBlock.addEventListener('input', caclFunc)
}

export default calc