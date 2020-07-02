import React, { Component } from 'react'
import { Table, Input, InputGroup, Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

const { Column, HeaderCell, Cell } = Table;

export default class RSuiteTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSearch: ""
        }
    }

    render() {
        return (
            <div className="list-items">
                <div>
                    <h4>Danh sách sản phẩm</h4>

                    <InputGroup>
                        <Input
                            placeholder="Tìm kiếm theo ID, Name, Note, Price ..."
                            value={this.state.valueSearch}
                            onChange={(value) => { this.setState({ valueSearch: value }) }}
                        />
                        <InputGroup.Button
                            color="blue"
                            onClick={() => this.props.onSearchClick(this.state.valueSearch)}>
                            <Icon icon="search" /> Tìm kiếm
                        </InputGroup.Button>
                    </InputGroup>

                </div>
                <Table className="table"
                    width={700}

                    data={this.props.dataTable}
                    autoHeight
                    onRowClick={this.props.onRowClick} >

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
                                    {/* <button onClick={() => { }}>Copy</button> | {" "} */}
                                    <button onClick={() => this.props.onDeleteClick(rowIndex)}>
                                        Delete</button>
                                </div>
                            }}
                        </Cell>
                    </Column>
                </Table>
            </div>
        )
    }
}
