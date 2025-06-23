import {JsonPetRepository} from './../src/database/repositories/adoption/json-pet-repository.js'
import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'
import {JsonAdoptionRepository} from '../src/database/repositories/adoption/json-adoption-repository.js'

import {RegisterAdoptionRequestUseCase} from '../src/domain/adoption/application/use-cases/register-adoption-request.js'
import {FetchAdoptionByDonorUseCase} from '../src/domain/adoption/application/use-cases/fetch-adoption-by-donor.js'
import {FetchAdoptionByUserUseCase} from '../src/domain/adoption/application/use-cases/fetch-adoption-by-user.js'
import { ApproveAdoptionRequestUseCase } from '../src/domain/adoption/application/use-cases/approve-adoption-request.js'
import { RejectAdoptionRequestUseCase } from '../src/domain/adoption/application/use-cases/reject-adoption-request.js'
import { FetchAdoptionByPetUseCase } from '../src/domain/adoption/application/use-cases/fetch-adoption-by-pet.js'
import { FetchPendingAdoptionByDonorUseCase } from '../src/domain/adoption/application/use-cases/fetch-pending-adoption-by-donor.js'



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
    async registerAdoptionRequest({userId, petId, donorId}) {
        const registerAdoptionUseCase = new RegisterAdoptionRequestUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)

        const response = await registerAdoptionUseCase.execute({donorId, petId, userId});
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    async approveAdoptionRequest({adoptionId, donorId}) {
        const approveAdoptionRequestUseCase = new ApproveAdoptionRequestUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)

        const fetchAdoptionByPetUseCase = new FetchAdoptionByPetUseCase(this.adoptionRepository, this.petRepository)

        const response = await approveAdoptionRequestUseCase.execute({adoptionId, donorId});
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        const data = await fetchAdoptionByPetUseCase.execute({petId: response.value.adoption.petId})
<<<<<<< HEAD
        console.log(data)
        const rejectAdoptionRequestUseCase = new RejectAdoptionRequestUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)
        
        data.value.adoptions.forEach(async (adoption) => {
            console.log(adoption._id)
            const a = await rejectAdoptionRequestUseCase.execute({adoptionId: adoption._id, donorId});
            console.log(a)
=======

        data.value.adoption.forEach(async (adoption) => {
            const rejectAdoptionRequestUseCase = new RejectAdoptionRequestUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)

            await rejectAdoptionRequestUseCase.execute({adoptionId: adoption.id, donorId});
>>>>>>> 9dd0d3559e6e2ecf02f2730aa5fdc4a5f49f066a
        })

        return response.value;
    }

    async rejectAdoptionRequest({adoptionId, donorId}) {
        const rejectAdoptionRequestUseCase = new RejectAdoptionRequestUseCase(this.adoptionRepository,this.userRepository, this.donorRepository, this.petRepository)

        const response = await rejectAdoptionRequestUseCase.execute({adoptionId, donorId});
        
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
        const fetchAdoptionByDonorUseCase = new FetchPendingAdoptionByDonorUseCase(this.adoptionRepository,this.donorRepository)

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