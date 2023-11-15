
const LoginValidator = {
    init: function () {
        const form = document.querySelector('form');
        const emailInput = form.querySelector('#f_email');
        const passwordInput = form.querySelector('#f_password');
        let inputs = Array.from(form.querySelectorAll('form input'));

        form.addEventListener('submit', async (e) => {
            // Reinicia los mensajes de error
            inputs.forEach(input => {
                input.nextElementSibling.innerText = '';
            });

            // Validación de Email
            if (emailInput.value.length === 0 || !this.isValidEmail(emailInput.value)) {
                e.preventDefault();
                alert('El correo electrónico es obligatorio y debe ser válido.');
                return;
            }

            // Validación de Contraseña
            if (passwordInput.value.length === 0) {
                e.preventDefault();
                alert('La contraseña es obligatoria.');
                return;
            }

            // Validación de Email único
            const emailExists = await this.isEmailRegistered(emailInput.value);
            if (!emailExists) {
                e.preventDefault();
                alert('El correo electrónico no está registrado.');
                return;
            }

            // Validación de Contraseña existente
            const passwordMatches = await this.doesPasswordMatch(emailInput.value, passwordInput.value);
            if (!passwordMatches) {
                e.preventDefault();
                alert('La contraseña no coincide con la registrada.');
                return;
            }
        });
    },

    isValidEmail: function (email) {
        // Valida el formato del correo electrónico.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isEmailRegistered: async function (email) {
        // Verifica si el correo electrónico ya está registrado en la base de datos.
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(email.toLowerCase() === 'test@example.com');
            }, 1000);
        });
    },

    doesPasswordMatch: async function (email, password) {
        // Verifica si la contraseña coincide con la registrada en la base de datos.
        const userPassword = await this.getPasswordByEmail(email);
        return password === userPassword;
    },

    getPasswordByEmail: async function (email) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('password123');
            }, 1000);
        });
    }
};

export default LoginValidator;
