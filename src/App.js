import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import axios from 'axios';
import Qs from 'qs';
import Dropdown from './Dropdown.js'
import Button from './Button.js'



class App extends Component {
  constructor(){
    super();
    this.state = {
      userInput: '',
      holidays: [],
      date: [],
      selectedHoliday: '',
      // selectedHolidayDate: '',
      holidayPlans: [],

    }
  }

  // connect to Firebase and read data
  componentDidMount() {
    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {
      // console.log(response.val());
      // clean up data from Firebase and store in state
      const newState = [];
      const data = response.val();

      for(let key in data) {
        newState.push({
          key: key, 
          plannerData: data[key]
        });  
      }
      
      this.setState({
        holidayPlans: newState
      });
    console.log(this.state.holidayPlans);
    });
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
              // console.log(holidayNames);
              // console.log(holidayDates);
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
    // console.log(event.target.value);  // user input data

    this.setState({
      userInput: event.target.value
    });

  }
  
  handleClick = (event) => {
    // console.log(event.target.value);  // user input data
    this.setState({
      selectedHoliday: event.target.value
    });
  }

  // handleHolidayChange = (event) => {
  //   console.log(event.target.value);  // user input data

  //   this.setState({
  //     holidayPlans: event.target.value
  //   });
  // }
  
  
  handleHolidaySubmit = (event) => {
    event.preventDefault();
    // open portal to Firebase
    const dbRef = firebase.database().ref();
    // add new record to Firebase
    dbRef.push(this.state.holidayPlans);
    // reset input field
    this.setState({
      holidayPlans: ''
    });
  }


  render() {
    return (
      <div className="App">
        <h1>Holiday Planner</h1>
        <form action="submit" onSubmit={this.handleSubmit}>
          <label htmlFor="newYear"></label>
          <input type="text" id="newYear" onChange={this.handleChange} value={this.state.userInput} minLength="4" maxLength="4" placeholder="Enter Year"/>
          <Button />

          <div>
            <select onChange={this.handleClick}  name="holidaySelections">
            <option>Holiday</option>
              {this.state.holidays.map((names, index) => {
                return (
                  <Dropdown value={this.state.selectedHoliday} name={names} key={index}/>
                )
              })}
            </select>
          </div>
        </form>
        
          <section>
            <form action="submit" onSubmit={this.handleHolidaySubmit}>

              <h2>{this.state.selectedHoliday}</h2>

              <textarea name="plans" cols="30" rows="10" onChange={this.handleHolidayChange} ></textarea>
              <div>
                <Button />
              </div>

            </form>
          </section>

          {/* <section>
            <ul>
              {this.state.holidayPlans.map((planner) => {
                return(
                  <li key={planner.key}>
                    <div>
                      <p>{planner.plannerData}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section> */}
      </div>
    );
  }
}

export default App;
