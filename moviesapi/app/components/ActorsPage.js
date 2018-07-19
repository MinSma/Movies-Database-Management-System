import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class ActorsPage extends React.Component {
    componentDidMount() {
        this.props.getAllActors();
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
                <AddButton text={"Actor"} />
                <TableComponent headers={headers} data={data} />
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