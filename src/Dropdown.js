import React, {Component} from 'react';

class Dropdown extends Component {
    render() {
        return (
            <option className="dropdownComponent" >{this.props.name}  📅  {this.props.date}</option>
        )
    }
}
{/* <span role="img" aria-label="picture of a calender"></span> */}
export default Dropdown;