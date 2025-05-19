import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        appraiserId: string
        userId: string
    }

    OUTPUT: {
        favoritePet: PET
    }
*/

export class GetFavoritePetUseCase {
    favoritePetRepository;
    userRepository
    constructor(favoritePetRepository, userRepository) {
        this.favoritePetRepository = favoritePetRepository;
        this.userRepository = userRepository
    }

    async execute({
       appraiserId,
       petId
    }) {

        if( !appraiserId, !petId ) {
            return left(new RequestMissingDataError());
        } 

        
        const {user} = await this.userRepository.findById(appraiserId)
        
        if(!user) {
            return left(new NotAllowedError())
        }

        const favoritePet = await this.favoritePetRepository.findFavoriteByAppraiserAndPet(appraiserId,petId);

        if(!favoritePet) {
            return left(new ResourceNotFoundError())
        }

        return right({
            favoritePet
        })
    }
}