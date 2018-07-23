import { SubmissionError } from 'redux-form';

export function submitValidation(values) {
    if(!values['actorId']) {
        throw new SubmissionError({
            actorId: "Actor selection required.",
            _error: "Actor selection required."
        });
    }

    this.props.onSubmit(values);
    this.handleClose();
}