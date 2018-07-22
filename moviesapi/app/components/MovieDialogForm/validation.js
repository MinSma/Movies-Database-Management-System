import { SubmissionError } from 'redux-form';

export function typeValidation(values) {
    let errors = {};
    
    let numberRegex = /^[0-9]*$/;

    if(values['year'] !== undefined && !values['year'].match(numberRegex)) {
        errors.year = "Wrong year format";
    }

    if(values['month'] !== undefined && !values['month'].match(numberRegex)) {
        errors.month = "Wrong month format";
    }

    if(values['day'] !== undefined && !values['day'].match(numberRegex)) {
        errors.day = "Wrong day format";
    }

    return errors;
}

export function submitValidation(values) {
    if(!values['title']) {
        throw new SubmissionError({ 
            title: "Title value required.", 
            _error: "Title value required." 
        });
    }

    if(!values['year']) {
        throw new SubmissionError({
            year: "Release year required.",
            _error: "Release year required."
        });
    }

    let yearRegex = /^(19|20)\d{2}$/;

    if(values['year'] && values['year'].match(yearRegex) === null) {
        throw new SubmissionError({ 
            year: "Wrong day type value.", 
            _error: "Wrong day type value." });
    }

    if(!values['month']) {
        throw new SubmissionError({
            month: "Release month required.",
            _error: "Release month required."
        });
    }

    let monthRegex = /^\d{2}$/;

    if(values['month'] && values['month'].match(monthRegex) === null) {
        throw new SubmissionError({ 
            month: "Wrong month type value.", 
            _error: "Wrong month type value." });
    } else {
        if(values['month'] > 12 || values['month'] < 1) {
            throw new SubmissionError({ 
                month: "Wrong month type value.", 
                _error: "Wrong month type value." });
        }
    }

    if(!values['day']) {
        throw new SubmissionError({
            day: "Release day required.",
            _error: "Release day required."
        });
    }

    let dayRegex = /^\d{2}$/;

    if(values['day'] && values['day'].match(dayRegex) === null) {
        throw new SubmissionError({ 
            day: "Wrong day type value.", 
            _error: "Wrong day type value." });
    } else {
        if(values['day'] > 31 || values['day'] < 1) {
            throw new SubmissionError({ 
                day: "Wrong day type value.", 
                _error: "Wrong day type value." });
        }
    }

    if(!values['genreId']) {
        throw new SubmissionError({
            genreId: "Genre value required.",
            _error: "Genre value required."
        });
    }

    this.props.onSubmit(values);
    this.handleClose();
}