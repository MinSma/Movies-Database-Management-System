import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import { Button } from '@material-ui/core';
import ActorDialogForm from './ActorDialogForm/ActorDialogForm';
import MovieControlDialogForm from "./MovieControlDialogForm/MovieControlDialogForm";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class ActorsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
            editingActor: undefined,
            movieControlDialogIsOpen: false
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMoviesManagement = this.handleMoviesManagement.bind(this);
        this.handleMoviesManagementDialogClose = this.handleMoviesManagementDialogClose.bind(this);
    }
    
    componentDidMount() {
        this.props.getAllActors();
    }

    handleDialogClose() {
        this.setState({
            dialogIsOpen: false,
            editingActor: undefined
        });
    }

    handleAddButtonClick() {
        this.setState({
            dialogIsOpen: true
        });
    }

    handleEditButtonClick(actor) {
        this.setState({
            dialogIsOpen: true,
            editingActor: actor
        })
    };

    handleDialogSubmit(values) {
        if(values.id === undefined) { 
            this.props.addActor(values);

            this.setState({
                dialogIsOpen: false
            });
        } else {
            let actor = this.state.editingActor;
            
            actor.firstName = values.firstName;
            actor.lastName = values.lastName;

            this.props.editActor(actor);

            this.setState({
                dialogIsOpen: false,
                editingActor: undefined
            });
        }
    }

    handleRemove(id) {
        this.props.removeActor(id);
    }

    handleMoviesManagement(actor) {
        this.setState({
            movieControlDialogIsOpen: true,
            editingActor: actor
        });
    }

    handleMoviesManagementDialogClose() {
        this.setState({
            movieControlDialogIsOpen: false,
            editingActor: undefined
        });
    }

    render() {
        var headers = [ 
            'First Name',
            'Last Name',
            'Actions'
        ];

        var data = this.props.actors.map((actor) => {
            return [ 
                actor.firstName, 
                actor.lastName,
                <div>
                    <span className="tableButtons">
                        <Button onClick={this.handleEditButtonClick.bind(this, actor)} variant="raised" color="primary">Edit</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleMoviesManagement.bind(this, actor)} variant="raised" color="primary">Movies</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleRemove.bind(this, actor.id)} variant="raised" color="secondary">Remove</Button>
                    </span>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleAddButtonClick} text={"Actor"} />
                <TableComponent headers={headers} data={data} />
                {this.renderDialog()}
                {this.state.movieControlDialogIsOpen && <MovieControlDialogForm actorId={this.state.editingActor.id}
                                                                                handleClose={this.handleMoviesManagementDialogClose}
                />}
            </div>
        );
    }

    renderDialog() {
        let title = this.state.editingActor ? "EDIT ACTOR" : "ADD NEW ACTOR";
        let buttonText = this.state.editingActor ? "SAVE" : "ADD";
    
        if (this.state.dialogIsOpen) {
            return <ActorDialogForm
                onSubmit={this.handleDialogSubmit}
                handleClose={this.handleDialogClose}
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
        actors: store.actors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorsPage);