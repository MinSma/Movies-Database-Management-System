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
            dialogIsOpen: false,
            editingGenre: undefined
        }

        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.getAllGenres();
    }

    handleDialogClose() {
        this.setState({
            dialogIsOpen: false,
            editingGenre: undefined
        });
    }

    handleAddButtonClick() {
        this.setState({
            dialogIsOpen: true
        });
    }

    handleEditButtonClick(genre) {
        this.setState({
            dialogIsOpen: true,
            editingGenre: genre
        });
    }

    handleDialogSubmit(values) {
        if(values.id === undefined) {
            this.props.addGenre(values);

            this.setState({
                dialogIsOpen: false
            });
        } else {
            let genre = this.state.editingGenre;
            genre.name = values.name;
            this.props.editGenre(genre);

            this.setState({
                dialogIsOpen: false,
                editingGenre: undefined
            });
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
                        <Button onClick={this.handleRemove.bind(this, genre.id)} variant="raised" color="secondary">Remove</Button>
                    </span>
                </div>
            ];
        });

        return (
            <div>
                <NavigationBar />
                <AddButton action={this.handleAddButtonClick} text={"Genre"} />
                <TableComponent headers={headers} data={data} />
                {this.renderDialog()}
            </div>
        );
    }

    renderDialog() {
        let title = this.state.editingGenre ? "EDIT GENRE" : "ADD NEW GENRE";
        let buttonText = this.state.editingGenre ? "SAVE" : "ADD";
    
        if (this.state.dialogIsOpen) {
            return <GenreDialogForm
                onSubmit={this.handleDialogSubmit}
                handleClose={this.handleDialogClose}
                initialValues={this.state.editingGenre}
                formTitle={title}
                buttonText={buttonText}
            />
        }
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