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
    uploadService
    constructor(userRepository, uploadService) {
        this.userRepository = userRepository;
        this.uploadService = uploadService
    }

    async execute({
        userId,
        name, 
        phoneNumber,

        description, 
        imgData,
    }) {

        if(!userId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId)
        
        if(!user) {
            return left(new ResourceNotFoundError());
        }

        if(imgData) {
            const response = await this.uploadService.upload({
                file: imgData,
                entityId: userId
            })

            console.log(response)
            user.imgUrl = response.url
        }

        user.name = name
        user.phoneNumber = phoneNumber
        user.description = description

        await this.userRepository.save(user);

        return right({
            user
        })
    }
}