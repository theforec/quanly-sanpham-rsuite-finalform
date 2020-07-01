import React, { Component } from 'react';
import './App.css';
import FinalForm from './Components/FinalForm';
import RSuiteTable from './Components/RSuiteTable';
// import PassingDataBetween2Child from './Components/PassingDataBetween2Child';

class App extends Component {
    constructor(props) {
        super(props);
        this.listItems = JSON.parse(localStorage.getItem("listItems")) || [];
        this.state = {
            item: null,
            isUpdating: false,
            // isDeleting: false,
        }
    }
    saveStorage = () => {
        localStorage.setItem("listItems", JSON.stringify(this.listItems));
    }
    setItem = (data) => {
        // console.log("setItem, isDeleting: " + this.state.isDeleting);
        // if (this.state.isDeleting) return;
        this.setState({
            item: data,
            isUpdating: true,
            // isDeleting: false,
        })

    }
    resetItem = () => {
        // console.log("reset, isDeleting: " + this.state.isDeleting);
        this.setState({
            item: { "idItem": "", "nameItem": "", "priceItem": "", "noteItem": "" },
            isUpdating: false
        })
    }
    saveInfo = (item) => {
        let errorInfo = 0;
        //validate form
        if (item.idItem === "" || item.nameItem === "" || item.priceItem === "") {
            errorInfo++;
            var string = "";
            if (item.idItem === "") string += "Mã sản phẩm,";
            if (item.nameItem === "") string += " Tên sản phẩm,";
            if (item.priceItem === "") string += " Đơn giá,";
            string = string.substr(0, string.length - 1);
            string += " không được bỏ trống";
            alert(string);
            return;
        }

        //info correct       
        if (!this.state.isUpdating) { //adding
            let errorId = 0;
            this.listItems.find(sp => {
                if (item.idItem === sp.idItem)
                    errorId++;
            });
            if (errorId !== 0) {
                alert("Mã sản phẩm không được trùng");
                return;
            }
            this.listItems.push(item);
        }
        else { //updating
            this.listItems.find((sp, i) => {
                if (sp.idItem === item.idItem)
                    this.listItems[i] = item;
            });
        }
        this.saveStorage();
        this.resetItem();
    }

    deleteItem = (rowIndex) => {
        if (!this.state.isUpdating)
            this.listItems.splice(rowIndex, 1);
        // this.setState({
        //     isDeleting: true
        // });
        // console.log("delete, isDeleting: " + this.state.isDeleting);
        this.saveStorage();
        // this.resetItem();
    }

    render() {
        return (
            <div id="root">

                <RSuiteTable
                    dataTable={this.listItems}
                    onRowClick={(data) => this.setItem(data)}
                    onDeleteClick={(rowIndex) => this.deleteItem(rowIndex)}
                />

                <FinalForm
                    item={this.state.item}
                    isUpdating={this.state.isUpdating}
                    onResetClick={() => this.resetItem()}
                    onSaveClick={(data) => this.saveInfo(data)}
                />
            </div>
        );
    }
}

export default App;
