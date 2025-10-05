const regexFirstName = /^[a-zA-ZÀ-ÿ]+$/;
const regexLastName = /^[a-zA-ZÀ-ÿ\s]+$/;
const regexDni = /^\d{7,8}$/;
export const regexNames = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/;
const regexPetName = /^[a-zA-ZÀ-ÿ]+$/;
const regexAge = /^[1-9]\d?$/;
const regexBreed = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,20}$/;

export const validateFirstName = (value) => {
  if(!value.trim())
    return "Este campo es obligatorio."
  if (!regexFirstName.test(value))
    return "El nombre solo puede contener letras";
  return "";
};

export const validateLastName = (value) => {

  if (!regexLastName.test(value))
    return "El apellido solo puede contener letras y espacios";
  return "";
};

export const validateDni = (value) => {
  if(!value.trim())
    return "Este campo es obligatorio."
  if (!regexDni.test(value)) return "El DNI debe tener 7 u 8 números";
  return "";
};

export const validateEmail = (value) => {
  if(!value.trim())
    return "Este campo es obligatorio."
  if (!regexEmail.test(value)) return "El email no es válido";
  return "";
};

export const validatePassword = (value) => {
  if(!value.trim())
    return "Este campo es obligatorio."
  if (!regexPassword.test(value))
    return "La contraseña debe tener:\n entre 7 y 20 caracteres\n al menos una mayúscula y un número";
  return "";
};

export const validateAddPetName = (value) => {
  if (!value) 
    return "El nombre debe ser obligatorio.";
  if (!regexPetName.test(value)) return "El nombre solo puede contener letras";
  return "";
};

export const validatePetAge = (value) => {
  if (!value) 
    return "La edad es obligatoria.";
  if (!regexAge.test(value))
    return "La edad no puede ser 0 o menos.\n Debe contener como maximo 2 caracteres.";
  return "";
};

export const validateBreed = (value) => {
  if (!value) 
    return "La raza es obligatoria.";
  if (!regexBreed.test(value))
    return "Solo puede contener letras.\n Debe contener entre 2 y 20 caracteres";
  return "";
};

export const validateImgUrl = (value) => {
  if (!value) 
    return "La raza es obligatoria.";
  return "";
}

/* Login Validation */

export const validateLogin = (value, setter, error, regex) => {
  if (!value.length) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 1 }));
    return false;
  } else if (!regex.test(value)) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 2 }));
    return false;
  }
  setter((prevErrors) => ({ ...prevErrors, [error]: 0 }));
  return true;
};

/* Register Validations */

export const validateRegisterNames = (value, setter, error, regex) => {
  if (!value.length) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 1 }));
    return false;
  } else if (value.length < 3 || value.length > 50) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 2 }));
    return false;
  } else if (!regex.test(value.trim())) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 3 }));
    return false;
  }
  setter((prevErrors) => ({ ...prevErrors, [error]: 0 }));
  return true;
};

export const validateRegisterDni = (value, setter, error) => {
  if (!value.length) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 1 }));
    return false;
  } else if (value < 0) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 3 }));
    return false;
  } else if (value < 10000000 || value > 99999999) {
    setter((prevErrors) => ({ ...prevErrors, [error]: 2 }));
    return false;
  }
  setter((prevErrors) => ({ ...prevErrors, [error]: 0 }));
  return true;
};
