import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        donorId
    }
*/

export class FetchAdoptionByPetUseCase {
    adoptionRepository;
    petRepository;
    constructor(adoptionRepository, petRepository) {
        this.adoptionRepository = adoptionRepository;
        this.petRepository = petRepository;
    }

    async execute({   
        petId
    }) {

        if( petId == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {pet} = await this.petRepository.findById(petId);

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        const adoptions = await this.adoptionRepository.findManyAdoptionByPetId(petId)

        return right({
            adoptions
        })
    }
}