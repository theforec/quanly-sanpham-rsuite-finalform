import React, { Component } from 'react'

class StateUpItem extends Component {
    render() {
        const { name, value, handleChange } = this.props;
        return (
            <input
                placeholder={name}
                value={value}
                onChange={event => handleChange(event.target.value)}
            />
        );
    }
}


export default class StateUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueC: '',
            valueF: ''
        }
    }

    changeC = (value) => {
        this.setState({
            valueC: value,
            valueF: value * 1.8 + 32
        })
    }
    changeF = (value) => {
        this.setState({
            valueF: value,
            valueC: (value - 32) / 1.8
        })
    }
    render() {
        const { valueC, valueF } = this.state;
        return (
            <div>
                <form>
                    <StateUpItem
                        name="Celsius"
                        value={valueC}
                        handleChange={(v) => this.changeC(v)}
                    />
                    <StateUpItem
                        name="Fahrenheit"
                        value={valueF}
                        handleChange={(v) => this.changeF(v)}
                    />

                </form>
            </div>
        )
    }
}
