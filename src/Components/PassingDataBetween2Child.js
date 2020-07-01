import React, { Component, useState } from 'react'

export default function PassingDataBetween2Child() {
    const [valueInput, setValueInput] = useState("");
    return (
        <div>
            <Child1 changeText={(event) => setValueInput(event.target.value)} value={valueInput} />
            <Child2 changeText={(event) => setValueInput(event.target.value)} value={valueInput} />
        </div>
    )
}

class Child1 extends Component {
    render() {
        return (
            <div>
                <input type="text" onChange={this.props.changeText} value={this.props.valueInput} />
            </div>
        );
    }
}

class Child2 extends Component {
    render() {
        return (
            <div>
                <input type="text" onChange={this.props.changeText} value={this.props.valueInput} />
            </div>
        );
    }
}
