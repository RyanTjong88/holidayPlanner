import React, {Component} from 'react';
import App from './App.js'

class Dropdown extends Component {
    render() {
        return (
            <div>
                {/* {this.state.holidays.map(names => {
                    return (
                    )
                })} */}
                        <p className="color">{this.props.name} </p>

            </div>
        )
    }
}

export default Dropdown;