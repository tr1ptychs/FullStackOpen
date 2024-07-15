import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
    const countries = response.data
    //console.log('promise created')
    ReactDOM.createRoot(document.getElementById('root')).render(<App countries={countries} />)
})
