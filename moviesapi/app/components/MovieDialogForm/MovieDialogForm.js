import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Select } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';
import PropTypes from 'prop-types';
import { renderInputStyles, renderInputBox, renderDateInputStyles, renderActors } from '../renderFunctionsForDialogs';

let initialValues = {};

class MovieDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            genreId: ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.submitValidation = submitValidation.bind(this);
    }

    componentDidMount() {
        if(Object.keys(this.props.initialValues).length !== 0){
            this.setState({
                genreId: this.props.initialValues.genreId
            });
        }
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        this.props.handleClose();
    }

    handleGenreSelection(e) {
        this.setState({
            genreId: e.target.value
        });
    }

    render() {
        const { initialValues, buttonText, formTitle } = this.props;

        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                <form onSubmit={this.props.handleSubmit(this.submitValidation)}>
                    <DialogTitle>
                        <span className="form-title">{formTitle}</span>
                        <IconButton className="exit-button" onClick={this.handleClose}>
                            <CloseIcon style={{fontSize: "34px"}}/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <div className="form-content">
                            <p className="required-field">Title:</p>
                            <Field
                                name="title"
                                component={renderInputBox}
                                label="Title"
                                style={renderInputStyles()}
                                inputText={initialValues.title}
                            />
                            <p className="required-field">Release Date:</p>
                            <span className="dateInputs">
                                <Field
                                    name="year"
                                    component={renderInputBox}
                                    label="Year"
                                    placeholder="Year"
                                    style={renderDateInputStyles()}
                                    inputText={initialValues.year}
                                />
                            </span>
                            <span className="dateInputs">
                                <Field
                                    name="month"
                                    component={renderInputBox}
                                    label="Month"
                                    placeholder="Month"
                                    style={renderDateInputStyles()}
                                    inputText={initialValues.month}
                                />
                            </span>
                            <span className="dateInputs">
                            <Field
                                name="day"
                                component={renderInputBox}
                                label="Day"
                                placeholder="Day"
                                style={renderDateInputStyles()}
                                inputText={initialValues.day}
                            />
                            </span>
                            <p className="required-field">Select Genre:</p>
                            <Field
                                name="genreId"
                                label="Genre"
                                options={this.props.genres.map(x => ({ id: x.id, value: x.name }))}
                                width="40%"
                                inputText={this.state.genreId}
                                component={this.renderDropdown}
                                primarySelection={true}
                                onChange={(event) => this.handleGenreSelection(event)}
                            />
                            {buttonText === 'ADD' && <FieldArray name="actors" component={renderActors} />}
                            <div className="error-message">{this.props.error && <strong>{this.props.error}</strong>}</div>
                        </div>
                        <Button type="submit" variant="raised" color="primary"
                                style={{
                                    width: "140px", 
                                    height: "40px", 
                                    margin: "5% 2%",
                                    float: "left",
                                    margin: "2%"
                                }}>
                            {buttonText}
                        </Button>
                        <Button variant="raised"
                                style={{
                                    width: "70px", 
                                    height: "40px", 
                                    margin: "5% 2%",
                                    fontSize: "12px",
                                    float: "left",
                                    margin: "2%"
                                }}
                                onClick={this.handleClose}>
                                    <CloseIcon style={{fontSize: "12px"}}/>
                                    Close 
                        </Button>
                    </DialogContent>
                </form>
            </Dialog>
        );
    }

    renderDropdown = (props) => {
        let selections = props.options.map(opt => {
            return <option value={opt.id} key={opt.id}>{opt.value}</option>;
        });
    
        if (props.primarySelection === true) {
            selections.unshift(<option value='' key={0}>Select {props.label}</option>)
        }
    
        delete props.input.value;
        return (
            <div>
                {props.meta.touched && props.meta.error && <div className="error-message">{props.meta.error}</div>}
                <Select
                    native
                    style={{
                        width: props.width,
                        backgroundColor: "white",
                        border: "1px solid #DADFE1",
                        borderRadius: "5px"
                    }}
                    className="inputDropdown"
                    {...props.input}
                    {...props.custom}
                    value={props.inputText}
                    disabled={props.disabled}
                >
                    {selections}
                </Select>
            </div>
        );
    }
}

MovieDialogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    formTitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired
};

export default reduxForm({ 
    form: 'GenreDialogForm',
    initialValues: initialValues,
    validate: typeValidation
})(MovieDialogForm);