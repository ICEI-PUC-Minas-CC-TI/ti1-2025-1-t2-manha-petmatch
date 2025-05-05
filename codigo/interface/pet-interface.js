import {RegisterPetUseCase} from '../src/domain/adoption/application/use-cases/register-pet.js'
import {RegisterPetUseCase} from '../src/domain/adoption/application/use-cases/delete-pet.js'

import {JsonPetRepository} from '../src/database/repositories/adoption/json-pet-repository.js'
export class PetInterface {
    petRepository = new JsonPetRepository()

    async registerPetInterface(petInfo) {
        const registerPetUseCase = new RegisterPetUseCase(petInfo)

        const response = await registerPetUseCase.execute(petInfo);
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response;
    }

    
}