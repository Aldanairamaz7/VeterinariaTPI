const regexFirstName = /^[a-zA-ZÀ-ÿ]+$/;
const regexLastName = /^[a-zA-ZÀ-ÿ\s]+$/;
const regexDni = /^\d{7,8}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/;

export const validateFirstName = (value) => {
    if(!regexFirstName.test(value))
        return "El nombre solo puede contener letras";
    return "";
}

export const validateLastName = (value) => {
    if(!regexLastName.test(value))
        return "El apellido solo puede contener letras y espacios";
    return "";
}

export const validateDni = (value) => {
    if(!regexDni.test(value))
        return "El DNI debe tener 7 u 8 números";
    return "";
}

export const validateEmail = (value) => {
    if(!regexEmail.test(value))
        return "El email no es válido";
    return "";
}

export const validatePassword = (value) => {
    if(!regexPassword.test(value))
        return "La contraseña debe tener:\n entre 7 y 20 caracteres\n al menos una mayúscula y un número";
    return "";
}
