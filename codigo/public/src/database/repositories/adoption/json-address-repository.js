import { JsonAddressRepositoryMapper } from "../../mappers/json-address-repository-mapper.js";

export class JsonAddressRepository {
    url=`${window.location.origin}/address`;
    constructor() {}

    async create(address) {
        try {

            const dbAddress = JsonAddressRepositoryMapper.toJson(address);
            console.log(dbAddress)
            
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
}