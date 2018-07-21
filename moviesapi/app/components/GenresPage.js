import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import GenreDialogForm from './GenreDialogForm/GenreDialogForm';
import { Button } from '@material-ui/core';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class GenresPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addDialogIsOpen: false,
            editDialogIsOpen: false,
            editingGenre: ''
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleAddDialogClose = this.handleAddDialogClose.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleEditDialogClose = this.handleEditDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.getAllGenres();
    }

    handleAddDialogClose() {
        this.setState({
            addDialogIsOpen: false
        });
    }

    handleEditDialogClose() {
        this.setState({
            editDialogIsOpen: false,
            editingGenre: ''
        });
    }

    handleAddButtonClick() {
        this.setState({
            addDialogIsOpen: true
        });
    }

    handleEditButtonClick(genre) {
        this.setState({
            editDialogIsOpen: true,
            editingGenre: genre
        });
    }

    handleDialogSubmit(values) {
        if(values.id === undefined) {
            this.props.addGenre(values);
        } else {
            let genre = this.state.editingGenre;
            genre.name = values.name;
            this.props.editGenre(genre);
        }
    }

    handleRemove(id) {
        this.props.removeGenre(id);
    }

    render() {
        var headers = [ 
            'Name',
            'Actions'
        ];

        var data = this.props.genres.map((genre) => {
            return [ 
                genre.name,
                <div>
                    <span className="tableButtons">
                        <Button onClick={this.handleEditButtonClick.bind(this, genre)} variant="raised" color="primary">Edit</Button>
                    </span>
                    <span className="tableButtons">
                        <Button onClick={this.handleRemove.bind(this, genre.id)} variant="raised" color="primary">Remove</Button>
                    </span>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleAddButtonClick} text={"Genre"} />
                <TableComponent headers={headers} data={data} />

                {this.state.addDialogIsOpen && <GenreDialogForm onSubmit={this.handleDialogSubmit}
                                                                formTitle={"ADD NEW GENRE"} 
                                                                buttonText={"ADD"}
                                                                handleClose={this.handleAddDialogClose} />
                }

                {this.state.editDialogIsOpen && <GenreDialogForm initialValues={this.state.editingGenre}
                                                                 onSubmit={this.handleDialogSubmit}
                                                                 formTitle={"EDIT GENRE"}
                                                                 buttonText={"EDIT"}
                                                                 handleClose={this.handleEditDialogClose} />
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
        genres: store.genres
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenresPage);