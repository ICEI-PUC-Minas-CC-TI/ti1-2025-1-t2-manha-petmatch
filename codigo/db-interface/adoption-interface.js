import {JsonPetRepository} from '../src/database/repositories/adoption/json-pet-repository.js'
import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'
import {JsonAdoptionRepository} from '../src/database/repositories/adoption/json-adoption-repository.js'

import {RegisterAdoptionUseCase} from '../src/domain/adoption/application/use-cases/register-adoption.js'
import {FetchAdoptionByDonorUseCase} from '../src/domain/adoption/application/use-cases/fetch-adoption-by-donor.js'
import {FetchAdoptionByUserUseCase} from '../src/domain/adoption/application/use-cases/fetch-adoption-by-user.js'



export class AdoptionInterface {
    petRepository = new JsonPetRepository()
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository()
    adoptionRepository = new JsonAdoptionRepository()

    /*
    INPUT {
        NOT OPTIONAL
        userId: string,
        petId: string,
        donorId: string,
    }
    */
    async registerAdoption({userId, petId, donorId}) {
        const registerAdoptionUseCase = new RegisterAdoptionUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)

        const response = await registerAdoptionUseCase.execute({donorId, petId, userId});
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

        
    /*
        INPUT {
            NOT OPTIONAL
            donorId
        }
    */
    async fetchAdoptionByDonorId({donorId}) {
        const fetchAdoptionByDonorUseCase = new FetchAdoptionByDonorUseCase(this.adoptionRepository,this.donorRepository)

        const response = await fetchAdoptionByDonorUseCase.execute({donorId});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
    
    /*
    INPUT {
        NOT OPTIONAL
        userId
    }
    */
    async fetchAdoptionByUserId({userId}) {
        const fetchAdoptionByUserUseCase = new FetchAdoptionByUserUseCase(this.adoptionRepository,this.userRepository)

        const response = await fetchAdoptionByUserUseCase.execute({userId});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}