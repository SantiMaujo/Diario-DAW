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
            alert("Formulario enviado correctamente.");
        } else {
            alert("Por favor, corrija los errores en el formulario.");
        }
    });

    document.getElementById("fullname").addEventListener("keydown", function(event) {
        const title = document.getElementById("form-title");
        title.textContent = `HOLA ${event.target.value}`;
    });

    function validateField(field) {
        const errorElement = document.getElementById(`error-${field.id}`);
        let isValid = true;

        switch (field.id) {
            case "fullname":
                if (field.value.length <= 6 || !field.value.includes(" ")) {
                    errorElement.textContent = "El nombre completo debe tener más de 6 letras y al menos un espacio.";
                    isValid = false;
                }
                break;
            case "email":
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailPattern.test(field.value)) {
                    errorElement.textContent = "Debe ingresar un email válido.";
                    isValid = false;
                }
                break;
            case "password":
                if (field.value.length < 8 || !/\d/.test(field.value)) {
                    errorElement.textContent = "La contraseña debe tener al menos 8 caracteres y contener números.";
                    isValid = false;
                }
                break;
            case "confirm-password":
                const password = document.getElementById("password").value;
                if (field.value !== password) {
                    errorElement.textContent = "Las contraseñas no coinciden.";
                    isValid = false;
                }
                break;
            case "age":
                if (field.value < 18) {
                    errorElement.textContent = "Debes ser mayor de 18 años.";
                    isValid = false;
                }
                break;
            case "phone":
                if (!/^\d{7,}$/.test(field.value)) {
                    errorElement.textContent = "El teléfono debe tener al menos 7 dígitos y no aceptar espacios, guiones ni paréntesis.";
                    isValid = false;
                }
                break;
            case "address":
                if (field.value.length < 5 || !/.*\d.*/.test(field.value) || !/.*\s.*/.test(field.value)) {
                    errorElement.textContent = "La dirección debe tener al menos 5 caracteres, con letras, números y un espacio en el medio.";
                    isValid = false;
                }
                break;
            case "city":
                if (field.value.length < 3) {
                    errorElement.textContent = "La ciudad debe tener al menos 3 caracteres.";
                    isValid = false;
                }
                break;
            case "postal-code":
                if (field.value.length < 3) {
                    errorElement.textContent = "El código postal debe tener al menos 3 caracteres.";
                    isValid = false;
                }
                break;
            case "dni":
                if (!/^\d{7,8}$/.test(field.value)) {
                    errorElement.textContent = "El DNI debe tener 7 u 8 dígitos.";
                    isValid = false;
                }
                break;
        }
        return isValid;
    }
});
