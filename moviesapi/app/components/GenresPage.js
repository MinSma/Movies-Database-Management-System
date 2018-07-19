import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class GenresPage extends React.Component {
    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        var headers = [ 
            'Name',
            'Actions'
        ];

        var data = this.props.genres.map((genre) => {
            return [ 
                genre.name 
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton text={"Genre"} />
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
        genres: store.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenresPage);