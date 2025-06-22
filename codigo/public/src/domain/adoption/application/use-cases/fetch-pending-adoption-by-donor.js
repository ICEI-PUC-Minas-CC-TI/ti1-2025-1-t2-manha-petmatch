import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        donorId
    }
*/

export class FetchPendingAdoptionByDonorUseCase {
    adoptionRepository;
    donorRepository;
    constructor(adoptionRepository, donorRepository) {
        this.adoptionRepository = adoptionRepository;
        this.donorRepository = donorRepository;
    }

    async execute({   
        donorId
    }) {

        if( donorId == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {donor} = await this.donorRepository.findById(donorId);

        if(!donor) {
            return left(new ResourceNotFoundError());
        }

        const adoptions = await this.adoptionRepository.findManyPendingAdoptionByDonorId(donorId)

        console.log(adoptions)

        return right({
            adoptions
        })
    }
}