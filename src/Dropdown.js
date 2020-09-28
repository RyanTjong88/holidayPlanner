import React, {Component} from 'react';

class Dropdown extends Component {
    render() {
        return (
            <option>{this.props.name}</option>
        )
    }
}

export default Dropdown;