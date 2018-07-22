import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Button, Input } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { submitValidation, typeValidation } from './validation';
import PropTypes from 'prop-types';

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