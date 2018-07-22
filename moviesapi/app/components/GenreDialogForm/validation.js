import { SubmissionError } from 'redux-form';

export function typeValidation(values) {
    let errors = {};

    let nameRegex = /^[A-Za-z]*$/;

    if(values['name'] !== undefined && !values['name'].match(nameRegex)) {
        errors.name = "Wrong name format";
    }

    return errors;
}

export function submitValidation(values) {
    if(!values['name']) {
        throw new SubmissionError({ name: "Name value required.", 
                                    _error: "Name value required." });
    }

    this.props.onSubmit(values);
    this.handleClose();
}