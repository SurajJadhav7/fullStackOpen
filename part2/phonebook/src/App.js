import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(error => console.log(error))
  }, []);
  const addNewPerson = e => {
    e.preventDefault();
    if (persons.findIndex(p => p.name===newName) === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }
  const search = e => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={search} />
      <h2>add a new</h2>
      <PersonForm 
        addNewPerson={addNewPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App