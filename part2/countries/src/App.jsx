import { useState, useEffect } from 'react'
import countryService from './services/countries'


const Search = ({ searchTerm, handleNewSearchTerm }) =>
    <div>
        <p>filter shown with <input value={searchTerm} onChange={handleNewSearchTerm} /></p>
    </div>

const NoResults = ({ term }) =>
    <div>
        <p>No countries matching the search term {term} were found.</p>
    </div>

const TooManyResults = ({ term }) =>
    <div>
        <p>Too many results for term "{term}", please be more specific</p>
    </div>

const DisplayResults = ({ countries, setSearchTerm }) =>
    <div>
        {countries.map(country => <li
            key={country.name.common}>{country.name.common}<
                button type='button'
                onClick={_ => setSearchTerm(country.name.common)}>show</button></li>)}
    </div>

const DisplayCountry = ({ country }) => {
    const languages = Object.keys(country.languages).map(key => country.languages[key]);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} square kilometers</p>

            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <div>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </div>
    )
}

const SearchResults = ({ term, countries, setSearchTerm }) => {
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase()))

    if (filteredCountries.length > 10) {
        return (
            <TooManyResults term={term} />
        )
    }
    if (filteredCountries.length > 1) {
        return (
            <DisplayResults countries={filteredCountries} setSearchTerm={setSearchTerm} />
        )
    }
    if (filteredCountries.length > 0) {
        return (
            <DisplayCountry country={filteredCountries[0]} />
        )
    }
    return (
        <NoResults term={term} />
    )
}

function App() {
    const [searchTerm, setSearchTerm] = useState('')
    const [countries, setCountries] = useState([])
    useEffect(() => {
        if (countries) {
            countryService
                .getAll()
                .then(allCountries => {
                    setCountries(allCountries)
                })
        }
    }, [])

    const handleNewSearchTerm = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            <Search searchTerm={searchTerm} handleNewSearchTerm={handleNewSearchTerm} />
            <SearchResults term={searchTerm} countries={countries} setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default App
