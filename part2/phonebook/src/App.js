import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  useEffect(() => {
    personsService.getAll()
      .then(response => setPersons(response))
      .catch(error => console.log(error))
  }, []);
  const addNewPerson = e => {
    e.preventDefault();
    if (persons.findIndex(p => p.name===newName) === -1) {
      const newPerson = { name: newName, number: newNumber };
      personsService.addNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
        })
        .catch(error => console.log(error))
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