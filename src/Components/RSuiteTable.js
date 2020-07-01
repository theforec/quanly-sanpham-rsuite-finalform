import React, { Component } from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

export default class RSuiteTable extends Component {
    render() {
        return (
            <div id="table" >
                <div id="title" >Quản lý sản phẩm - RSuiteTable - FinalForm</div>
                <Table
                    data={this.props.dataTable}
                    autoHeight
                    onRowClick={this.props.onRowClick} >

                    <Column width={100}>
                        <HeaderCell align="center" >ID</HeaderCell>
                        <Cell dataKey="idItem" align="left" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell align="center">Name</HeaderCell>
                        <Cell dataKey="nameItem" align="left" />
                    </Column>

                    <Column width={150}>
                        <HeaderCell align="center" >Note</HeaderCell>
                        <Cell dataKey="noteItem" align="left" />
                    </Column>

                    <Column width={150}>
                        <HeaderCell align="center">Price</HeaderCell>
                        <Cell dataKey="priceItem" align="right" />
                    </Column>

                    <Column width={150}>
                        <HeaderCell align="center">Action</HeaderCell>
                        <Cell align="center">
                            {(rowData, rowIndex) => {
                                return <div id="button-table" >
                                    <button>
                                        Edit</button> | <button onClick={() => this.props.onDeleteClick(rowIndex)}>
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
