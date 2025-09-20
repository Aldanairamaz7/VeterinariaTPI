const regexFirstName = /^[a-zA-ZÀ-ÿ]+$/;
const regexLastName = /^[a-zA-ZÀ-ÿ\s]+$/;
const regexDni = /^\d{7,8}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/;
const regexPetName = /^[a-zA-ZÀ-ÿ]+$/;
const regexAge = /^[1-9]\d?$/
const regexBreed = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,20}$/

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

export const validateAddPetName = (value) => {
    if(!value)
        return "El nombre debe ser obligatorio."
    if(!regexPetName.test(value))
        return "El nombre solo puede contener letras"
    return ""
}

export const validatePetAge = (value) => {
    if(!value)
        return "La edad es obligatoria."
    if(!regexAge.test(value))
        return "La edad no puede ser 0 o menos.\n Debe contener como maximo 2 caracteres."
    return ""
}

export const validateBreed = (value) => {
    if(!value)
        return "La raza es obligatoria."
    if(!regexBreed.test(value))
        return "Solo puede contener letras.\n Debe contener entre 2 y 20 caracteres"
    return ""
}