import { SubmissionError } from 'redux-form';

export function submitValidation(values) {
    if(!values['name']) {
        throw new SubmissionError({ title: "Name value required.", 
                                    _error: "Name value required." });
    }

    this.props.onSubmit(values);
    this.handleClose();
}