import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import {FavoritePet} from '../../enterprise/entities/FavoritePet.js'
import { PetAlredyFavoritedError } from '../errors/pet-alredy-favorited-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        petId
        appraiserId
    }
*/

export class FavoritePetUseCase {
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

        if( petId == undefined || appraiserId == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(appraiserId);

        if(!user) {
            return left(new ResourceNotFoundError());
        }
        
        const petAlredyFavorited = await this.favoritePetRepository.findFavoriteByAppraiserAndPet(appraiserId, petId)


        if(petAlredyFavorited) {
            return left(new PetAlredyFavoritedError())
        }
        const favoritePet = FavoritePet.create({
                petId,
                appraiserId
            })

        await this.favoritePetRepository.create(favoritePet);

        return right({
            favoritePet
        })
    }
}