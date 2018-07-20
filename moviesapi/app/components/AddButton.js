import React from 'react';
import { Button } from '@material-ui/core';

export default class AddButton extends React.Component {
    render() {
        return <Button onClick={this.props.action} 
                style={this.addButtonStyles}>
                       Add {this.props.text}
                </Button>
    }
    
    addButtonStyles = {
        float: 'right',
        fontWeight: 'bold',
        backgroundColor: '#3f51b5',
        margin: '1%',
        color: '#FFF'
    }
}