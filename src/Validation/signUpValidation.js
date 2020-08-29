import Validator from 'validator'
import isEmpty from './isEmpty'



export default function validateSignUpInput(data, password, confirmPassword) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    // data.userAvatar = !isEmpty(data.userAvatar) ? data.userAvatar : ''
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : ''

    if(!Validator.isLength(data.name, {min: 2, max: 25})) {
        errors.name = '* name must be between 2 and 30 characters';
    } 

    if(Validator.isEmpty(data.name)) {
        errors.name = '* Please Enter your name';
    }

    if(!Validator.isMobilePhone(data.phone)){
        errors.phone = "* Please Enter a Valid Phone Number"
    }

    if(Validator.isEmpty(data.phone)) {
        errors.phone = "* Please Enter your Phone Number"
    }

    // if(Validator.isEmpty(data.userAvatar)) {
    //     errors.userAvatar = '* Please attach an Image';
    // }

    if(!Validator.isEmail(data.email)) {
        errors.email = '* Please Enter a Valid Email address';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = '* Email field is required';
    }

    if(Validator.isEmpty(data.title)) {
        errors.title = '* Title field is required';
    }

    if(Validator.isEmpty(data.department)) {
        errors.department = '* Department field is required';
    }

    if(!Validator.isLength(password, {min: 6, max: 30})) {
        errors.password = '* Password must be atleast 6 characters';
    }

    if(Validator.isEmpty(password)) {
        errors.password = '* Password field is required';
    }

    if(Validator.isEmpty(confirmPassword)) {
        errors.confirmPassword = '* Confirm Password field is required';
    }

    if(!Validator.equals(password, confirmPassword)) {
        errors.confirmPassword = '* Passwords must match';
    }
    

    // if(Validator.isEmpty(data.profileImgUrl)) {
    //     errors.profileImgUrl = 'Please Upload Your Image'
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}