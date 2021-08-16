import React, { useEffect } from 'react';
import axios from 'axios';
import Results from './components/Results';

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [matches, setMatches] = React.useState([]);
  const [weather, setWeather] = React.useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const matches = countries.filter(country => country.name.toLowerCase().includes(selectedCountry.toLowerCase()));
    setMatches(matches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const onSelect = country => setMatches([country]);

  return (
    <>
      <div>find countries 
        <input value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} />
      </div>
      <Results matches={matches} 
      onClick={onSelect} 
      weather={weather}
      setWeather={setWeather}
      />
    </>
  );
}

export default App;