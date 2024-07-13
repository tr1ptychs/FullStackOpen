import axios from 'axios'
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries'
const weatherUrl = ''

const getAll = () => {
    const request = axios.get(`${countriesUrl}/api/all`)
    return request.then(response => response.data)
}

const getCountry = country => {
    const request = axios.get(`${countriesUrl}$/name/${country}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry }
