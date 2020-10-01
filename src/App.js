import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import axios from 'axios';
import Qs from 'qs';
import Dropdown from './Dropdown.js'
import Button from './Button.js'
// import BackgroundImage from './BackgroungImage';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userInput: '',
      holidayData: [],
      selectedHoliday: '',
      holidayPlans: [],
      firebaseData: {
        userHoliday: '',
        userText: ''
      },
      newClass: '',

      buttonDate: '',
      buttonText: ''
    }
  }

  // connect to Firebase and read data
  componentDidMount() {
    // create a Firebase reference
    const dbRef = firebase.database().ref();
    // listen to the value change and use `response` as the db value
    dbRef.on('value', (response) => {
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

      let holidayData = [];

      nationalHolidays.forEach(holiday => {
        holidayData.push(holiday)

        this.setState({
          holidayData
        })
      }); 
    }) 
  }

  handleYearChange = (event) => {
    this.setState({
      userInput: event.target.value
    });
  }
  
  handleClick = (e) => {
    this.setState({
      selectedHoliday: e.target.value,
      firebaseData: {
        userHoliday: e.target.value
      }
    }, () => {
      this.getBackgroundImage();
    })
  }

  handlePlans = (event) => {
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

    // reset input field
    this.setState({
      firebaseData: {
        userHoliday: '',
        userText: ''
      }
    });
  }

  // this function adds selected holidays image
  getBackgroundImage = () => {
    const selectedHolidayInput = this.state.firebaseData.userHoliday
    const preparedHoliday = selectedHolidayInput.split('📅')[0].replace(/\s/g, "").replace("'", "")
    // replaces first letter of string to lowercase
    const preparedHolidayTwo = preparedHoliday.replace(/^./, preparedHoliday[0].toLowerCase());

      this.setState({
        newClass: preparedHolidayTwo
      });
  }

  render() {
    const backgroundImageClass = this.state.newClass
    return (
      <>
        <header className={`wrapper ${backgroundImageClass}`}>
          <section className="yearSection">
            <h1>Holiday Planner</h1>
            <form action="submit" onSubmit={this.handleSubmit}>

              <div>
                <label htmlFor="newYear"></label>

                <input 
                type="text" 
                className="yearInput" 
                id="newYear" 
                onChange={this.handleYearChange} 
                value={this.state.userInput} 
                minLength="4" 
                maxLength="4" 
                placeholder="Enter Year"
                />
              </div>

              <div className="headerButtonContainer">
                <Button />
              </div>

              <div>
                <select className="dropdown" onChange={this.handleClick}  name="holidaySelections">
                <option>Holiday</option>
                  {this.state.holidayData.map((data, index) => {
                    return (

                      <Dropdown value={data.name} name={data.name} date={data.date.iso} key={index}/>
                    )
                  })}
                </select>
              </div>

            </form>
          </section>
        </header>  

        <main>
          <section className="holidayPlansSection">
            <div className="wrapper mainContainerOne">
              <div className="mainContentOne">
                <form action="submit" onSubmit={this.handleHolidaySubmit}>

                    <h2 value={this.state.firebaseData.userHoliday}>{this.state.firebaseData.userHoliday}</h2>

                  <textarea
                    name="plans" 
                    cols="30" 
                    rows="10" 
                    minLength="10" 
                    maxLength="" 
                    onChange={this.handlePlans}
                    value={this.state.firebaseData.userText}
                    placeholder="Let's Make Some Plans!"
                  >
                  </textarea>

                  <div>
                    <Button />
                  </div>

                </form>
              </div>

            </div>
          </section>

          <section className="firebaseDataSection">
            <div>
              <form>
                <ul>
                  {this.state.holidayPlans.map((planner) => {
                    return(
                      <li key={planner.key}>
                        <div>
                          <h3>{planner.plannerData.userHoliday}</h3>

                          <textarea 
                          name="madePlans" 
                          cols="30" 
                          rows="10" 
                          readOnly="readOnly"
                          value={planner.plannerData.userText}
                          >

                            {planner.plannerData.userText}

                          </textarea>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </form>
            </div>
          </section>
        </main>

        <footer>
          <a href="https://junocollege.com/">Created at Juno College</a>
          <p>Developed by Ryan Tjong</p>
        </footer>
      </>
    );
  }
}

export default App;
