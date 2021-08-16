import React from 'react';

const Persons = props => {
    if (!props.filter) {
        return (
            <>
                {props.persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
            </>
        );
    } else {
        return (
            <>
                {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
                    .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
            </>
        );
    }
}

export default Persons;