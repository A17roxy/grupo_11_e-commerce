window.addEventListener('load', () => {
    const firstNameInput = document.querySelector('#f_firstname');
    const lastNameInput = document.querySelector('#f_lastname');
    const emailInput = document.querySelector('#f_email');
    const passwordInput = document.querySelector('#f_password');
    let inputs = Array.from(document.querySelectorAll('form input'));

    firstNameInput.addEventListener('submit', e => {
        if (e.target.firstname.value.length < 2){
            e.preventDefault();
        } 
    });

    lastNameInput.addEventListener('submit', e => {
        if (e.target.lastname.value.length < 2){
            e.preventDefault();
        } 
    });

    emailInput.addEventListener('submit', e => {
        inputs.forEach(inputActual => {
            if (inputActual.value.length == 0) {
                e.preventDefault();
                inputActual.nextElementSibling.innerText = 'El campo es obligatorio'
            }
        }) 
    });

    passwordInput.addEventListener('submit', e => {
        inputs.forEach(inputActual => {
            if (inputActual.value.length == 0) {
                e.preventDefault();
                inputActual.nextElementSibling.innerText = 'El campo es obligatorio'
            }
        }) 
    })
})