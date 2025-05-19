import {JsonPetRepository} from '../src/database/repositories/adoption/json-pet-repository.js'
import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'
import {JsonFavoritePetRepository} from '../src/database/repositories/adoption/json-favorite-pet-repository.js'


import { FavoritePetUseCase } from '../src/domain/adoption/application/use-cases/favorite-pet.js'
import { FetchFavoritePetUseCase } from '../src/domain/adoption/application/use-cases/fetch-favorite-pet.js'
import { GetFavoritePetUseCase } from '../src/domain/adoption/application/use-cases/get-favorite-pet.js'
import { UnfavoritePetUseCase } from '../src/domain/adoption/application/use-cases/unfavorite-pet.js'

export class FavoritePetInterface {
    petRepository = new JsonPetRepository()
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository()
    favoritePetRepository = new JsonFavoritePetRepository()


      /*
    INPUT {
        NOT OPTIONAL
        favoritePetId: string
        appraiserId: string
    }
    OUTPUT {
        favoritesPets: FavoritePet[]
    }
    */

    async fetchFavoritePet({userId}) {
        const fetchFavoritePet = new FetchFavoritePetUseCase(this.favoritePetRepository,this.userRepository)

        const response = await fetchFavoritePet.execute({appraiserId: userId});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    async getFavoritePet({petId, appraiserId}) {
        const getFavoritePet = new GetFavoritePetUseCase(this.favoritePetRepository, this.userRepository)
        
        const response = await getFavoritePet.execute({appraiserId, petId})

           if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }


    /*
    INPUT {
        NOT OPTIONAL
        petId: string
        appraiserId: string
    }
    OUTPUT {
        favoritedPet: FavoritePet
    }
    */
    async favoritePet({petId, userId}) {
        const favoritePetUseCase = new FavoritePetUseCase(this.favoritePetRepository, this.userRepository)

        console.log("p u ", petId, userId)

        const response = await favoritePetUseCase.execute({
            petId,
            userId
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    // INPUT {
    //     NOT OPTIONAL
    //     favoritePetId: string
    //     userId: string
    // }

    async unfavoritePet({petId, userId}) {
        const unfavoritePetUseCase = new UnfavoritePetUseCase(this.favoritePetRepository, this.userRepository)

        const response = await unfavoritePetUseCase.execute({
            petId,
            appraiserId: userId
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

}