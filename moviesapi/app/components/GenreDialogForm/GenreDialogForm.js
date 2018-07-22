import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';
import PropTypes from 'prop-types';
import { renderInputStyles, renderInputBox } from '../renderFunctionsForDialogs';

let initialValues = {};

class GenreDialogForm extends React.Component {
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

        this.props.handleClose();
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
                            <p className="required-field">Name:</p>
                            <Field
                                name="name"
                                component={renderInputBox}
                                label="Name"
                                style={renderInputStyles()}
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

GenreDialogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    formTitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default reduxForm({ 
    form: 'GenreDialogForm',
    initialValues: initialValues,
    validate: typeValidation
})(GenreDialogForm);