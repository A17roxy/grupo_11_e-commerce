const LoginValidator = {
    init: function () {
        const form = document.querySelector('form');
        const firstNameInput = form.querySelector('#f_firstname');
        const lastNameInput = form.querySelector('#f_lastname');
        const emailInput = form.querySelector('#f_email');
        const passwordInput = form.querySelector('#f_password');
        const imageInput = form.querySelector('#f_image'); 
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
            if (emailInput.value.length === 0 || !this.isValidEmail(emailInput.value)) {
                e.preventDefault();
                alert('El correo electrónico es obligatorio y debe ser válido.');
                return;
            }

            // Validación de Contraseña
            if (passwordInput.value.length < 8 || !this.isValidPassword(passwordInput.value)) {
                e.preventDefault();
                alert('La contraseña es obligatoria y debe tener al menos 8 caracteres. También puede contener letras mayúsculas, minúsculas, un número y un carácter especial.');
                return;
            }

            // Validación de Email único
            const emailExists = await this.isEmailRegistered(emailInput.value);
            if (emailExists) {
                e.preventDefault();
                alert('El correo electrónico ya está registrado.');
                return;
            }

            // Validación de Imagen
            if (!this.isValidImage(imageInput.files)) {
                e.preventDefault();
                alert('La imagen es obligatoria y debe ser un archivo válido (JPG, JPEG, PNG, GIF).');
                return;
            }
        });
    },

    isValidEmail: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isValidPassword: function (password) {
        /*const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;*/
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return passwordRegex.test(password);
    },

    isEmailRegistered: async function (email) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(email.toLowerCase() === 'test@example.com');
            }, 1000);
        });
    },

    isValidImage: function (files) {
        // Validación de imagen: Verifica que se haya seleccionado un archivo
        if (!files || files.length === 0) {
            return false;
        }

        // Verifica la extensión del archivo
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileName = files[0].name.toLowerCase();
        const fileExtension = fileName.split('.').pop();

        return allowedExtensions.includes(fileExtension);
    }
};

export default LoginValidator;
