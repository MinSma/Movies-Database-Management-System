import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import ActorDialogForm from './ActorDialogForm/ActorDialogForm';

class ActorsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false
        }

        this.handleButtonOnClick = this.handleButtonOnClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.getAllActors();
    }

    handleDialogClose() {
        this.setState({
            dialogIsOpen: false
        });
    }

    handleButtonOnClick() {
        this.setState({
            dialogIsOpen: true
        });
    }

    handleDialogSubmit(values) {
        this.props.addActor(values);
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
                actor.lastName 
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleButtonOnClick} text={"Actor"} />
                <TableComponent headers={headers} data={data} />

                {this.state.dialogIsOpen && <ActorDialogForm onSubmit={this.handleDialogSubmit}
                                                             formTitle={"ADD NEW ACTOR"} 
                                                             buttonText={"ADD"}
                                                             handleClose={this.handleDialogClose} />
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