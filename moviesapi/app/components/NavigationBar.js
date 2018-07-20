import React from 'react';
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from 'react-router-dom';

const linkStyles = {
    color: '#FFF', 
    margin: '1%'
};

export default class NavigationBar extends React.Component {
    render() {
        return  <AppBar position="static">
                    <Toolbar>
                        <Link to="/" style={linkStyles}>Home</Link>
                        <Link to="/actors" style={linkStyles}>Actors</Link>
                        <Link to="/genres" style={linkStyles}>Genres</Link>
                    </Toolbar>
                </AppBar>;
    }
}