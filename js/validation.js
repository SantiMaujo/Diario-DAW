document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("subscription-form");

    form.addEventListener("blur", function(event) {
        if (event.target.tagName === "INPUT") {
            validateField(event.target);
        }
    }, true);

    form.addEventListener("focus", function(event) {
        if (event.target.tagName === "INPUT") {
            const errorElement = document.getElementById(`error-${event.target.id}`);
            errorElement.textContent = "";
        }
    }, true);

    document.getElementById("submit-button").addEventListener("click", function() {
        let isValid = true;
        const inputs = form.querySelectorAll("input");

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            const formData = new FormData(form);
            let formDataText = "";
            formData.forEach((value, key) => {
                formDataText += `${key}: ${value}\n`;
            });
            alert("Formulario enviado correctamente:\n" + formDataText);
        } else {
            alert("Por favor, corrija los errores en el formulario.");
        }
    });

    function validateField(field) {
        const id = field.id;
        const value = field.value.trim();
        const errorElement = document.getElementById(`error-${id}`);
        let isValid = true;

        switch (id) {
            case "fullname":
                isValid = value.length > 6 && /\s/.test(value);
                errorElement.textContent = isValid ? "" : "Debe tener más de 6 letras y al menos un espacio.";
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorElement.textContent = isValid ? "" : "Formato de email inválido.";
                break;
            case "password":
                isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
                errorElement.textContent = isValid ? "" : "Al menos 8 caracteres, con letras y números.";
                break;
            case "confirm-password":
                const passwordValue = document.getElementById("password").value;
                isValid = value === passwordValue;
                errorElement.textContent = isValid ? "" : "Las contraseñas no coinciden.";
                break;
            case "age":
                isValid = Number.isInteger(Number(value)) && Number(value) >= 18;
                errorElement.textContent = isValid ? "" : "Debe ser un número entero mayor o igual a 18.";
                break;
            case "phone":
                isValid = /^\d{7,}$/.test(value);
                errorElement.textContent = isValid ? "" : "Número de al menos 7 dígitos.";
                break;
            case "address":
                isValid = value.length >= 5 && /\s/.test(value);
                errorElement.textContent = isValid ? "" : "Al menos 5 caracteres, con letras, números y un espacio.";
                break;
            case "city":
                isValid = value.length >= 3;
                errorElement.textContent = isValid ? "" : "Al menos 3 caracteres.";
                break;
            case "postal-code":
                isValid = value.length >= 3;
                errorElement.textContent = isValid ? "" : "Al menos 3 caracteres.";
                break;
            case "dni":
                isValid = /^\d{7,8}$/.test(value);
                errorElement.textContent = isValid ? "" : "Número de 7 u 8 dígitos.";
                break;
            default:
                break;
        }
        return isValid;
    }

    // Actualiza el título en tiempo real
    const fullnameInput = document.getElementById("fullname");
    fullnameInput.addEventListener("input", function() {
        const title = document.getElementById("form-title");
        title.textContent = fullnameInput.value ? `HOLA ${fullnameInput.value.toUpperCase()}` : "HOLA";
    });
});
