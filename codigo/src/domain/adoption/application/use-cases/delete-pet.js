import { left, right } from '../../../../../core/Either.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';


/*
    INPUT {
        NOT OPTIONAL
        id: "uuid"
    }
*/

export class DeletePetUseCase {
    petRepository;
    donorRepository;
    constructor(petRepository, donorRepository) {
        this.petRepository = petRepository;
        this.donorRepository = donorRepository;
    }

    async execute({
       petId,
       donorId
    }) {

        if(!petId || !donorId) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(petId);
        console.log(pet)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        const {donor} = await this.donorRepository.findById(donorId)

        if(!donor || donor.id !== pet.donorId) {
            return left(new NotAllowedError())
        }

        await this.petRepository.delete(pet);

        return right("Pet Deleted");
    }
}