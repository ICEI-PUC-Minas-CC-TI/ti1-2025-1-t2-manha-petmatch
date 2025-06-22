import {JsonAdoptionRepositoryMapper} from '../../mappers/json-adoption-repository-mapper.js'

export class JsonAdoptionRepository {
    url=`${window.location.origin}/adoption`;

    constructor() {}

    async create(adoption) {
        try {
            const dbAdoption = JsonAdoptionRepositoryMapper.toJson(adoption)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbAdoption),
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

            const adoption = Object.keys(jsonFormat).length === 0 ? {adoption: null} : {adoption: JsonAdoptionRepositoryMapper.toDomain(jsonFormat)}
            
            return adoption
        } catch(err) {
            console.error(err);
        }
    }

    async findManyAdoptionByUserId(userId) {
        try{
            const newUrl = `${this.url}?user_id=${userId}&status="APPROVED`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const adoptions = jsonFormat.map((element) => {
                return  {...JsonAdoptionRepositoryMapper.toDomain(element)}
            })

            return adoptions
        } catch(err) {
            console.error(err);
        }
    }

    async findManyAdoptionByDonorId(donorId) {
        try{
            const newUrl = `${this.url}?donor_id=${donorId}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const adoptions = jsonFormat.map((element) => {
                return  {...JsonAdoptionRepositoryMapper.toDomain(element)}
            })

            return adoptions
        } catch(err) {
            console.error(err);
        }
    }

    async findManyAdoptionByPetId(petId) {
         try{
            const newUrl = `${this.url}?pet_id=${petId}&status="PENDING"`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const adoptions = jsonFormat.map((element) => {
                return  {...JsonAdoptionRepositoryMapper.toDomain(element)}
            })

            return adoptions
        } catch(err) {
            console.error(err);
        }
    }

    async findManyPendingAdoptionByDonorId(donorId) {
        try{
            const newUrl = `${this.url}?donor_id=${donorId}&status="PENDING"`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const adoptions = jsonFormat.map((element) => {
                return  {...JsonAdoptionRepositoryMapper.toDomain(element)}
            })

            return adoptions
        } catch(err) {
            console.error(err);
        }
    }

    async delete(adoption) {
        try {
            const newUrl = `${this.url}/${adoption.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }

       async save(adoption) {
            try {
                const newUrl = `${this.url}/${adoption.id}`;
                const dbAdoption = JsonAdoptionRepositoryMapper.toJson(adoption);
    
                await fetch(newUrl, {
                    method: "PUT",
                    body: JSON.stringify(dbAdoption),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }
}