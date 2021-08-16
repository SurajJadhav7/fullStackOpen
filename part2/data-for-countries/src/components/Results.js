import React from 'react';
import axios from 'axios';

const Results = props => {
    if (props.matches.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (props.matches.length === 0) {
      return <></>;
    } else if (props.matches.length > 1) {
      const listOfMatches = 
        props.matches.map(match => 
          <p key={match.alpha2Code}>{match.name} 
          <button onClick={() => props.onClick(match)}>show</button></p>
      );
      return <>{listOfMatches}</>;
    } else {
      if (!props.weather) {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.matches[0].capital}`)
          .then(response => props.setWeather(response.data.current))
          .catch(error => console.error(error));
        return <></>;
      }
      return (
        <>
          <h1>{props.matches[0].name}</h1>
          <p>capital {props.matches[0].capital}</p>
          <p>population {props.matches[0].population}</p>
          <h2>Spoken languages</h2>
          <ul>
            {props.matches[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={props.matches[0].flag} 
          alt={`${props.matches[0].name}'s Flag`}
           height="200"/>
          <h2>Weather in {props.matches[0].capital}</h2>
          <p><strong>temperature:</strong> {props.weather.temperature} Celsius</p>
          <img src={props.weather.weather_icons[0]} alt={props.weather.weather_descriptions} />
          <p><strong>wind:</strong> {props.weather.wind_speed} mph direction {props.weather.wind_dir}</p>
        </>
      );
    }
};

export default Results;