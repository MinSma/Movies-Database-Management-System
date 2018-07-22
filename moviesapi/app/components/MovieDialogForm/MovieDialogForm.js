import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Select } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button, Input } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';
import dateFormat from 'dateformat';

let initialValues = {};

class MovieDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            genreId: ''
        }

        if(Object.keys(this.props.initialValues).length === 0) {
            initialValues.title = "";
            initialValues.year = "";
            initialValues.month = "";
            initialValues.day = "";
        } else {
            initialValues.title = this.props.initialValues.title;
            initialValues.year = dateFormat(this.props.initialValues.releaseDate, "yyyy");
            initialValues.month = dateFormat(this.props.initialValues.releaseDate, "mm");
            initialValues.day = dateFormat(this.props.initialValues.releaseDate, "dd");
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

        if(this.props.handleClose !== undefined) {
            this.props.handleClose();
        }
    }

    handleGenreSelection(e) {
        this.setState({
            genreId: e.target.value
        });
    }

    render() {
        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                <form onSubmit={this.props.handleSubmit(this.submitValidation)}>
                    <DialogTitle>
                        <span className="form-title">{this.props.formTitle}</span>
                        <IconButton className="exit-button" onClick={this.handleClose}>
                            <CloseIcon style={{fontSize: "34px"}}/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <div className="form-content">
                            <p className="required-field">Title:</p>
                            <Field
                                name="title"
                                component={this.renderInputBox}
                                label="Title"
                                style={this.renderInputStyles()}
                                inputText={initialValues.title}
                            />
                            <p className="required-field">Release Date:</p>
                            <span className="dateInputs">
                                <Field
                                    name="year"
                                    component={this.renderInputBox}
                                    label="Year"
                                    placeholder="Year"
                                    style={this.renderDateInputStyles()}
                                    inputText={initialValues.year}
                                />
                            </span>
                            <span className="dateInputs">
                                <Field
                                    name="month"
                                    component={this.renderInputBox}
                                    label="Month"
                                    placeholder="Month"
                                    style={this.renderDateInputStyles()}
                                    inputText={initialValues.month}
                                />
                            </span>
                            <span className="dateInputs">
                            <Field
                                name="day"
                                component={this.renderInputBox}
                                label="Day"
                                placeholder="Day"
                                style={this.renderDateInputStyles()}
                                inputText={initialValues.day}
                            />
                            </span>
                            <p className="required-field">Select Genre:</p>
                            {this.renderGenreSelection()}
                        </div>
                        <Button type="submit" variant="raised" color="primary"
                                style={{
                                    width: "140px", 
                                    height: "40px", 
                                    margin: "5% 2%",
                                    float: "left",
                                    margin: "2%"
                                }}>
                            {this.props.buttonText}
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

    renderInputStyles() {
        return {
            border: "1px solid #DADFE1",
            borderRadius: "5px",
            height: "40px",
            width: "91.5%",
            paddingLeft: "10px"
        };
    }

    renderDateInputStyles() {
        return {
            border: "1px solid #DADFE1",
            width: '80%'
        }
    }

    renderInputBox(props) {
        delete props.input.value;
        return(
            <div>
                {props.meta.touched && props.meta.error && <span className="error-message">{props.meta.error}</span>}
                <Input
                    style={props.style}
                    className={props.className}
                    {...props.input}
                    placeholder={props.placeholder}
                    error={props.meta.invalid}
                    defaultValue={props.inputText}
                />
            </div>
        );
    }

    renderDropdown(props) {
        let selections = props.options.map(opt => {
            return <option value={opt.id} key={opt.id}>{opt.value}</option>;
        });

        if (props.primarySelection === true) {
            selections.unshift(<option value='' key={0}>Select {props.label}</option>)
        }

        delete props.input.value;
        return (
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
        );
    }

    renderGenreSelection() {
        return (
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
        );
    }
}

export default reduxForm({ 
    form: 'GenreDialogForm',
    initialValues: initialValues,
    validate: typeValidation
})(MovieDialogForm);