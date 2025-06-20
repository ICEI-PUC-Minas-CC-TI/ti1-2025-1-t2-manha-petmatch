import { right, left } from '../../../../../core/Either.js';

import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId: someValue 
    }
*/

export class GetUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({
        userId
    }) {

        if(!userId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        } 

        return right({
            user
        })
    }
}