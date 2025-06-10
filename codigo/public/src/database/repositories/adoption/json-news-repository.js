import { JsonNewsRepositoryMapper } from "../../mappers/json-news-repository-mappers.js";

export class JsonNewsRepository {
    url = `${window.location.origin}/noticias`;

    constructor() {}

    async create(news) {
        try {
            const dbNews = JsonNewsRepositoryMapper.toJson(news)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbNews),
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
            
            const news = Object.keys(jsonFormat).length === 0 ? 
                {news: null} : 
                {news: JsonNewsRepositoryMapper.toDomain(jsonFormat)}

            return news
        } catch(err) {
            console.error(err);
        }
    }

    async findManyNews() {
        try{
            const newUrl = `${this.url}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            if (!Array.isArray(jsonFormat)) {
                return [];
            }

            const news = jsonFormat.map((element) => {
                return {...JsonNewsRepositoryMapper.toDomain(element)}
            })

            return news
        } catch(err) {
            console.error(err);
            return [];
        }
    }

    async delete(news) {
        try {
            const newUrl = `${this.url}/${news.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.error(err)
        }
    }
}