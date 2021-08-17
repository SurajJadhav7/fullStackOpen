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

  const newUpdate = e => {
    e.preventDefault();
    const personFound = persons.find(p => p.name===newName);
    if (!personFound) {
      const newPerson = { name: newName, number: newNumber };
      personsService.addNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
        })
        .catch(error => console.log(error))
    } else {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const newPerson = { name: newName, number: newNumber };
        personsService.updatePerson(personFound.id, newPerson)
          .then(response => {
            setPersons(persons.map(p => {
              if (p.id === personFound.id) {
                return newPerson;
              }
              return p;
            }))
          })
          .catch(error => console.log(error))
      }
    }
  }
  
  const search = e => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  const deleteEntry = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (confirmDelete) {
      personsService.deletePerson(id)
      .then(response => {
        console.log('in promise..');
        setPersons(persons.filter(p => p.id !== id));
      })
      .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={search} />
      <h2>add a new</h2>
      <PersonForm 
        newUpdate={newUpdate}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} delete={deleteEntry}/>
    </div>
  )
}

export default App