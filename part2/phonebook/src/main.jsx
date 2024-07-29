import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

axios.get('/api/persons').then(response => {
    const persons = response.data
    //console.log('promise created')
    ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons} />)
})
