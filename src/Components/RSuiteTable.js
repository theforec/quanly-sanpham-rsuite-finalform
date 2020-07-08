import React, { Component } from 'react'
import { Table, Input, InputGroup, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

const { Column, HeaderCell, Cell } = Table;

export default class RSuiteTable extends Component {
    render() {
        const { onSearchClick, dataTable, onRowClick, onDeleteClick, valueSearch, handleSearchChange } = this.props;
        return (
            <div className="list-items">
                <div>
                    <h4>Danh sách sản phẩm</h4>
                    <InputGroup>
                        <Input
                            placeholder="Tìm kiếm theo ID, Name, Note, Price ..."
                            value={valueSearch}
                            onChange={value => handleSearchChange(value)}
                        />
                        <InputGroup.Button
                            color="blue"
                            onClick={() => onSearchClick()}>
                            <Icon icon="search" /> Tìm kiếm
                        </InputGroup.Button>
                    </InputGroup>

                </div>
                <Table className="table"
                    width={700}
                    data={dataTable}
                    autoHeight
                    onRowClick={(data) => onRowClick(data)} >

                    <Column width={100} >
                        <HeaderCell className="header-cell">ID</HeaderCell>
                        <Cell dataKey="idItem" />
                    </Column>

                    <Column width={200} >
                        <HeaderCell className="header-cell">Name</HeaderCell>
                        <Cell dataKey="nameItem" />
                    </Column>

                    <Column width={200} >
                        <HeaderCell className="header-cell">Note</HeaderCell>
                        <Cell dataKey="noteItem" />
                    </Column>

                    <Column width={90} >
                        <HeaderCell className="header-cell" align="center">Price</HeaderCell>
                        <Cell dataKey="priceItem" align="right" />
                    </Column>

                    <Column width={100} >
                        <HeaderCell className="header-cell" align="center">Action</HeaderCell>
                        <Cell align="center">
                            {(rowData, rowIndex) => {
                                return <div className="button-table" >
                                    <button onClick={() => onDeleteClick(rowIndex)}
                                    > Delete </button>
                                </div>
                            }}
                        </Cell>
                    </Column>
                </Table>
            </div>
        )
    }
}
