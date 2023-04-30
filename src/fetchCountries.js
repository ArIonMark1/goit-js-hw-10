const   BASE_URL = 'https://restcountries.com/v3.1/name'

export default function fetchCountries(name) { 

    return fetch(`${BASE_URL}/${name}`)
        
        .then((response) => { 
            if (!response.ok) { 
                return new Error('Bad request')
            }
            return response.json();
        })      
};