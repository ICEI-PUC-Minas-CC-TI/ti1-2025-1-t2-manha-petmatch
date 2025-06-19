import { left, right } from '../../../../../core/Either.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';


/*
    INPUT {
        NOT OPTIONAL
        donorId: "uuid"
    }
*/

export class DeleteDonorUseCase {
    donorRepository;
    constructor(donorRepository) {
        this.donorRepository = donorRepository;
    }

    async execute({
       donorId
    }) {

        if(!donorId) {
            return left(new RequestMissingDataError())
        }

        const {donor} = await this.donorRepository.findById(donorId);

        if(!donor) {
            return left(new ResourceNotFoundError());
        }

        await this.donorRepository.delete(donor);

        return right("Donor Deleted");
    }
}