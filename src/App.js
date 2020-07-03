import React, { Component } from 'react';
import { Alert } from 'rsuite';
import './App.css';
import FinalForm from './Components/FinalForm';
import RSuiteTable from './Components/RSuiteTable';
import FieldArrays from './Components/FieldArrays'

class App extends Component {
    constructor(props) {
        super(props);
        this.listItems = JSON.parse(localStorage.getItem("listItems")) || [];
        this.state = {
            item: null,
            isUpdating: false,
            isFiltering: false,
        }
    }
    saveStorage = () => {
        localStorage.setItem("listItems", JSON.stringify(this.listItems));
    }
    setItem = (data) => {
        this.setState({
            item: data,
            isUpdating: true,
        })

    }
    resetItem = () => {
        this.setState({
            item: { "idItem": "", "nameItem": "", "priceItem": "0", "noteItem": "" },
            isUpdating: false
        })
    }

    updateLists = (list, item) => {
        list.forEach((sp, i) => {
            if (sp.idItem === item.idItem) {
                list[i] = item;
                return;
            }
        });
    }
    saveInfo = (item) => {
        //updating
        if (this.state.isUpdating) {
            this.updateLists(this.listItems, item);
            if (this.state.isFiltering)
                this.updateLists(this.listItemsFiltered, item);
            Alert.success("Cập nhật sản phẩm thành công");
        }
        else //adding
            this.listItems.find(sp => sp.idItem === item.idItem) ?
                Alert.warning("Mã sản phẩm đã tồn tại", 3000) : this.listItems.push(item);
        this.saveStorage();
        this.resetItem();
    }

    deleteItem = (rowIndex) => {
        if (this.state.isFiltering) {
            let item = this.listItemsFiltered[rowIndex];
            this.listItems = this.listItems.filter(sp => sp.idItem !== item.idItem);
            this.listItemsFiltered.splice(rowIndex, 1);
        }
        else this.listItems.splice(rowIndex, 1);

        this.saveStorage();
        this.resetItem();
    }
    searchString(value, string) {
        return value.toLowerCase().search(string) !== -1;
    }
    searchFilter = (searchInput) => {
        this.setState({ isFiltering: true })
        this.listItemsFiltered = this.listItems.filter(item =>
            this.searchString(item.idItem, searchInput) || this.searchString(item.nameItem, searchInput) ||
            this.searchString(item.noteItem, searchInput) || item.priceItem.search(searchInput) !== -1)
    }

    render() {
        return (
            <div className="container">

                <FinalForm
                    item={this.state.item}
                    isUpdating={this.state.isUpdating}
                    onResetClick={() => this.resetItem()}
                    onSaveClick={(data) => this.saveInfo(data)}
                />

                <RSuiteTable
                    dataTable={this.state.isFiltering ? this.listItemsFiltered : this.listItems}
                    onRowClick={(data) => this.setItem(data)}
                    onDeleteClick={(rowIndex) => this.deleteItem(rowIndex)}
                    onSearchClick={(value) => this.searchFilter(value)}
                />

                {/* <FieldArrays /> */}
            </div>
        );
    }
}

export default App;
