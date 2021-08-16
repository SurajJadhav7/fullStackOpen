import React, { useEffect } from 'react';
import axios from 'axios';

const Results = props => {
  if (props.matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (props.matches.length === 0) {
    return <></>;
  } else if (props.matches.length > 1) {
    const listOfMatches = props.matches.map(match => <p key={match.alpha2Code}>{match.name}</p>);
    return <>{listOfMatches}</>;
  } else {
    return (
      <>
        <h1>{props.matches[0].name}</h1>
        <p>capital {props.matches[0].capital}</p>
        <p>population {props.matches[0].population}</p>
        <h2>languages</h2>
        <ul>
          {props.matches[0].languages.map(language => <li>{language.name}</li>)}
        </ul>
        <img src={props.matches[0].flag} 
        alt={`${props.matches[0].name}'s Flag`}
         height="200"/>
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [matches, setMatches] = React.useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log('changed..',selectedCountry);
    const matches = countries.filter(country => country.name.toLowerCase().includes(selectedCountry.toLowerCase()));
    console.log(matches);
    setMatches(matches);
  }, [selectedCountry]);

  return (
    <>
      <div>find countries 
        <input value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} />
      </div>
      <Results matches={matches} />
    </>
  );
}

export default App;