import Validator from 'validator'
import isEmpty from './isEmpty'

export default (email, password) => {
    let errors = {}

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if(!Validator.isEmail(email)) {
        errors.email = '* Please Enter a Valid Email address';
    }

    if(Validator.isEmpty(email)) {
        errors.email = '* Email field is required';
    }

    if(Validator.isEmpty(password)) {
        errors.password = '* Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
