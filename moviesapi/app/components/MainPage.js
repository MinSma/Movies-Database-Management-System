import React from "react";
import NavigationBar from "./NavigationBar";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class MainPage extends React.Component {
    componentDidMount() {
        this.props.getAllMovies();
    }

    render () {
        return (
            <div>
                <NavigationBar />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = (store) => {
    return {
        movies: store.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);