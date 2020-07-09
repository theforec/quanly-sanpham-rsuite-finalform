import React, { Component } from 'react';
import { Form } from 'react-final-form';
import { Button } from 'rsuite';
import FieldItem from './FieldItem';
export default class FinalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            reset: false,
            typing: false,
            isUpdating: false,
        }
    }

    form = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.typing) return null;
        //reset button onClick
        if (prevState.reset) {
            return {
                reset: false,
                isUpdating: false,
                item: {}
            }
        }

        //when table onRowClick > display data on the form
        if (nextProps.item !== prevState.item && nextProps.item !== null) {
            return {
                isUpdating: true,
                item: nextProps.item,
            }
        }
        return null;
    }

    validateForm = (values) => {
        let errors = {};
        if (!values.idItem) {
            errors.idItem = "Mã sản phẩm không được bỏ trống"
        }
        if (!values.nameItem) {
            errors.nameItem = "Tên sản phẩm không được bỏ trống"
        }
        if (!values.priceItem || values.priceItem === 0) {
            errors.priceItem = "Giá sản phẩm lớn hơn 0"
        }
        return errors;
    }

    onSubmit = (values) => {
        //send values to function in App.js
        let action = this.state.isUpdating ? "updating" : "adding";
        this.props.onSaveClick(action, values);
    }

    resetForm = () => {
        this.setState({
            reset: true,
            typing: false
        }, () => { this.form.restart() })
    }

    changeItem = (name, value) => {
        let _item = { ...this.state.item, [name]: value }
        this.setState({ typing: true, item: _item })
    }

    render() {
        const { item, isUpdating } = this.state;
        return (
            <div className="form">
                <h4 className="title-form">Thông tin sản phẩm</h4>
                <Form
                    onSubmit={this.onSubmit}
                    validate={this.validateForm}
                    initialValues={item}
                    render={({ handleSubmit, form }) => {
                        this.form = { ...form }
                        return (
                            <form onSubmit={handleSubmit}>
                                <FieldItem type="text" name="idItem" label="Mã sản phẩm" _readOnly={isUpdating} handleChange={this.changeItem} />
                                <FieldItem type="text" name="nameItem" label="Tên sản phẩm" handleChange={this.changeItem} />
                                <FieldItem type="number" name="priceItem" label="Giá" handleChange={this.changeItem} />
                                <FieldItem type="text" name="noteItem" label="Ghi chú" handleChange={this.changeItem} />

                                <div className="buttons">
                                    <Button type="submit" >
                                        {isUpdating ? "Cập nhật" : "Thêm mới"}
                                    </Button>
                                    <img alt="Reset"
                                        onClick={() => this.resetForm()}
                                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/refresh-387-370816.png" />
                                </div>
                            </form>
                        )
                    }}
                />
            </div>
        )
    }
}
