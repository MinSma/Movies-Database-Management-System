import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

export default class AddButton extends React.Component {
    render() {
        const { action, text } = this.props;

        return <Button onClick={action} 
                style={this.addButtonStyles}>
                       Add {text}
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

AddButton.propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};