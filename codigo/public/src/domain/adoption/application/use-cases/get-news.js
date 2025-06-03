import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';

/*
    INPUT {
        NOT OPTIONAL
        id: string
    }

    OUTPUT: {
        news: News
    }
*/

export class GetNewsUseCase {
    newsRepository;
    
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }

    async execute({
       id
    }) {

        if( !id ) {
            return left(new RequestMissingDataError());
        } 

        const news = await this.newsRepository.findById(id)

        if(!news) {
            return left(new ResourceNotFoundError())
        }

        return right({
            news
        })
    }
}