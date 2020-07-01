import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'

export default class FinalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            valueId: "",
            valueName: "",
            valuePrice: "",
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
        this.props.onSaveClick(item);
    }

    render() {
        return (
            <div id="form">
                <div id="title-form">Thông tin sản phẩm</div>
                <Form
                    onSubmit={() => { }}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="idItem">
                                {({ input, meta }) => (
                                    <div className="field">
                                        <label>Mã sản phẩm:</label>
                                        <input {...input} type="text"
                                            readOnly={this.props.isUpdating ? true : false}
                                            value={this.state.valueId}
                                            onChange={(event) => {
                                                this.setState({ valueId: event.target.value });
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
                                        <input {...input} type="text"
                                            value={this.state.valueName}
                                            onChange={(event) => {
                                                this.setState({ valueName: event.target.value });
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
                                        <input {...input} type="text"
                                            value={this.state.valuePrice}
                                            onChange={(event) => {
                                                this.setState({ valuePrice: event.target.value });
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
                                        <input {...input} type="text"
                                            value={this.state.valueNote}
                                            onChange={(event) => {
                                                this.setState({ valueNote: event.target.value });
                                            }}
                                        />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <div className="buttons">
                                <button
                                    type="submit"
                                    onClick={this.saveInfo}
                                >{this.props.isUpdating ? "Cập nhật" : "Thêm mới"}
                                </button>
                                <img alt="Reset"
                                    onClick={this.props.onResetClick}
                                    src="https://img.icons8.com/flat_round/64/000000/available-updates--v1.png" />
                            </div>
                        </form>
                    )}
                />
            </div>
        )
    }
}
