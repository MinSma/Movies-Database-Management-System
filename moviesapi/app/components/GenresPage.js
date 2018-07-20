import React from 'react';
import NavigationBar from './NavigationBar';
import TableComponent from "./TableComponent";
import AddButton from './AddButton';
import GenreDialogForm from './GenreDialogForm/GenreDialogForm';
import './styles.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

class GenresPage extends React.Component {
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
        this.props.addGenre(values);
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
                <AddButton action={this.handleButtonOnClick} text={"Genre"} />
                <TableComponent headers={headers} data={data} />

                {this.state.dialogIsOpen && <GenreDialogForm onSubmit={this.handleDialogSubmit}
                                                             formTitle={"ADD NEW GENRE"} 
                                                             buttonText={"ADD"}
                                                             handleClose={this.handleDialogClose} />
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