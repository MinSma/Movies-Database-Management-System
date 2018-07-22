import React from 'react';
import { Input } from '@material-ui/core';

export const renderInputBox = (props) => {
    delete props.input.value;
    return(
        <div>
            {props.meta.touched && props.meta.error && <span className="error-message">{props.meta.error}</span>}
            <Input
                style={props.style}
                className={props.className}
                {...props.input}
                error={props.meta.invalid}
                defaultValue={props.inputText}
            />
        </div>
    );
}

export const renderInputStyles = () => {
    return {
        border: "1px solid #DADFE1",
        borderRadius: "5px",
        height: "40px",
        width: "91.5%",
        paddingLeft: "10px"
    };
}

export const renderDateInputStyles = () => {
    return {
        border: "1px solid #DADFE1",
        width: '80%'
    };
}