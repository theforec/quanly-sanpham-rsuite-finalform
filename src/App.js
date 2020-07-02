import React, { Component } from 'react';
import { Alert } from 'rsuite';
import './App.css';
import FinalForm from './Components/FinalForm';
import RSuiteTable from './Components/RSuiteTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.listItems = JSON.parse(localStorage.getItem("listItems")) || [];
        this.state = {
            item: null,
            isUpdating: false,
            isFiltering: false,
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
            item: { "idItem": "", "nameItem": "", "priceItem": "0", "noteItem": "" },
            isUpdating: false
        })
    }
    saveInfo = (item) => {
        if (!this.state.isUpdating) { //adding
            let errorId = 0;
            this.listItems.find(sp => {
                if (item.idItem === sp.idItem)
                    errorId++;
            });
            if (errorId !== 0) {
                Alert.warning("Mã sản phẩm đã tồn tại", 3000);
                return;
            }
            this.listItems.push(item);
        }
        else { //updating
            this.listItems.find((sp, i) => {
                if (sp.idItem === item.idItem)
                    this.listItems[i] = item;
            });
            if (this.state.isFiltering) {
                this.listItemsFiltered.find((sp, i) => {
                    if (sp.idItem === item.idItem)
                        this.listItemsFiltered[i] = item;
                });
            }
        }
        this.saveStorage();
        this.resetItem();
    }

    deleteItem = (rowIndex) => {
        if (this.state.isFiltering) {
            let item = this.listItemsFiltered[rowIndex];
            this.listItems = this.listItems.filter(sp => sp.idItem !== item.idItem);
            this.listItemsFiltered.splice(rowIndex, 1);
        }
        else
            this.listItems.splice(rowIndex, 1);
        this.saveStorage();
        this.resetItem();
        // if (!this.state.isUpdating)
        // this.setState({
        //     isDeleting: true
        // });
        // console.log("delete, isDeleting: " + this.state.isDeleting);
    }
    searchFilter = (searchInput) => {
        this.setState({ isFiltering: true })
        this.listItemsFiltered = this.listItems.filter(item =>
            item.idItem.toLowerCase().search(searchInput) !== -1 || item.nameItem.toLowerCase().search(searchInput) !== -1 ||
            item.priceItem.search(searchInput) !== -1 || item.noteItem.toLowerCase().search(searchInput) !== -1)
        // console.log(this.listItemsFiltered);

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

            </div>
        );
    }
}

export default App;
