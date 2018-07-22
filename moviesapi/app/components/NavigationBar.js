import React from 'react';
import { AppBar, Toolbar, TextField } from "@material-ui/core";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const linkStyles = {
    color: '#FFF', 
    margin: '1%'
};

export default class NavigationBar extends React.Component {
    constructor(props){
        super(props);

        this.searchText = '';

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        e.preventDefault();

        this.searchText = e.target.value;

        this.props.handleSearch(this.searchText);
    }

    render() {
        const { handleSearch } = this.props;

        return  <AppBar position="static">
                    <Toolbar>
                        <Link to="/" style={linkStyles}>Home</Link>
                        <Link to="/actors" style={linkStyles}>Actors</Link>
                        <Link to="/genres" style={linkStyles}>Genres</Link>
                        
                        {handleSearch ?
                            <TextField
                                className={'searchBox'}
                                placeholder="Search"
                                value={this.searchText}
                                onChange={this.handleChange}
                                style={{backgroundColor: '#fff', padding: 2, marginLeft: '60%'}}
                            /> : ''
                        }
                    </Toolbar>
                </AppBar>;
    }
}

NavigationBar.propTypes = {
    handleSearch: PropTypes.func
};