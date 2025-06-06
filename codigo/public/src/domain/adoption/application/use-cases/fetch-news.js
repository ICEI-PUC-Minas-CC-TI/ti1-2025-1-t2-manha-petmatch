import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';

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