import { JsonSessionRepositoryMapper } from "../../mappers/json-session-repository-mapper.js";

export class JsonSessionRepository {
    url=`${window.location.origin}/session`;
    
    constructor() {}

    async create(session) {
        try {
            const dbSession = JsonSessionRepositoryMapper.toJson(session)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbSession),
                headers: {
                    "Content-Type": "application/json"
                },        
            })
        } catch(err) {
            console.error(err)
        }
    }

    async findById(id) {
        try{
            const newUrl = `${this.url}/${id}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()
            
            const session = Object.keys(jsonFormat).length === 0 ? {session: null} : {session: JsonSessionRepositoryMapper.toDomain(jsonFormat)}

            return session
        } catch(err) {
            console.error(err);
        }
    }
}