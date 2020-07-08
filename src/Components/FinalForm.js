import React, { Component } from 'react';
import { Form } from 'react-final-form';
import { Alert, Button } from 'rsuite';
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
        if (!values.noteItem) values["noteItem"] = "";
        if (!values.idItem || !values.nameItem || !values.priceItem) {
            let string = "";
            if (!values.idItem) string += "Mã sản phẩm,";
            if (!values.nameItem) string += " Tên sản phẩm,";
            if (!values.priceItem) string += " Đơn giá,";
            string = string.substr(0, string.length - 1);
            string += " không được bỏ trống";
            Alert.error(string, 3000);
            return false;
        }
        return true;
    }

    onSubmit = (values) => {
        if (!this.validateForm(values)) return;
        //send values to function in App.js
        let action = this.state.isUpdating ? "updating" : "adding";
        this.props.onSaveClick(action, values);
    }

    resetForm = () => this.setState({ reset: true, typing: false })

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
                    // validate={(values) => this.validateForm(values)}
                    initialValues={item}
                    render={({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <FieldItem type="text" name="idItem" label="Mã sản phẩm" _readOnly={isUpdating} handleChange={(name, value) => this.changeItem(name, value)} />
                                <FieldItem type="text" name="nameItem" label="Tên sản phẩm" handleChange={(name, value) => this.changeItem(name, value)} />
                                <FieldItem type="number" name="priceItem" label="Giá" handleChange={(name, value) => this.changeItem(name, value)} />
                                <FieldItem type="text" name="noteItem" label="Ghi chú" handleChange={(name, value) => this.changeItem(name, value)} />

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
