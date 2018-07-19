import React from "react";
import dateFormat from 'dateformat';
import NavigationBar from "./NavigationBar";
import TableComponent from "./TableComponent";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class MainPage extends React.Component {
    componentDidMount() {
        this.props.getAllMovies();
    }

    render () {
        var headers = [ 
            'Title',
            'ReleaseDate',
            'Actions'
        ];

        var data = this.props.movies.map((movie) => {
            return [ 
                movie.title, 
                dateFormat(movie.releaseDate, "yyyy/mm/dd") 
            ];
        });

        return (
            <div>
                <NavigationBar />
                <TableComponent headers={headers} data={data} />
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