import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase';
import axios from 'axios';

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
      console.log(nationalHolidays);

      const fuck = [];
      console.log(fuck);
      nationalHolidays.forEach(holiday => {
        fuck.push(holiday.name)
        // console.log(holiday.name);
        this.setState({
          holidays: fuck,
          // date: holidayDate
        })
      });

      


      // for (let index = 0; index < nationalHolidays.length; index++) {
      //   const holidayName = nationalHolidays;
      //   const holidayDate = nationalHolidays[index].date.iso;
        // console.log(holidayName);
        // console.log(holidayDate);

        // const newState = [];
        // for (const key in nationalHolidays) {
        //   newState.push({
        //     key: key,
        //     title: nationalHolidays[key]
        //   });
          
        //   console.log(newState); 

          
        // }
      // }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Holiday Planner</h1>
        {this.state.holidays.map(test => {
          return (
            <p>{test}</p>
          )
        })}
      </div>
    );
  }
}

export default App;
