import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { Input, InputNumber } from 'rsuite';

export default class FieldItem extends Component {
    TextFieldItem = ({ input, meta, ...rest }) => {
        const { _readOnly, handleChange } = this.props;
        return (
            <div>
                <Input
                    {...rest}
                    {...input}
                    errortext={meta.touched ? meta.error : ''}
                    disabled={input.name === "idItem" && _readOnly ? true : false}
                    onChange={(value) => {
                        input.onChange(value);
                        handleChange(input.name, value);
                    }}
                />
                {meta.error && meta.touched && <span className="error">&times; {meta.error}</span>}
            </div>
        )
    }

    NumberFieldItem = ({ input, meta, ...rest }) => {
        const { handleChange } = this.props;
        return (
            <div>
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
                {meta.error && meta.touched && <span className="error">&times; {meta.error}</span>}
            </div>
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
