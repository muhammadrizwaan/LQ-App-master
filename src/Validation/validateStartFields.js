import Validator from 'validator'
import isEmpty from './isEmpty'



export default function validateSignUpInput(isStartDateSelected, isEndDateSelected, startDate, endDate, comments) {
    let errors = {}

    if(!isStartDateSelected) {
        errors.startDate = '* Please Select Start Date';
    } 

    if(!isEndDateSelected) {
        errors.endDate = '* Please Select End Date';
    }

    if(endDate < startDate) {
        errors.endDate = '* End date must be greater than start date'
    }

    if(Validator.isEmpty(comments)) {
        errors.comments = "* Please add Comments/Planned Activities"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}