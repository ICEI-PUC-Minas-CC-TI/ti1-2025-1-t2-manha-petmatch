import { JsonAddressRepositoryMapper } from "../../mappers/json-address-repository-mapper.js";

export class JsonAddressRepository {
    url=`${window.location.origin}/address`;
    constructor() {}

    async create(address) {
        try {

            const dbAddress = JsonAddressRepositoryMapper.toJson(address);
            
            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbAddress),
                headers: {
                   "Content-Type": "application/json"
                }
            })
        } catch(err) {
            console.error(err)
        }
    }
  

    async findById(id) {
        try {
            const newUrl = `${this.url}/${id}`

            const response = await fetch(newUrl)
            const jsonFormat = await response.json()
            const address = Object.keys(jsonFormat).length === 0 ? {address: null} : {address: JsonAddressRepositoryMapper.toDomain(jsonFormat)}

            return address
        }catch(err) {
            console.error(err)
        }
    }

    async findAddressByEntityId(entityId) {
        try {
             const response = await fetch(this.url);
             const jsonFormat = await response.json();
             const addressRaw = jsonFormat.find((address) => {
                return address.entity_id === entityId; 
             })

             const address = !addressRaw ? {address: null} : {address: JsonAddressRepositoryMapper.toDomain(addressRaw)}  

             return address

        }catch (err) {
            console.error(err)
        }
    }

    async findManyAddress() {
        try{
            const newUrl = `${this.url}/`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const addresses = {addresses: jsonFormat.map((element) => {
                return  {...JsonAddressRepositoryMapper.toDomain(element)}
            })}

            return addresses
        } catch(err) {
            console.error(err);
        }
    }
    
   async findAddressByFilters(filters) {
    try {
        const response = await fetch(this.url);
        const jsonFormat = await response.json();

        let addresses = jsonFormat.map(JsonAddressRepositoryMapper.toDomain);

        filters.forEach((filter) => {
            addresses = addresses.filter(address => {
                return Object.values(address).some(value => {
                    if (Array.isArray(value)) {
                        return value.some(item => item.toLowerCase().includes(filter.toLowerCase()));
                    } else if (typeof value === "string") {
                        return value.toLowerCase().includes(filter.toLowerCase());
                    }
                    return false;
                });
            });
        });

        return addresses;
    } catch (err) {
        console.error(err);
    }
}
    
    async save(address) {
        try {
            const newUrl = `${this.url}/${address.id}`
    
            const dbaddress = JsonAddressRepositoryMapper.toJson(address)
    
                await fetch(newUrl, {
                    method: "PUT",
                    body: JSON.stringify(dbaddress),
                    headers: {
                        "Content-Type": "application/json"
                    },        
                })
        } catch (err) {
            console.error(err)
        }
        }
    
    async delete(address) {
        try {
            const newUrl = `${this.url}/${address.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.error(err)
        }
    }
    
}