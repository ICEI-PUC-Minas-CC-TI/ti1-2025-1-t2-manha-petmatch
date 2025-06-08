export class JsonRatingUserRepository {
    url=`${window.location.origin}/profile_rating`;

    constructor() {}

    async create(ratingUser) {
        try {
            const dbRatingUser = JsonRatingUserRepositoryMapper.toJson(ratingUser)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbRatingUser),
                headers: {
                    "Content-Type": "application/json"
                },        
            })
        } catch(err) {
            console.err(err)
        }
    }

    async findByPetId(petId){
         try{
            const newUrl = `${this.url}?pet_id=${petId}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const ratingUser = jsonFormat.length === 0 ? null : {ratingUser: JsonRatingUserRepositoryMapper.toDomain(jsonFormat[0])}

            return ratingUser
        } catch(err) {
            console.error(err);
        }
    }

    async findById(id) {
        try{
            const newUrl = `${this.url}/${id}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const ratingUser = Object.keys(jsonFormat).length === 0 ? {ratingUser: null} : {ratingUser: JsonRatingUserRepositoryMapper.toDomain(jsonFormat)}
            
            return ratingUser
        } catch(err) {
            console.error(err);
        }
    }
    

    async delete(ratingUser) {
        try {
            const newUrl = `${this.url}/${ratingUser.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}