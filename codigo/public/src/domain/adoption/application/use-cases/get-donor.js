import { right, left } from '../../../../../core/Either.js';

import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId: someValue 
    }
*/

export class GetDonorUseCase {
    donorRepository;
    constructor(donorRepository) {
        this.donorRepository = donorRepository;
    }

    async execute({
        donorId
    }) {

        if(!donorId) {
            return left(new RequestMissingDataError());
        } 

        const {donor} = await this.donorRepository.findById(donorId)

        if(!donor) {
            return left(new ResourceNotFoundError())
        } 

        return right({
            donor
        })
    }
}