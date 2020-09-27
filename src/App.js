import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase';
import axios from 'axios';
import Qs from 'qs';
import Dropdown from './Dropdown.js'


class App extends Component {
  constructor(){
    super();
    this.state = {
      userInput: '',
      holidays: [],
      date: [],
      selectedHoliday: '',
      selectedHolidayDate: ''
    }
  }

  // component is mounted after the user input
  componentDidUpdate(){
    
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      url: 'http://proxy.hackeryou.com',
      responseType:'json',
      paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      params: {
        reqUrl: 'https://calendarific.com/api/v2/holidays',
        params: {
          // queryParam: 'value',
          api_key: '8c48c3bc158c0a26c6e03d266e8ec44368d0898f',
          country: 'ca',
          type: 'national',
          year: this.state.userInput,

        }, 
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
      }).then(results => {
              const nationalHolidays = results.data.response.holidays
              // console.log(nationalHolidays);
        
              let holidayNames = [];
              let holidayDates = [];
              // holidayNames = holidayNames.filter(e => e !== 'observed');
              console.log(holidayNames);
              console.log(holidayDates);
              nationalHolidays.forEach(holiday => {
                holidayNames.push(holiday.name)
                holidayDates.push(holiday.date.iso)
        
                this.setState({
                  holidays: holidayNames,
                  date: holidayDates
                })
              });
        
            })

  }

  handleChange = (event) => {
    console.log(event.target.value);  // user input data

    this.setState({
      userInput: event.target.value
    });
  }
  

  render() {
    return (
      <div className="App">
        <h1>Holiday Planner</h1>
        <form action="submit" onSubmit={this.handleSubmit}>
          <label htmlFor="newYear"></label>
          <input type="text" id="newYear" onChange={this.handleChange} value={this.state.userInput} minLength="4" maxLength="4" placeholder="Enter Year"/>
          <button>Submit</button>

          <div>
            <select onChange={this.handleClick}  name="holidaySelections">
            <option>Holiday</option>
              {this.state.holidays.map((names, index) => {
                return (
                  <Dropdown value={names} name={names} key={index}/>
                )
              })}
            </select>
          </div>
        </form>
        
      </div>
    );
  }
}

export default App;
