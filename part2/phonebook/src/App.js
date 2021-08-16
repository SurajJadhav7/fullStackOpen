import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const addNewPerson = e => {
    e.preventDefault();
    if (persons.findIndex(p => p.name===newName) === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App