import React from 'react';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, IconButton, Select } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { submitValidation } from './validation';
import PropTypes from 'prop-types';

class AddExistingMovieDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            actorId: ''
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleMovieSelection = this.handleMovieSelection.bind(this);
        this.submitValidation = submitValidation.bind(this);
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        this.props.handleClose();
    }

    handleMovieSelection(e) {
        this.setState({
            actorId: e.target.value
        });
    }

    render() {
        var data = this.props.movies.map((movie) => {
            let count = 0;
            this.props.actorMovies.map((actorMovie) => {
                if(movie.id === actorMovie.id){
                    count++;
                }
            });

            if(count === 0)
                return movie;
        });

        data = data.filter(n => n);
        
        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                    <form onSubmit={this.props.handleSubmit(this.submitValidation)}>
                        <DialogTitle>
                            <span className="form-title">ADD EXISTING MOVIE</span>
                            <IconButton className="exit-button" onClick={this.handleClose}>
                                <CloseIcon style={{fontSize: "34px"}}/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <Field
                                name="movieId"
                                label="Movie"
                                options={data.map(x => ({ id: x.id, value: x.title }))}
                                width="40%"
                                inputText={this.state.actorId}
                                component={this.renderDropdown}
                                primarySelection={true}
                                onChange={(event) => this.handleMovieSelection(event)}
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

AddExistingMovieDialogForm.propTypes = {
    movies: PropTypes.array.isRequired,
    actorMovies: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default reduxForm({ 
    form: 'AddExistingMovieDialogForm'
})(AddExistingMovieDialogForm);