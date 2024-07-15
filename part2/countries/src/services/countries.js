import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
    const request = axios.get(`${countriesUrl}/api/all`)
    return request.then(response => response.data)
}

const getCountry = country => {
    const request = axios.get(`${countriesUrl}$/name/${country}`)
    return request.then(response => response.data)
}

const getWeather = city => {
    const request = axios.get(`${weatherUrl}?q=${city.toLowerCase()}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll, getCountry, getWeather }
