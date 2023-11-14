window.addEventListener('load', () => {
    const form = document.querySelector('form');
    const firstNameInput = form.querySelector('#f_firstname');
    const lastNameInput = form.querySelector('#f_lastname');
    const emailInput = form.querySelector('#f_email');
    const passwordInput = form.querySelector('#f_password');
    let inputs = Array.from(form.querySelectorAll('form input'));

    form.addEventListener('submit', async (e) => {
        // Reinicia los mensajes de error
        inputs.forEach(input => {
            input.nextElementSibling.innerText = '';
        });

        // Validación de Nombre y Apellido
        if (firstNameInput.value.length < 2 || lastNameInput.value.length < 2) {
            e.preventDefault();
            alert('El nombre y apellido deben tener al menos 2 caracteres.');
            return;
        }

        // Validación de Email
        if (emailInput.value.length === 0 || !isValidEmail(emailInput.value)) {
            e.preventDefault();
            alert('El correo electrónico es obligatorio y debe ser válido.');
            return;
        }

        // Validación de Contraseña
        if (passwordInput.value.length < 8 || !isValidPassword(passwordInput.value)) {
            e.preventDefault();
            alert('La contraseña es obligatoria y debe tener al menos 8 caracteres. También puede contener letras mayúsculas, minúsculas, un número y un carácter especial.');
            return;
        }

        //Validación de Email único
        const emailExists = await isEmailRegistered(emailInput.value);
        if (emailExists) {
            e.preventDefault();
            alert('El correo electrónico ya está registrado.');
            return;
        }
    });

    function isValidEmail(email) {
        //valida el formato del correo electrónico.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        //valida la contraseña con letras mayúsculas, minúsculas, número y carácter especial.
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    async function isEmailRegistered(email) {
        // verifica si el correo electrónico ya está registrado en la base de datos.
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulación: supongamos que el correo electrónico "test@example.com" ya está registrado
                resolve(email.toLowerCase() === 'test@example.com');
            }, 1000);
        });
    }
});
