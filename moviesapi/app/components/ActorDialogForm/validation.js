import { SubmissionError } from 'redux-form';

export function typeValidation(values) {
    let errors = {};

    let nameRegex = /^[A-Za-z]*$/;

    if(values['firstName'] !== undefined && !values['firstName'].match(nameRegex)) {
        errors.firstName = "Wrong first name format";
    }

    if(values['lastName'] !== undefined && !values['lastName'].match(nameRegex)) {
        errors.lastName = "Wrong last name format";
    }

    return errors;
}

export function submitValidation(values) {
    if(!values['firstName']) {
        throw new SubmissionError({ 
            firstName: "First name value required.",                         
            _error: "First name value required." 
        });
    }

    if(!values['lastName']) {
        throw new SubmissionError({ 
            lastName: "Last name value required.",
            _error: "Last name value required."
        });
    }

    this.props.onSubmit(values);
    this.handleClose();
}