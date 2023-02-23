const checkTextInputs = (selection) => {
    const txtInputs = document.querySelectorAll(selection);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key.match(/[^A-Za-z0-9]/ig)) {
                e.preventDefault()
            }
        })
    })
}

export default checkTextInputs