import { SubmissionError } from 'redux-form';

export function submitValidation(values) {
    if(!values['movieId']) {
        throw new SubmissionError({
            movieId: "Movie selection required.",
            _error: "Movie selection required."
        });
    }

    this.props.onSubmit(values);
    this.handleClose();
}