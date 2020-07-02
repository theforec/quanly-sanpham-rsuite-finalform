import React, { Component } from 'react'
import { Button, Input, InputNumber, Alert } from 'rsuite';
import { Form, Field } from 'react-final-form'

export default class FinalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            valueId: "",
            valueName: "",
            valuePrice: "0",
            valueNote: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item !== this.props.item)
            this.setState({
                item: nextProps.item,
                valueId: nextProps.item.idItem,
                valueName: nextProps.item.nameItem,
                valuePrice: nextProps.item.priceItem,
                valueNote: nextProps.item.noteItem,
            })
    }

    saveInfo = () => {
        let item = {
            idItem: this.state.valueId,
            nameItem: this.state.valueName,
            priceItem: this.state.valuePrice,
            noteItem: this.state.valueNote
        }
        //validate form
        if (item.idItem === "" || item.nameItem === "" || item.priceItem === "") {
            var string = "";
            if (item.idItem === "") {
                string += "Mã sản phẩm,";
            }
            if (item.nameItem === "") string += " Tên sản phẩm,";
            if (item.priceItem === "0") string += " Đơn giá,";
            string = string.substr(0, string.length - 1);
            string += " không được bỏ trống";
            Alert.error(string, 2000);
            return;
        }
        this.props.onSaveClick(item);
    }

    render() {
        return (
            <div className="form">
                <h4 className="title-form">Thông tin sản phẩm</h4>
                <Form
                    onSubmit={() => { }}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="idItem">
                                {({ input, meta }) => (
                                    <div className="field">
                                        <label>Mã sản phẩm:</label>
                                        <Input {...input} type="text"
                                            readOnly={this.props.isUpdating ? true : false}
                                            value={this.state.valueId}
                                            onChange={(value) => {
                                                this.setState({ valueId: value });
                                            }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="nameItem" >
                                {({ input, meta }) => (
                                    <div className="field">
                                        <label>Tên sản phẩm:</label>
                                        <Input {...input} type="text"
                                            value={this.state.valueName}
                                            onChange={(value) => {
                                                this.setState({ valueName: value });
                                            }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="priceItem" >
                                {({ input, meta }) => (
                                    <div className="field">
                                        <label>Giá sản phẩm:</label>
                                        <InputNumber {...input}
                                            // type="number"
                                            step={1000000}
                                            postfix="vnđ"
                                            value={this.state.valuePrice}
                                            onChange={(value) => {
                                                this.setState({ valuePrice: value });
                                            }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name="noteItem" >
                                {({ input, meta }) => (
                                    <div className="field">
                                        <label>Ghi chú:</label>
                                        <Input {...input} type="text"
                                            value={this.state.valueNote}
                                            onChange={(value) => {
                                                this.setState({ valueNote: value });
                                            }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>

                            <div className="buttons">
                                <Button
                                    onClick={this.saveInfo}
                                >{this.props.isUpdating ? "Cập nhật" : "Thêm mới"}
                                </Button>
                                <img alt="Reset"
                                    onClick={this.props.onResetClick}
                                    src="https://cdn.iconscout.com/icon/premium/png-512-thumb/refresh-387-370816.png" />
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
}
