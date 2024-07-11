import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({ filterTerm, handleNewFilterTerm }) =>
    <>
        <div>filter shown with <input value={filterTerm} onChange={handleNewFilterTerm} /></div>
    </>

const Input = ({ field, newField, handleNewField }) =>
    <>
        <div>{field}: <input value={newField} onChange={handleNewField} /></div>
    </>

const Form = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) =>
    <>
        <form onSubmit={addPerson} >
            <h2>add a new</h2>
            <Input field="name" newField={newName} handleNewField={handleNewName} />
            <Input field="number" newField={newNumber} handleNewField={handleNewNumber} />
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    </>

const ListPerson = ({ person, removePerson }) =>
    <>
        <p>{person.name} {person.number} <button
            type='button' onClick={_ => removePerson(person)}>delete</button>
        </p>
    </>

const Numbers = ({ persons, filterTerm, removePerson }) => {
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filterTerm.toLowerCase()))
    return (
        <>
            <h2>Numbers</h2>

            {filteredPersons.map((person) =>
                <ListPerson key={person.id} person={person} removePerson={removePerson} />
            )}
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterTerm, setNewFilterTerm] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then(newPersons => {
                setPersons(newPersons)
            })
    }, [])

    //console.log('render ', persons.length, ' persons')

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        if (!persons.some((element) => element.name == newName)) {
            personsService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find((element) => element.name == newName)
                personsService
                    .update(person.id, newPerson)
                    .then(_ =>
                        personsService
                            .getAll()
                            .then(people => setPersons(people)))
            }
        }
    }

    const removePerson = (person) => {
        if (window.confirm(`remove ${person.name}?`)) {
            personsService
                .remove(person.id)
                .then(_ =>
                    personsService
                        .getAll()
                        .then(people => setPersons(people)))
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleNewFilterTerm = (event) => {
        setNewFilterTerm(event.target.value.toLowerCase())
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterTerm={filterTerm} handleNewFilterTerm={handleNewFilterTerm} />
            <Form addPerson={addPerson} newName={newName} handleNewName={handleNewName}
                newNumber={newNumber} handleNewNumber={handleNewNumber} />
            <Numbers persons={persons} filterTerm={filterTerm} removePerson={removePerson} />
        </div>
    )
}

export default App
