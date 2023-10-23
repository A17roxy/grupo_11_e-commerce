window.addEventListener('load', () => {
    const firstNameInput = document.querySelector('#f_firstname');
    const lastNameInput = document.querySelector('#f_lastname');
    const emailInput = document.querySelector('#f_email');

    firstNameInput.addEventListener('submit', e => {
        if (e.target.firstname.value.length < 2){
            e.preventDefault();
        } 
    });

    lastNameInput.addEventListener('submit', e => {
        if (e.target.lasttname.value.length < 2){
            e.preventDefault();
        } 
    });

    emailInput.addEventListener('submit', e =>{
        
    });
})