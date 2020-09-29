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
      firebaseData: {
        userHoliday: '',
        userText: ''
      }
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
    // console.log(this.state.holidayPlans);
    // console.log(this.state.holidayPlans[0].key);
    // console.log(this.state.holidayPlans[0].plannerData);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      url: 'https://proxy.hackeryou.com',
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

  handleYearChange = (event) => {
    // console.log(event.target.value);  // user input data

    this.setState({
      userInput: event.target.value
    });

  }
  
  handleClick = (e) => {
    // console.log(e.target.value);  // user input data
    // console.log(this.state.selectedHoliday);
    this.setState({
      selectedHoliday: e.target.value,
      firebaseData: {
        userHoliday: e.target.value
      }

    });
  }

  handlePlans = (event) => {
    // console.log(event.target.value);  // user input data
    this.setState({
      firebaseData: {
        userHoliday: this.state.firebaseData.userHoliday,
        userText: event.target.value
      }
    });   
  }

  handleHolidaySubmit = (event) => {
    event.preventDefault();
    // open portal to Firebase
    const dbRef = firebase.database().ref();
    // add new record to Firebase

    dbRef.push(this.state.firebaseData);
    // dbRef.push(this.state.userHoliday);

    // reset input field
    this.setState({
      firebaseData: {
        userHoliday: '',
        userText: ''
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Holiday Planner</h1>
          <form action="submit" onSubmit={this.handleSubmit}>
            <label htmlFor="newYear"></label>
            <input type="text" id="newYear" onChange={this.handleYearChange} value={this.state.userInput} minLength="4" maxLength="4" placeholder="Enter Year"/>
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
        </header>  

        <main>
          <section className="holidayPlansSection">
            <form action="submit" onSubmit={this.handleHolidaySubmit}>

              <h2 value={this.state.firebaseData.userHoliday}>{this.state.firebaseData.userHoliday}</h2>

              <textarea name="plans" cols="30" rows="10" minLength="10" maxLength="" onChange={this.handlePlans} value={this.state.firebaseData.userText}></textarea>
              <div>
                <Button />
              </div>

            </form>
          </section>

          <section className="firebaseDataSection">
            <form>
              <ul>
                {this.state.holidayPlans.map((planner) => {
                  // {console.log(planner.plannerData.userText)}
                  return(
                    <li key={planner.key}>
                      <div>
                        <p>{planner.plannerData.userHoliday}</p>
                        {/* make another onChange event in text area below */}
                        {/* also needs to update firebase not just delete */}
                        <textarea name="madePlans" cols="30" rows="10">{planner.plannerData.userText}</textarea>
                        <div>
                          <Button />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
