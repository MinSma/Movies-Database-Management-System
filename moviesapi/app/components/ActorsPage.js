import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import { Button } from '@material-ui/core';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import ActorDialogForm from './ActorDialogForm/ActorDialogForm';

class ActorsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogIsOpen: false,
            editDialogIsOpen: false,
            editingActor: ''
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleAddDialogClose = this.handleAddDialogClose.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleEditDialogClose = this.handleEditDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    
    componentDidMount() {
        this.props.getAllActors();
    }

    handleAddDialogClose() {
        this.setState({
            addDialogIsOpen: false
        });
    }

    handleEditDialogClose() {
        this.setState({
            editDialogIsOpen: false
        });
    }

    handleAddButtonClick() {
        this.setState({
            addDialogIsOpen: true
        });
    }

    handleEditButtonClick(actor) {
        this.setState({
            editDialogIsOpen: true,
            editingActor: actor
        })
    };

    handleDialogSubmit(values) {
        if(values.id === undefined) { 
            this.props.addActor(values);
        } else {
            let actor = this.state.editingActor;
            
            actor.firstName = values.firstName;
            actor.lastName = values.lastName;

            this.props.editActor(actor);
        }
    }

    handleRemove(id) {
        this.props.removeActor(id);
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
                    <Button onClick={this.handleEditButtonClick.bind(this, actor)} variant="raised" color="primary">Edit</Button>
                    <Button onClick={this.handleRemove.bind(this, actor.id)} variant="raised" color="primary">Remove</Button>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleAddButtonClick} text={"Actor"} />
                <TableComponent headers={headers} data={data} />

                {this.state.addDialogIsOpen && <ActorDialogForm onSubmit={this.handleDialogSubmit}
                                                             formTitle={"ADD NEW ACTOR"} 
                                                             buttonText={"ADD"}
                                                             handleClose={this.handleAddDialogClose} />
                }

                {this.state.editDialogIsOpen && <ActorDialogForm initialValues={this.state.editingActor}
                                                                 onSubmit={this.handleDialogSubmit}
                                                                 formTitle={"EDIT ACTOR"}
                                                                 buttonText={"EDIT"}
                                                                 handleClose={this.handleEditDialogClose} />
                }
            </div>
        );

        return (
            <div>
                <NavigationBar />
                <div>Actors Page</div>
            </div>
        );
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