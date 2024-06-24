document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscription-form');
    const submitButton = document.getElementById('submit-button');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtn = document.getElementsByClassName('close-btn')[0];
    const fullnameInput = document.getElementById('fullname');
    const formTitle = document.getElementById('form-title');

    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Actualizar título a medida que se escribe el nombre completo
    fullnameInput.addEventListener('input', function() {
        formTitle.textContent = `HOLA ${fullnameInput.value}`;
    });

    submitButton.addEventListener('click', async function(event) {
        event.preventDefault();

        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postal-code').value,
            dni: document.getElementById('dni').value,
        };

        if (validateForm(formData)) {
            console.log("Datos enviados:", JSON.stringify(formData)); // Log para ver qué se está enviando

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log("Datos recibidos:", data); // Log para ver qué se está recibiendo

                if (response.ok) {
                    showModal(`Suscripción exitosa: ${JSON.stringify(data)}`);
                    localStorage.setItem('subscriptionData', JSON.stringify(data));
                    clearForm(); // Vaciar el formulario después de suscribirse exitosamente
                } else {
                    showModal(`Error: ${response.statusText}`);
                }
            } catch (error) {
                showModal(`Error: ${error.message}`);
            }
        }
    });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    function validateForm(data) {
        let valid = true;

        // Validar nombre completo
        if (data.fullname.length <= 6 || !data.fullname.includes(' ')) {
            document.getElementById('error-fullname').textContent = "El nombre debe tener más de 6 letras y al menos un espacio.";
            valid = false;
        } else {
            document.getElementById('error-fullname').textContent = "";
        }

        // Validar email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.email)) {
            document.getElementById('error-email').textContent = "El email debe tener un formato válido.";
            valid = false;
        } else {
            document.getElementById('error-email').textContent = "";
        }

        // Validar contraseña
        if (data.password.length < 8 || !/\d/.test(data.password) || !/[a-zA-Z]/.test(data.password)) {
            document.getElementById('error-password').textContent = "La contraseña debe tener al menos 8 caracteres, con letras y números.";
            valid = false;
        } else {
            document.getElementById('error-password').textContent = "";
        }

        // Validar confirmación de contraseña
        if (data.password !== data.confirmPassword) {
            document.getElementById('error-confirm-password').textContent = "Las contraseñas no coinciden.";
            valid = false;
        } else {
            document.getElementById('error-confirm-password').textContent = "";
        }

        // Validar edad
        if (!Number.isInteger(+data.age) || data.age < 18) {
            document.getElementById('error-age').textContent = "La edad debe ser un número entero mayor o igual a 18.";
            valid = false;
        } else {
            document.getElementById('error-age').textContent = "";
        }

        // Validar teléfono
        if (!/^\d{7,}$/.test(data.phone)) {
            document.getElementById('error-phone').textContent = "El teléfono debe tener al menos 7 dígitos y no aceptar espacios, guiones ni paréntesis.";
            valid = false;
        } else {
            document.getElementById('error-phone').textContent = "";
        }

        // Validar dirección
        if (data.address.length < 5 || !/\d/.test(data.address) || !/[a-zA-Z]/.test(data.address)) {
            document.getElementById('error-address').textContent = "La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.";
            valid = false;
        } else {
            document.getElementById('error-address').textContent = "";
        }

        // Validar ciudad
        if (data.city.length < 3) {
            document.getElementById('error-city').textContent = "La ciudad debe tener al menos 3 caracteres.";
            valid = false;
        } else {
            document.getElementById('error-city').textContent = "";
        }

        // Validar código postal
        if (data.postalCode.length < 3) {
            document.getElementById('error-postal-code').textContent = "El código postal debe tener al menos 3 caracteres.";
            valid = false;
        } else {
            document.getElementById('error-postal-code').textContent = "";
        }

        // Validar DNI
        if (!/^\d{7,8}$/.test(data.dni)) {
            document.getElementById('error-dni').textContent = "El DNI debe ser un número de 7 u 8 dígitos.";
            valid = false;
        } else {
            document.getElementById('error-dni').textContent = "";
        }

        return valid;
    }

    function clearForm() {
        document.getElementById('fullname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
        document.getElementById('age').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('postal-code').value = '';
        document.getElementById('dni').value = '';
        formTitle.textContent = 'HOLA'; // Restablecer el título
    }

    // Cargar datos desde localStorage si existen
    const savedData = localStorage.getItem('subscriptionData');
    console.log("Cargando desde localStorage:", savedData);
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('fullname').value = data.fullname || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('password').value = data.password || '';
        document.getElementById('confirm-password').value = data.confirmPassword || '';
        document.getElementById('age').value = data.age || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('address').value = data.address || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('postal-code').value = data.postalCode || '';
        document.getElementById('dni').value = data.dni || '';
        formTitle.textContent = `HOLA ${data.fullname}`;
    }
});
