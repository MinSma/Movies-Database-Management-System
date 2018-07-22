import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';
import PropTypes from 'prop-types';
import { renderInputStyles, renderInputBox } from '../renderFunctionsForDialogs';

let initialValues = {};

class ActorDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
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
        const { initialValues, formTitle, buttonText } = this.props;

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
                            <p className="required-field">First Name:</p>
                            <Field
                                name="firstName"
                                component={renderInputBox}
                                label="First Name"
                                style={renderInputStyles()}
                                inputText={initialValues.firstName}
                            />

                            <p className="required-field">Last Name:</p>
                            <Field
                                name="lastName"
                                component={renderInputBox}
                                label="Last Name"
                                style={renderInputStyles()}
                                inputText={initialValues.lastName}
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
}

ActorDialogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    formTitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default reduxForm({ 
    form: 'ActorDialogForm',
    validate: typeValidation,
    initialValues: initialValues
})(ActorDialogForm);