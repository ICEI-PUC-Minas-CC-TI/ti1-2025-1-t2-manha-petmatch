import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        favoritePetId
        appraiserId
    }
*/

export class FetchFavoritePetUseCase {
    favoritePetRepository;
    userRepository;
    constructor(favoritePetRepository, userRepository) {
        this.favoritePetRepository = favoritePetRepository;
        this.userRepository = userRepository;
    }

    async execute({
        appraiserId
    }) {


        if( appraiserId == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(appraiserId);

        if(!user) {
            return left(new NotAllowedError());
        }
        const favoritePets = await this.favoritePetRepository.findManyFavoritePetByAppraiserId(appraiserId)
        
        console.log(favoritePets)
        return right({
            favoritePets
        })
    }
}