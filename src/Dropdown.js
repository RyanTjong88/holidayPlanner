import React, {Component} from 'react';
import App from './App.js'

class Dropdown extends Component {
    render() {
        return (
            <option>{this.props.name}</option>
        )
    }
}

export default Dropdown;