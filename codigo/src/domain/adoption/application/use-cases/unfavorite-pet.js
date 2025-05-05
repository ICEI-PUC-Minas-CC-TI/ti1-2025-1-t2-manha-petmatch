import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import {FavoritePet} from '../../enterprise/entities/FavoritePet.js'
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        favoritePetId
        appraiserId
    }
*/

export class UnfavoritePetUseCase {
    favoritePetRepository;
    userRepository;
    constructor(favoritePetRepository, userRepository) {
        this.favoritePetRepository = favoritePetRepository;
        this.userRepository = userRepository;
    }

    async execute({
        petId,
        appraiserId
    }) {


        if( !petId ||  !appraiserId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(appraiserId);

        if(!user) {
            return left(new NotAllowedError());
        }

        const {favoritePet} = await this.favoritePetRepository.findByPetId(
           petId
        )

        if(!favoritePet) {
            return left(new ResourceNotFoundError())
        }

        if(favoritePet.appraiserId !== appraiserId) {
            return left(new NotAllowedError())
        }

        await this.favoritePetRepository.delete(favoritePet);
    }
}