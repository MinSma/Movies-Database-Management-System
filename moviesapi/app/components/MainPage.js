import React from "react";
import dateFormat from 'dateformat';
import NavigationBar from "./NavigationBar";
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import MovieDialogForm from './MovieDialogForm/MovieDialogForm';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class MainPage extends React.Component {
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
        this.props.getAllMovies();
        this.props.getAllGenres();
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
        let movie = {
            title: values.title,
            releaseDate: `${values.year}-${values.month}-${values.day}`,
            genreId: values.genreId
        };

        this.props.addMovie(movie);
    }

    render () {
        var headers = [ 
            'Title',
            'Release Date',
            'Genre',
            'Actions'
        ];

        var data = this.props.movies.map((movie) => {
            return [ 
                movie.title, 
                dateFormat(movie.releaseDate, "yyyy-mm-dd"),
                movie.genreName
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleButtonOnClick} text={"Movie"} />
                <TableComponent headers={headers} data={data} />

                {this.state.dialogIsOpen && <MovieDialogForm onSubmit={this.handleDialogSubmit}
                                                             formTitle={"ADD NEW MOVIE"} 
                                                             buttonText={"ADD"}
                                                             handleClose={this.handleDialogClose} 
                                                             genres={this.props.genres} />
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = (store) => {
    return {
        movies: store.movies,
        genres: store.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);