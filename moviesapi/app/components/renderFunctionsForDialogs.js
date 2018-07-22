import React from 'react';
import { Input, Button } from '@material-ui/core';
import { Field } from 'redux-form';

export const renderActors = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        {fields.map((actor, index) => (
            <li key={index}>
                <h4 style={{margin: '1% 12% 1% 1%'}}>Actor #{index + 1}</h4>
                <Field
                    name={`${actor}.firstName`}
                    component={renderInputBox}
                    style={renderInputStyles()}
                    placeholder="First Name"
                />
                <Field
                    name={`${actor}.lastName`}
                    component={renderInputBox}
                    style={renderInputStyles()}
                    placeholder="Last Name"
                />
                <Button onClick={() => fields.remove(index)} variant="raised" color="secondary" style={{margin: '1% 12% 1% 1%'}}>Remove</Button>
            </li>
        ))}
        <li>
            <Button onClick={() => fields.push({})} variant="raised" color="primary" style={{margin: '1% 12% 1% 1%'}}>Add Actor</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </li>
    </ul>
  );

export const renderInputBox = (props) => {
    delete props.input.value;
    return(
        <div>
            {props.meta.touched && props.meta.error && <span className="error-message">{props.meta.error}</span>}
            <Input
                style={props.style}
                placeholder={props.placeholder}
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