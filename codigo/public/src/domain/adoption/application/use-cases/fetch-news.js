import { right, left } from '../../../../../core/Either.js';
/*
    INPUT {
        NONE
    }

    OUTPUT: {
        news: News[]
    }
*/

export class FetchNewsUseCase {
    newsRepository;
    
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }

    async execute() {
        const news = await this.newsRepository.findManyNews();

        return right({
            news
        })
    }
}