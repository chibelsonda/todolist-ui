function isEmpty(value) {
    if (value === null || value === undefined || value === '') {
        return true;
    }
    if (Array.isArray(value) && value.length === 0) {
        return true;
    }
    return false;
}

function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

function isEmptyArray(arr) {
    return Array.isArray(arr) && arr.length === 0;
}

const requiredValidator = (value) => {
    if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) {
        return "This field is required.";
    }
    if (!!String(value).trim().length) return true;

    return "This field is required.";
}

const minLengthValidator = (length) => (value) => {

    if (isEmpty(value)) {
        return true;
    }
    if (Array.isArray(value)) {
        if (value.every(val => minLengthValidator(val, { length }))) return true;
    }
    if ([...String(value)].length >= Number(length)) return true;

    return `This field must be min ${length} characters. `
}

const maxLengthValidator = (length) => (value) => {
    if (isEmpty(value)) {
        return true;
    }

    if (Array.isArray(value)) {
        if (value.every(val => maxLengthValidator(val, { length }))) return true;
    }
    if ([...String(value)].length <= Number(length)) return true;

    return `This field must be max ${length} characters.`
};

const emailValidator = (value) => {
    if (isEmpty(value)) {
        return true;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Array.isArray(value)) {
        if (value.every(val => re.test(String(val)))) return true
    }
    if (re.test(String(value))) return true;
    return "Please enter a valid email address."
}

const passwordValidator = (value) => {
    if (isEmpty(value)) {
        return true;
    }
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#%^&*_\-])(?=.*[0-9])(?=.*[!@#%^&*_\-])/;
    if (Array.isArray(value)) {
        if (value.every(val => re.test(String(val)))) return true
    }
    if (re.test(String(value))) return true;
    return "Please enter alphanumeric and special characters."
}

const integerValidator = (value) => {
    if (isEmpty(value)) {
        return true;
    }
    if (Array.isArray(value)) {
        if (value.every(val => /^-?[0-9]+$/.test(String(val)))) return true;
    }
    if (/^-?[0-9]+$/.test(String(value))) return true;
    return `This field must be an integer.`
};


export {
    requiredValidator as required,
    maxLengthValidator as max,
    minLengthValidator as min,
    emailValidator as email,
    integerValidator as integer,
    passwordValidator as password
}