import { JsonPetRepositoryMapper } from "../../mappers/json-pet-repository-mapper.js";

export class JsonPetRepository {
    url="http://localhost:3000/pet";

    constructor() {}

    async create(pet) {
        try {
            const dbPet = JsonPetRepositoryMapper.toJson(pet)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbPet),
                headers: {
                    "Content-Type": "application/json"
                },        
            })
        } catch(err) {
            console.err(err)
        }
    }

    async findById(id) {
        try{
            const newUrl = `${this.url}/${id}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const pet = {pet: JsonPetRepositoryMapper.toDomain(jsonFormat)}

            return pet
        } catch(err) {
            console.error(err);
        }
    }

    async findManyPets() {
        try{
            const newUrl = `${this.url}/`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const pet = jsonFormat.map((element) => {
                return  {...JsonPetRepositoryMapper.toDomain(element)}
            })

            return pet
        } catch(err) {
            console.error(err);
        }
    }

    async save(pet) {
    try {
        const newUrl = `${this.url}/${pet.id}`

        const dbPet = JsonPetRepositoryMapper.toJson(pet)

            await fetch(newUrl, {
                method: "PUT",
                body: JSON.stringify(dbPet),
                headers: {
                    "Content-Type": "application/json"
                },        
            })
    } catch (err) {
        console.error(err)
    }
    }

    async delete(pet) {
        try {
            const newUrl = `${this.url}/${pet.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}