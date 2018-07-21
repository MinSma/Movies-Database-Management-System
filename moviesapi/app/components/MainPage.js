import React from "react";
import dateFormat from 'dateformat';
import NavigationBar from "./NavigationBar";
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import MovieDialogForm from './MovieDialogForm/MovieDialogForm';
import { Button } from '@material-ui/core';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogIsOpen: false,
            editDialogIsOpen: false,
            editingMovie: ''
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleAddDialogClose = this.handleAddDialogClose.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleEditDialogClose = this.handleEditDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.getAllMovies();
        this.props.getAllGenres();
    }

    handleAddDialogClose() {
        this.setState({
            addDialogIsOpen: false
        });
    }

    handleAddButtonClick() {
        this.setState({
            addDialogIsOpen: true
        });
    }

    handleEditDialogClose() {
        this.setState({
            editDialogIsOpen: false,
            editingMovie: ''
        });
    }

    handleEditButtonClick(movie) {
        movie.year = dateFormat(movie.releaseDate, "yyyy");
        movie.month = dateFormat(movie.releaseDate, "mm");
        movie.day = dateFormat(movie.releaseDate, "dd");

        this.setState({
            editDialogIsOpen: true,
            editingMovie: movie
        });
    }

    handleDialogSubmit(values) {
        if(values.id === undefined) {
            let movie = {
                title: values.title,
                releaseDate: `${values.year}-${values.month}-${values.day}`,
                genreId: values.genreId
            };

            this.props.addMovie(movie);
        } else {
            let movie = {
                id: values.id,
                title: values.title,
                releaseDate: `${values.year}-${values.month}-${values.day}`,
                genreId: values.genreId
            };
            
            this.props.editMovie(movie);
        }
    }

    handleRemove(id) {
        this.props.removeMovie(id);
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
                movie.genreName,
                <div>
                    <Button onClick={this.handleEditButtonClick.bind(this, movie)} variant="raised" color="primary">Edit</Button>
                    <Button onClick={this.handleRemove.bind(this, movie.id)} variant="raised" color="primary">Remove</Button>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar handleSearch={this.props.getAllMovies} />
                <AddButton action={this.handleAddButtonClick} text={"Movie"} />
                <TableComponent headers={headers} data={data} />

                {this.state.addDialogIsOpen && <MovieDialogForm onSubmit={this.handleDialogSubmit}
                                                                formTitle={"ADD NEW MOVIE"} 
                                                                buttonText={"ADD"}
                                                                handleClose={this.handleAddDialogClose} 
                                                                genres={this.props.genres} />
                }

                {this.state.editDialogIsOpen && <MovieDialogForm initialValues={this.state.editingMovie}
                                                                 onSubmit={this.handleDialogSubmit}
                                                                 formTitle={"EDIT MOVIE"}
                                                                 buttonText={"EDIT"}
                                                                 handleClose={this.handleEditDialogClose}
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