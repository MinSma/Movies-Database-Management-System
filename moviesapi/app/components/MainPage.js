import React from "react";
import dateFormat from 'dateformat';
import NavigationBar from "./NavigationBar";
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import MovieDialogForm from './MovieDialogForm/MovieDialogForm';
import { Button } from '@material-ui/core';
import ActorControlDialogForm from "./ActorControlDialogForm/ActorControlDialogForm";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false,
            actorControlDialogIsOpen: false,
            editingMovie: undefined
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleActorsManagement = this.handleActorsManagement.bind(this);
        this.handleActorsManagementDialogClose = this.handleActorsManagementDialogClose.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.getAllMovies();
        this.props.getAllGenres();
        this.props.getAllActors();
    }

    handleDialogClose() {
        this.setState({
            dialogIsOpen: false,
            editingMovie: undefined
        });
    }

    handleAddButtonClick() {
        this.setState({
            dialogIsOpen: true
        });
    }

    handleEditButtonClick(movie) {
        movie.year = dateFormat(movie.releaseDate, "yyyy");
        movie.month = dateFormat(movie.releaseDate, "mm");
        movie.day = dateFormat(movie.releaseDate, "dd");

        this.setState({
            dialogIsOpen: true,
            editingMovie: movie
        });
    }

    handleDialogSubmit(values) {
        if(values.id === undefined) {
            let movie = {
                title: values.title,
                releaseDate: `${values.year}-${values.month}-${values.day}`,
                genreId: values.genreId,
                actors: values.actors
            };

            this.props.addMovie(movie);

            this.setState({
                dialogIsOpen: false
            });
        } else {
            let movie = {
                id: values.id,
                title: values.title,
                releaseDate: `${values.year}-${values.month}-${values.day}`,
                genreId: values.genreId,
                actors: values.actors
            };
            
            this.props.editMovie(movie);

            this.setState({
                editingMovie: undefined,
                dialogIsOpen: false
            });
        }
    }

    handleRemove(id) {
        this.props.removeMovie(id);
    }

    handleActorsManagement(movie) {
        this.setState({
            actorControlDialogIsOpen: true,
            editingMovie: movie
        });
    }

    handleActorsManagementDialogClose() {
        this.setState({
            actorControlDialogIsOpen: false,
            editingMovie: undefined
        });
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
                    <span className="tableButtons">
                        <Button onClick={this.handleEditButtonClick.bind(this, movie)} variant="raised" color="primary">Edit</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleActorsManagement.bind(this, movie)} variant="raised" color="primary">Actors</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleRemove.bind(this, movie.id)} variant="raised" color="secondary">Remove</Button>
                    </span>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar handleSearch={this.props.getAllMovies} />
                <AddButton action={this.handleAddButtonClick} text={"Movie"} />
                <TableComponent headers={headers} data={data} />
                {this.renderAddEditDialog()}
                {this.state.actorControlDialogIsOpen && <ActorControlDialogForm movieId={this.state.editingMovie.id}
                                                                                handleClose={this.handleActorsManagementDialogClose}
                                                                                addActor={this.props.addActor}
                                                                                removeActor={this.props.removeActor}
                                                                                editActor={this.props.editActor}
                                                                                actors={this.props.actors}
                                                                                addRelationship={this.props.addRelationship}
                                                                                removeRelationship={this.props.removeRelationship}
                />}
            </div>
        );
    }

    renderAddEditDialog() {
        let title = this.state.editingMovie ? "EDIT MOVIE" : "ADD NEW MOVIE";
        let buttonText = this.state.editingMovie ? "SAVE" : "ADD";
    
        if (this.state.dialogIsOpen) {
            return <MovieDialogForm
                onSubmit={this.handleDialogSubmit}
                handleClose={this.handleDialogClose}
                initialValues={this.state.editingMovie}
                formTitle={title}
                buttonText={buttonText}
                genres={this.props.genres}
            />
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = (store) => {
    return {
        movies: store.movies,
        genres: store.genres,
        actors: store.actors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);