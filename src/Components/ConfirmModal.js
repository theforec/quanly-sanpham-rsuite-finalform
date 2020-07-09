import React, { Component } from 'react';
import { Button, Icon, Modal } from 'rsuite';

export default class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            rowIndex: 0
        };
    }

    open = (rowIndex) => this.setState({ show: true, rowIndex })

    close = () => this.setState({ show: false })

    render() {
        const { confirmDelete } = this.props;
        const { rowIndex } = this.state;
        return (
            <div className="modal-container">
                <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
                    <Modal.Body>
                        <Icon
                            icon="remind"
                            style={{
                                color: '#ffb300',
                                fontSize: 24
                            }}
                        />
                        {'   '}
                Bạn có chắc chắn muốn xoá Sản phẩm ?
              </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => confirmDelete(rowIndex)} appearance="primary">
                            Ok
                </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}