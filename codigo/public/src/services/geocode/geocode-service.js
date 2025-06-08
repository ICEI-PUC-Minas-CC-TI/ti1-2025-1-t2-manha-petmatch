export class GeoCodeService {
    
    // Eu sei que é uma prática ruim colocar no código uma informação que não deve ser disponibilizada para todo mundo.
    api_key = '7bbeccf4920e4d1fa093844d85b1f87d'
    api_base_url = 'https://api.geoapify.com/v1/geocode/search'

    constructor() {}

    async addressToCoordinates({  
        street,
        number,
        city,
        state,
        zipCode,
        country
    }) {

        if(!street ||  
            !number ||
            !city ||
            !state ||
            !zipCode ||
            !country 
        ) {
                return {
                coordinates: null
            }
        }

        try {
           const requestURL = `${this.api_base_url}?housenumber=${encodeURIComponent(number)}&street=${encodeURIComponent(street)}&postcode=${encodeURIComponent(zipCode)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}&format=json&lang=pt&apiKey=${this.api_key}`;


            const response = await fetch(requestURL)

            const {results} = await response.json()

            const coordinates = results.length > 0 ? {
                coordinates: {
                    lat: results[0].lat,
                    lon: results[0].lon,
                }
            } : {
                coordinates: null
            }

            return coordinates

        } catch(err) {
            console.error(err)
        }
    }
}