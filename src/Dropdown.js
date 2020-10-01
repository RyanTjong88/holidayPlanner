import React, {Component} from 'react';

class Dropdown extends Component {
    render() {
        return (
            <option className="dropdownComponent">{this.props.name}  📅  {this.props.date}</option>
        )
    }
}
export default Dropdown;