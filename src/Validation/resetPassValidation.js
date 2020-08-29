import Validator from 'validator';
import isEmpty from './isEmpty';

export default function resetPasswordValidation (email) {

    let errors = {}

    email = !isEmpty(email) ? email : '';

    if(!Validator.isEmail(email)) {
        errors.email = 'Please Enter a Valid Email address';
    }

    if(Validator.isEmpty(email)) {
        errors.email = 'Email field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
