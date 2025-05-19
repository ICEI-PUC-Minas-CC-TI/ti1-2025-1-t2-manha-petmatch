import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        Id: string
    }

    OUTPUT: {
        animaltype: ANIMALTYPE
    }
*/

export class GetAnimalTypeUseCase {
    animaltypeRepository;
    constructor(animaltypeRepository) {
        this.animaltypeRepository = animaltypeRepository;
    }

    async execute({
       id
    }) {

        if( !id ) {
            return left(new RequestMissingDataError());
        } 

        const animaltype = await this.animaltypeRepository.findById(id)

        if(!animaltype) {
            return left(new ResourceNotFoundError())
        }

        return right({
            animaltype
        })
    }
}