import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase';
import axios from 'axios';
import Dropdown from './Dropdown.js'


class App extends Component {
  constructor(){
    super();
    this.state = {
      holidays: [],
      date: []
    }
  }

  

  // component is mounted after the first rendering
  componentDidMount(){
    // make an AJAX request for art
    axios({
      method: 'GET',
      url: ' 	https://calendarific.com/api/v2/holidays?api_key=8c48c3bc158c0a26c6e03d266e8ec44368d0898f&year=2020&country=ca&type=national',
      dataResponse: 'json',
    }).then(results => {
      const nationalHolidays = results.data.response.holidays
      // console.log(nationalHolidays);

      const holidayNames = [];
      const holidayDates = [];
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

  render() {
    return (
      <div className="App">
        <h1>Holiday Planner</h1>
        {this.state.holidays.map(names => {
          return (
            // <p>{names}</p>
            <Dropdown name={names} />
          )
        })}
        <Dropdown />
      </div>
    );
  }
}

export default App;
