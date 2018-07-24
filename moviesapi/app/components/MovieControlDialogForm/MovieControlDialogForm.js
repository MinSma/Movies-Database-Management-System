import React from 'react';
import { Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import TableComponent from '../TableComponent';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import AddExistingMovieDialogForm from '../AddExistingMovieDialogForm/AddExistingMovieDialogForm';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions';

class MovieControlDialogForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            addExistingDialogOn: false
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAddExisting = this.handleAddExisting.bind(this);
        this.handleAddExistingClose = this.handleAddExistingClose.bind(this);
        this.onSubmitAddExisting = this.onSubmitAddExisting.bind(this);
    }
    
    componentDidMount() {
        this.props.getActorById(this.props.actorId);
        this.props.getAllMovies();
    }

    handleClose() {
        this.setState({
            isOpen: false
        });

        this.props.handleClose();
    }

    handleRemove(id) {
        let values = {};

        values.actorId = this.props.actor.id;
        values.movieId = id;
        
        this.props.removeRelationship(values);

        let func = this.props.getActorById;
        let actorId = this.props.actorId;

        setTimeout(function timeout() {
            func(actorId);
        }, 1000);
    }

    handleAddExisting() {
        this.setState({
            addExistingDialogOn: true
        });
    }

    handleAddExistingClose() {
        this.setState({
            addExistingDialogOn: false
        });
    }

    onSubmitAddExisting(values) {
        values.actorId = this.props.actor.id;
        
        this.props.addRelationship(values);

        let func = this.props.getActorById;
        let actorId = this.props.actorId;

        setTimeout(function timeout() {
            func(actorId);
        }, 1000);

        this.setState({
            addExistingDialogOn: false
        });
    }

    render() {
        var headers = [ 
            'Title',
            'Release Date',
            'Genre',
            'Actions'
        ];

        var data = this.props.actor.movies !== undefined ? this.props.actor.movies.map((movie) => {
            return [ 
                movie.title,
                dateFormat(movie.releaseDate, "yyyy-mm-dd"),
                movie.genreName,
                <div>
                    <span className="tableButtons">
                        <Button onClick={this.handleRemove.bind(this, movie.id)} variant="raised" color="secondary">Remove</Button>
                    </span>
                </div>
            ];
        }) : [];

        return ( 
            <Dialog open={this.state.isOpen}
                    onClose={this.handleClose}
                    fullWidth={true}>
                    <DialogTitle>
                        <span className="form-title">MOVIES MANAGEMENT</span>
                        <IconButton className="exit-button" onClick={this.handleClose}>
                            <CloseIcon style={{fontSize: "34px"}}/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <TableComponent headers={headers} data={data} />
                        <Button variant="raised" color="primary"
                                style={{
                                    width: "20%", 
                                    height: "50px", 
                                    margin: "5% 2%",
                                    fontSize: "12px",
                                    float: "left",
                                    margin: "2%"
                                }}
                                onClick={this.handleAddExisting}>
                                    ADD EXISTING 
                        </Button>
                        {this.state.addExistingDialogOn && <AddExistingMovieDialogForm movies={this.props.movies}
                                                                                       actorMovies={this.props.actor.movies}
                                                                                       handleClose={this.handleAddExistingClose}
                                                                                       onSubmit={this.onSubmitAddExisting}
                        />}
                    </DialogContent>
            </Dialog>
        );
    }
}

MovieControlDialogForm.propTypes = {
    actorId: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}

const mapStateToProps = (store) => {
    return {
        movies: store.movies,
        actor: store.actor
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieControlDialogForm);