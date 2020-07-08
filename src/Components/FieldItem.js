import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { Input, InputNumber } from 'rsuite';

export default class FieldItem extends Component {
    TextFieldItem = ({ input, meta, ...rest }) => {
        const { _readOnly, handleChange } = this.props;
        return (
            <Input
                {...rest}
                {...input}
                errortext={meta.touched ? meta.error : ''}
                readOnly={input.name === "idItem" && _readOnly ? true : false}
                onChange={(value) => {
                    input.onChange(value);
                    handleChange(input.name, value);
                }}
            />
        )
    }


    NumberFieldItem = ({ input, meta, ...rest }) => {
        const { handleChange } = this.props;
        return (
            <InputNumber
                {...rest}
                {...input}
                postfix="vnđ"
                step={1000000}
                errortext={meta.touched ? meta.error : ''}
                onChange={(value) => {
                    input.onChange(value);
                    handleChange(input.name, value);
                }}
            />
        )
    }

    render() {
        const { label, name, type } = this.props;
        return (
            <div className="field">
                <label>{label}</label>
                <Field
                    name={name}
                    component={type === "text" ? this.TextFieldItem : this.NumberFieldItem}
                />
            </div>
        )
    }
}
