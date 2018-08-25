import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Components/Weather/Weather'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: [],
      userInput: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteWeather = this.deleteWeather.bind(this);

  }
  handleChange(val) {
    this.setState({ userInput: val })
  }



  handleSubmit(event) {
    axios.get(`/api/weather?city=${this.state.userInput}`)
    .then(weather => {
        this.setState({
          userInput: ''
        })
        if (weather.data.message) {
          alert('City Not Found')
        } else {
          this.setState({
            weather: weather.data
          })
        }
      })
    event.preventDefault();
  }

  deleteWeather(cityName) {
    axios.delete(`/api/weather?city=${cityName}`)
      .then((weather) => {
        this.setState({
          weather: weather.data
        })
      });
  }


  render() {
    let weatherList;
    if (this.state.weather.length > 0) {

      weatherList = this.state.weather.map((weather) => {
        return (
          <div className="cityInfo" key={weather.name}>
            <div>
              <h1>{weather.name}</h1>
            </div>
            <div className="ptag">
              <p>{weather.main.temp}</p>
            </div>
            <div className="button">
              <button className="x" onClick={() => { this.deleteWeather(weather.name) }}>x</button>
            </div>
          </div>
        )
      })
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://cdn172.picsart.com/228360378035212.png?r1024x1024" className="App-logo" alt="logo" />
          <h1 className="App-title">What's the weather?</h1>
          <form>
            <input type="text" className="inputLine" value={this.state.userInput} onChange={(e) => this.handleChange(e.target.value)} placeholder="Type city name here." />
            <button onClick={this.handleSubmit} type="submit">Submit</button>
          </form>
          <br />
          {weatherList}
        </header>
      </div>
      
      
    );
  }
}

export default App;
