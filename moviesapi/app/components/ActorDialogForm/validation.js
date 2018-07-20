import { SubmissionError } from 'redux-form';

export function submitValidation(values) {
    if(!values['firstName']) {
        throw new SubmissionError({ 
            title: "First name value required.",                         
            _error: "First name value required." 
        });
    }

    if(!values['lastName']) {
        throw new SubmissionError({ 
            title: "Last name value required.",
            _error: "Last name value required."
        });
    }

    this.props.onSubmit(values);
    this.handleClose();
}