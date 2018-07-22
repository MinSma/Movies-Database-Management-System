import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button, Input } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';

let initialValues = {};

class GenreDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        }

        if(Object.keys(this.props.initialValues).length === 0) {
            initialValues.name = "";
        } else {
            initialValues = this.props.initialValues;
        }

        this.handleClose = this.handleClose.bind(this);
        this.submitValidation = submitValidation.bind(this);
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        if(this.props.handleClose !== undefined) {
            this.props.handleClose();
        }
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
                            <div className="error-message">{this.props.error && <strong>{this.props.error}</strong>}</div>
                            <p className="required-field">Name:</p>
                            <Field
                                name="name"
                                component={this.renderInputBox}
                                label="Name"
                                style={this.renderInputStyles()}
                                inputText={initialValues.name}
                            />
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

    renderInputBox(props) {
        delete props.input.value;

        return(
            <div>
                {props.meta.touched && props.meta.error && <span className="error-message">{props.meta.error}</span>}
                <Input
                    style={props.style}
                    className={props.className}
                    {...props.input}
                    error={props.meta.invalid}
                    defaultValue={props.inputText}
                />
            </div>
        );
    }
}

export default reduxForm({ 
    form: 'GenreDialogForm',
    initialValues: initialValues,
    validate: typeValidation
})(GenreDialogForm);