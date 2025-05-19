import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId
    }
*/

export class FetchAdoptionByUserUseCase {
    adoptionRepository;
    userRepository;
    constructor(adoptionRepository, userRepository) {
        this.adoptionRepository = adoptionRepository;
        this.userRepository = userRepository;
    }

    async execute({   
        userId
    }) {

        if( userId == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId);

        if(!user) {
            return left(new ResourceNotFoundError());
        }

        const adoptions = await this.adoptionRepository.findManyAdoptionByUserId(userId)

        return right({
            adoptions
        })
    }
}