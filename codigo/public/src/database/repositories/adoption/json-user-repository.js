import { JsonUserRepositoryMapper } from "../../mappers/json-user-repository-mapper.js";

export class JsonUserRepository {
    url=`${window.location.origin}/user`;


    constructor() {}

    async create(user) {
        try {
            const dbUser = JsonUserRepositoryMapper.toJson(user)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbUser),
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
            
            const user = Object.keys(jsonFormat).length === 0 ? {user: null} : {user: JsonUserRepositoryMapper.toDomain(jsonFormat)}

            return user
        } catch(err) {
            console.error(err);
        }
    }

    async findByCpf(cpf) {
        try{
            const newUrl = `${this.url}?cpf=${cpf}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const user = jsonFormat.length === 0 ? null : {user: JsonUserRepositoryMapper.toDomain(jsonFormat[0])}

            return user
        } catch(err) {
            console.error(err);
        }
    }

    async findByEmail(email) {
        try{
            const newUrl = `${this.url}?email=${email}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()
            
            const user = jsonFormat.length === 0 ? null : {user: JsonUserRepositoryMapper.toDomain(jsonFormat[0])}
            
            return user
        } catch(err) {
            console.error(err);
        }
    }

    async delete(user) {

        try {
            const newUrl = `${this.url}/${user.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}