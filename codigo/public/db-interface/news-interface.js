import { JsonNewsRepository } from '../src/database/repositories/adoption/json-news-repository.js'
import { FetchNewsUseCase } from '../src/domain/adoption/application/use-cases/fetch-news.js'
import { GetNewsUseCase } from '../src/domain/adoption/application/use-cases/get-news.js'

export class NewsInterface {
    newsRepository = new JsonNewsRepository()
    
    async fetchNews() {
        const fetchNewsUseCase = new FetchNewsUseCase(this.newsRepository)

        const response = await fetchNewsUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }
    
        return response.value;
    }

    async getNews({id}){
        const fetNewsUseCase = new GetNewsUseCase(this.newsRepository)

        const response = await fetNewsUseCase.execute({
            id
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}