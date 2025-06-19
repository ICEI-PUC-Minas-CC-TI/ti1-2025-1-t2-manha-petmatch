import { JsonDonorRepositoryMapper } from "../../mappers/json-donor-repository-mapper.js";

export class JsonDonorRepository {
    url=`${window.location.origin}/donor`;


    constructor() {}

    async create(donor) {
        try {
            const dbDonor = JsonDonorRepositoryMapper.toJson(donor)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbDonor),
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
            
            const donor = Object.keys(jsonFormat).length === 0 ? {donor: null} : {donor: JsonDonorRepositoryMapper.toDomain(jsonFormat)}

            return donor
        } catch(err) {
            console.error(err);
        }
    }

    async findByUserId(userId) {
        try{
            const newUrl = `${this.url}?user_id=${userId}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const donor = jsonFormat.length === 0 ? {donor: null} : {donor: JsonDonorRepositoryMapper.toDomain(jsonFormat[0])}

            return donor
        } catch(err) {
            console.error(err);
        }
    }

    async save(donor) {
        try {
            const newUrl = `${this.url}/${donor.id}`;
            const dbDonor = JsonDonorRepositoryMapper.toJson(donor);

            await fetch(newUrl, {
                method: "PUT",
                body: JSON.stringify(dbDonor),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    async delete(donor) {

        try {
            const newUrl = `${this.url}/${donor.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}