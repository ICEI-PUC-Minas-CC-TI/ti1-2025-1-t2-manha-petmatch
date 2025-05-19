import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        Id: string
    }

    OUTPUT: {
        pet: PET
    }
*/

export class GetPetUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute({
       id
    }) {

        if( !id ) {
            return left(new RequestMissingDataError());
        } 

        const pet = await this.petRepository.findById(id)

        if(!pet) {
            return left(new ResourceNotFoundError())
        }

        return right({
            pet
        })
    }
}