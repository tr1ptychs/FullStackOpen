import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

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

const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterTerm, setNewFilterTerm] = useState('')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('message')

    useEffect(() => {
        personsService
            .getAll()
            .then(newPersons => {
                setPersons(newPersons)
            })
    }, [])

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
                .then(_ => {
                    setMessageType('message')
                    setMessage(`Added '${newPerson.name}' to the phonebook.`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })
                .catch(error => {
                    setMessageType('error')
                    setMessage(`Adding person failed: ${error.response.data.error}`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })
        } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const person = persons.find((element) => element.name == newName)
            personsService
                .update(person.id, newPerson)
                .then(_ =>
                    personsService
                        .getAll()
                        .then(people => setPersons(people)))
                .then(_ => {
                    setMessageType('message')
                    setMessage(`Updated number for '${newPerson.name}'.`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })
                .catch(error  => {
                    setMessageType('error')
                    setMessage(`Updating person failed: ${error.response.data.error}`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })

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
                .then(_ => {
                    setMessageType('message')
                    setMessage(`Removed '${person.name}'.`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })
                .catch(_ => {
                    setMessageType('error')
                    setMessage(`${person.name} already removed from server.`)
                    setTimeout(() => { setMessage(null) }, 5000)
                })

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
            <Notification message={message} messageType={messageType} />
            <Filter filterTerm={filterTerm} handleNewFilterTerm={handleNewFilterTerm} />
            <Form addPerson={addPerson} newName={newName} handleNewName={handleNewName}
                newNumber={newNumber} handleNewNumber={handleNewNumber} />
            <Numbers persons={persons} filterTerm={filterTerm} removePerson={removePerson} />
        </div>
    )
}

export default App
