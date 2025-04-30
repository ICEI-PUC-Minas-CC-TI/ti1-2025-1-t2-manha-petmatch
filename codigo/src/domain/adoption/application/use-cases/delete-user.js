import { right, left } from '../../../../../core/Either.js';
import { UserMissingDataError } from '../errors/user-missing-data-error.js';
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
            return left(new UserMissingDataError())
        }

        const {user} = await this.userRepository.findById(id);
        console.log(user)

        if(!user) {
            return left(new ResourceNotFoundError());
        }

        await this.userRepository.delete(user);
    }
}