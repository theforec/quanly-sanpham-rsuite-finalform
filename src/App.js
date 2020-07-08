import React, { Component } from 'react';
import { Alert } from 'rsuite';
import './App.css';
import FinalForm from './Components/FinalForm';
import RSuiteTable from './Components/RSuiteTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            valueSearch: "",
            isFiltering: false,
            listItemsFiltered: [],
            listItems: JSON.parse(localStorage.getItem("listItems")) || [],
        }
    }

    saveStorage = () => {
        localStorage.setItem("listItems", JSON.stringify(this.state.listItems));
    }

    setItem = data => {
        this.setState({
            item: data,
            isUpdating: true,
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

    saveInfo = (action, _item) => {
        let { listItems, isFiltering, listItemsFiltered } = this.state;
        if (action === "updating") {
            this.updateLists(listItems, _item);

            if (isFiltering)
                this.updateLists(listItemsFiltered, _item);

            Alert.success("Cập nhật sản phẩm thành công");
        }
        else { //adding
            //check if idItem is exist?
            let exist = listItems.find(sp => sp.idItem === _item.idItem)
            if (exist) return Alert.warning("Mã sản phẩm đã tồn tại", 3000);

            //idItem is not exist
            listItems.push(_item);
            Alert.success("Thêm sản phẩm thành công");
            listItemsFiltered = listItems;
            this.setState({ valueSearch: "" }, () => { })
        }
        //call child method: reset form
        this.form.resetForm();
        this.setState({ listItems, listItemsFiltered })
        this.saveStorage();
    }

    deleteItem = (rowIndex) => {
        let { listItems, isFiltering, listItemsFiltered } = this.state;

        if (isFiltering) {
            let _id = listItemsFiltered[rowIndex].idItem;
            listItemsFiltered.splice(rowIndex, 1);
            listItems = listItems.filter(sp => sp.idItem !== _id);
        }
        //adding
        else listItems.splice(rowIndex, 1);

        Alert.success("Xoá sản phẩm thành công");
        this.form.resetForm();
        this.setState({ listItems, listItemsFiltered }, () => { })
        this.saveStorage();
    }

    searchString = (value, string) => {
        return value.toLowerCase().search(string.toLowerCase()) !== -1;
    }

    searchFilter = (searchInput) => {
        let { listItems } = this.state;
        this.setState({
            isFiltering: true,
            listItemsFiltered: listItems.filter(item =>
                this.searchString(item.idItem, searchInput) || this.searchString(item.nameItem, searchInput) ||
                this.searchString(item.noteItem, searchInput) || item.priceItem.search(searchInput) !== -1)
        })
    }

    handleSearchChange = value => this.setState({ valueSearch: value })

    render() {
        const { item, isFiltering, listItemsFiltered, listItems, valueSearch } = this.state;
        return (
            <div className="container">

                <FinalForm
                    item={item}
                    ref={ref => this.form = ref}
                    onSaveClick={(action, data) => this.saveInfo(action, data)}
                />

                <RSuiteTable
                    dataTable={isFiltering ? listItemsFiltered : listItems}
                    valueSearch={valueSearch}
                    onRowClick={(data) => this.setItem(data)}
                    onSearchClick={() => this.searchFilter(valueSearch)}
                    onDeleteClick={(rowIndex) => this.deleteItem(rowIndex)}
                    handleSearchChange={(value) => this.handleSearchChange(value)}
                />

            </div>
        );
    }
}

export default App;
