import { JsonFavoritePetRepositoryMapper } from "../../mappers/json-favorite-pet-repository-mapper.js";

export class JsonFavoritePetRepository {
    url="http://localhost:3000/favorite_pet";

    constructor() {}

    async create(favoritePet) {
        try {
            const dbFavoritePet = JsonFavoritePetRepositoryMapper.toJson(favoritePet)
            console.log("asad",favoritePet)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbFavoritePet),
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

            const favoritePet = Object.keys(jsonFormat).length === 0 ? {favoritePet: null} : {favoritePet: JsonFavoritePetRepositoryMapper.toDomain(jsonFormat)}
            
            return favoritePet
        } catch(err) {
            console.error(err);
        }
    }

    async findFavoriteByAppraiserAndPet(appraiserId, petId) {
        try {
            const newUrl = `${this.url}?appraiser_id=${appraiserId}&pet_id=${petId}`;
    
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();
    
            return jsonFormat.length > 0 ? JsonFavoritePetRepositoryMapper.toDomain(jsonFormat[0]) : null;
        } catch (err) {
            console.error("Erro ao buscar pet favorito:", err);
        }
    }    

    async findManyFavoritePetByAppraiserId(appraiserId) {
        try{
            const newUrl = `${this.url}?appraiser_id=${appraiserId}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const favoritePet = jsonFormat.map((element) => {
                return  {...JsonFavoritePetRepositoryMapper.toDomain(element)}
            })

            return favoritePet
        } catch(err) {
            console.error(err);
        }
    }
    

    async delete(favoritePet) {
        try {
            const newUrl = `${this.url}/${favoritePet.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}