import React from 'react';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import TableComponent from '../TableComponent';
import ActorDialogForm from '../ActorDialogForm/ActorDialogForm';
import AddExistingActorDialogForm from '../AddExistingActorDialogForm/AddExistingActorDialogForm';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions';

class ActorControlDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            dialogOn: false,
            editingActor: undefined,
            addExistingDialogOn: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleAddEditDialogClose = this.handleAddEditDialogClose.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleAddExisting = this.handleAddExisting.bind(this);
        this.handleAddExistingClose = this.handleAddExistingClose.bind(this);
        this.onSubmitAddExisting = this.onSubmitAddExisting.bind(this);
    }
    
    componentDidMount() {
        this.props.getMovieById(this.props.movieId);
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        this.props.handleClose();
    }

    handleEditButtonClick(actor) {        
        this.setState({
            dialogIsOpen: true,
            editingActor: actor
        })
    }

    handleAddButtonClick() {
        this.setState({
            dialogIsOpen: true
        });
    }

    handleAddEditDialogClose() {
        this.setState({
            dialogIsOpen: false,
            editingActor: undefined
        })
    }

    handleRemove(id) {
        let values = {};

        values.actorId = id;
        values.movieId = this.props.movie.id;
        
        this.props.removeRelationship(values);

        let func = this.props.getMovieById;
        let movieId = this.props.movieId;

            setTimeout(function timeout() {
                func(movieId);
              }, 1000);
    }

    handleDialogSubmit(values) {
        if(values.id === undefined) {
            values.movieId = this.props.movie.id;

            this.props.addActor(values);

            let func = this.props.getMovieById;
            let movieId = this.props.movieId;

            setTimeout(function timeout() {
                func(movieId);
              }, 1000);

            this.setState({
                dialogIsOpen: false
            });
        } else {
            let actor = this.state.editingActor;
            
            actor.firstName = values.firstName;
            actor.lastName = values.lastName;
            actor.movieId = this.props.movie.id;

            this.props.editActor(actor);

            this.setState({
                dialogIsOpen: false,
                editingActor: undefined
            });
        }
    }

    handleAddExisting() {
        this.setState({
            addExistingDialogOn: true
        });
    }

    handleAddExistingClose() {
        this.setState({
            addExistingDialogOn: false
        });
    }

    onSubmitAddExisting(values) {
        values.movieId = this.props.movie.id;
        
        this.props.addRelationship(values);

        let func = this.props.getMovieById;
        let movieId = this.props.movieId;

            setTimeout(function timeout() {
                func(movieId);
              }, 1000);

        this.props.getMovieById(this.props.movieId);

        this.setState({
            addExistingDialogOn: false
        });
    }

    render() {
        var headers = [ 
            'First Name',
            'Last Name',
            'Actions'
        ];

        var data = this.props.movie.actors !== undefined ? this.props.movie.actors.map((actor) => {
            return [ 
                actor.firstName, 
                actor.lastName,
                <div>
                    <span className="tableButtons">
                        <Button onClick={this.handleEditButtonClick.bind(this, actor)} variant="raised" color="primary">Edit</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleRemove.bind(this, actor.id)} variant="raised" color="secondary">Remove</Button>
                    </span>
                </div>
            ];
        }) : [];

        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                    <DialogTitle>
                        <span className="form-title">ACTORS MANAGEMENT</span>
                        <IconButton className="exit-button" onClick={this.handleClose}>
                            <CloseIcon style={{fontSize: "34px"}}/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <TableComponent headers={headers} data={data} />
                        <Button variant="raised" color="primary"
                                style={{
                                    width: "20%", 
                                    height: "50px", 
                                    margin: "5% 2%",
                                    fontSize: "12px",
                                    float: "left",
                                    margin: "2%"
                                }}
                                onClick={this.handleAddExisting}>
                                    ADD EXISTING 
                        </Button>
                        <Button variant="raised" color="primary"
                                style={{
                                    width: "20%", 
                                    height: "50px", 
                                    margin: "5% 2%",
                                    fontSize: "12px",
                                    float: "left",
                                    margin: "2%"
                                }}
                                onClick={this.handleAddButtonClick}>
                                    ADD NEW 
                        </Button>
                        {this.renderDialog()}
                        {this.state.addExistingDialogOn && <AddExistingActorDialogForm actors={this.props.actors}
                                                                                       movieActors={this.props.movie.actors}
                                                                                       handleClose={this.handleAddExistingClose}
                                                                                       onSubmit={this.onSubmitAddExisting}
                        />}
                    </DialogContent>
            </Dialog>
        );
    }

    renderDialog() {
        let title = this.state.editingActor ? "EDIT ACTOR" : "ADD NEW ACTOR";
        let buttonText = this.state.editingActor ? "SAVE" : "ADD";
    
        if (this.state.dialogIsOpen) {
            return <ActorDialogForm
                onSubmit={this.handleDialogSubmit}
                handleClose={this.handleAddEditDialogClose}
                initialValues={this.state.editingActor}
                formTitle={title}
                buttonText={buttonText}
            />
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = (store) => {
    return {
        movie: store.movie
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorControlDialogForm);