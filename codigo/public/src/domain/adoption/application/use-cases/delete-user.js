import { right, left } from '../../../../../core/Either.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';


/*
    INPUT {
        NOT OPTIONAL
        id: "uuid"
    }
*/

export class DeleteUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({
       id
    }) {

        if(!id) {
            return left(new RequestMissingDataError())
        }

        const {user} = await this.userRepository.findById(id);

        if(!user) {
            return left(new ResourceNotFoundError());
        }

        await this.userRepository.delete(user);
        return right({message: "user deleted"})
    }
}