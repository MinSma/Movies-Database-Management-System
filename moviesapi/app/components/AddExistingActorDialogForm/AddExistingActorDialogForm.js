import React from 'react';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, IconButton, Select } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { submitValidation } from './validation';
import PropTypes from 'prop-types';

class AddExistingActorDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            actorId: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleActorSelection = this.handleActorSelection.bind(this);
        this.submitValidation = submitValidation.bind(this);
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        this.props.handleClose();
    }

    handleActorSelection(e) {
        this.setState({
            actorId: e.target.value
        });
    }

    render() {
        var data = this.props.actors.map((actor) => {
            let count = 0;
            this.props.movieActors.map((movieActor) => {
                if(actor.id === movieActor.id){
                    count++;
                }
            });

            if(count === 0)
                return actor;
        });

        data = data.filter(n => n);

        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                    <form onSubmit={this.props.handleSubmit(this.submitValidation)}>
                        <DialogTitle>
                            <span className="form-title">ADD EXISTING ACTOR</span>
                            <IconButton className="exit-button" onClick={this.handleClose}>
                                <CloseIcon style={{fontSize: "34px"}}/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <Field
                                name="actorId"
                                label="Actor"
                                options={data.map(x => ({ id: x.id, value: x.firstName + ' ' + x.lastName }))}
                                width="40%"
                                inputText={this.state.actorId}
                                component={this.renderDropdown}
                                primarySelection={true}
                                onChange={(event) => this.handleActorSelection(event)}
                            />
                            <Button type="submit" variant="raised" color="primary"
                                    style={{
                                        width: "140px", 
                                        height: "40px", 
                                        margin: "5% 2%",
                                        float: "left",
                                        margin: "2%"
                                    }}>
                                Add
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

AddExistingActorDialogForm.propTypes = {
    actors: PropTypes.array.isRequired,
    movieActors: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default reduxForm({ 
    form: 'AddExistingActorDialogForm'
})(AddExistingActorDialogForm);