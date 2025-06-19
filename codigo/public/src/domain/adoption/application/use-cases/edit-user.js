import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';

import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId
        
        OPTIONAL
        userId,
        name, 
        phoneNumber,

        description, 
        imgUrl,
    }
*/

export class EditUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({
        userId,
        name, 
        phoneNumber,

        description, 
        imgUrl,
    }) {

        if(!userId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId)
        
        if(!user) {
            return left(new ResourceNotFoundError());
        }

        user.imgUrl = imgUrl
        user.name = name
        user.phoneNumber = phoneNumber
        user.description = description

        await this.userRepository.save(user);

        return right({
            user
        })
    }
}