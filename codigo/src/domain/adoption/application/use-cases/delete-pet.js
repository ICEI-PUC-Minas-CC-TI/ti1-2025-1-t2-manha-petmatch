import { left } from '../../../../../core/Either.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';


/*
    INPUT {
        NOT OPTIONAL
        id: "uuid"
    }
*/

export class DeletePetUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute({
       id
    }) {

        if(!id) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(id);
        console.log(pet)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        await this.petRepository.delete(pet);
    }
}