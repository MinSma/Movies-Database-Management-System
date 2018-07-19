import React from 'react';
import NavigationBar from './NavigationBar';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class ActorsPage extends React.Component {
    componentDidMount() {
        this.props.getAllActors();
    }

    render() {
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