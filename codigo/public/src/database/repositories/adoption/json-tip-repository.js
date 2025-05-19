import { JsonTipRepositoryMapper } from "../../mappers/json-tip-repository-mapper.js";

export class JsonTipRepository {
    url="http://localhost:3000/tip";

    constructor() {}

    async create(tip) {
        try {
            const dbTip = JsonTipRepositoryMapper.toJson(tip)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbTip),
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
            
            const tip = Object.keys(jsonFormat).length === 0 ? {tip: null} : {tip: JsonTipRepositoryMapper.toDomain(jsonFormat)}

            return tip
        } catch(err) {
            console.error(err);
        }
    }

     async findManyTips() {
            try{
                const newUrl = `${this.url}/`
    
                const response = await fetch(newUrl);
    
                const jsonFormat = await response.json()
    
                const tip = jsonFormat.map((element) => {
                    return  {...JsonTipRepositoryMapper.toDomain(element)}
                })
    
                return tip
            } catch(err) {
                console.error(err);
            }
        }


    async delete(tip) {

        try {
            const newUrl = `${this.url}/${tip.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}