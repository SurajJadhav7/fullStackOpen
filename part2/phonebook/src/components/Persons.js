import React from 'react';

const Persons = props => {
    if (!props.filter) {
        return (
            <>
                {props.persons.map(person => 
                <p key={person.name}>{person.name} {person.number} <button onClick={() => props.delete(person.id, person.name)}>Delete</button></p>)}
            </>
        );
    } else {
        return (
            <>
                {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
                    .map(person => 
                    <p key={person.name}>{person.name} {person.number} <button onClick={() => props.delete(person.id, person.name)}>Delete</button></p>)}
            </>
        );
    }
}

export default Persons;