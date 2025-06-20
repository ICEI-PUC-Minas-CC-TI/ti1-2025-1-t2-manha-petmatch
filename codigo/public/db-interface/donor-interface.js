import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'

import {RegisterDonorUseCase} from '../src/domain/adoption/application/use-cases/register-donor.js'
import { GetDonorUseCase } from '../src/domain/adoption/application/use-cases/get-donor.js'
import { GetDonorByUserUseCase } from '../src/domain/adoption/application/use-cases/get-donor-by-user.js'
import { DeleteDonorUseCase } from '../src/domain/adoption/application/use-cases/delete-donor.js'

import {UserInterface} from './user-interface.js'

export class DonorInterface {
    // Repository
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository()

    // Interface
    userInterface = new UserInterface()

   /*
    INPUT {
        NOT OPTIONAL
        userData: {
            email,
            cpf, 
            password,
            name, 
            bornAt,
            phoneNumber,

            description, 
            img_url,
       }

       address {
       
       }
    }
    */
    async registerDonor({ 
       userData,
       address
    }) {
        const userResponse = await this.userInterface.registerUser({ userData, address });

        if(userResponse.isLeft() === true) {
            return userResponse
        }

        console.log('ola')

        const registerDonorUseCase = new RegisterDonorUseCase(this.donorRepository, this.userRepository)

        const response = await registerDonorUseCase.execute({
            userId: userResponse.value.user.id
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    /*
    INPUT {
        NOT OPTIONAL
        donorId: string
    }

    OUTPUT: {
        donor: Donor
    }
*/
    async getDonorById({id}) {
        const getDonorUseCase = new GetDonorUseCase(this.donorRepository)

        const response = await getDonorUseCase.execute({id});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    /*
    INPUT {
        NOT OPTIONAL
        userId: string
    }

    OUTPUT: {
        donor: Donor
    }
*/
    async getDonorByUserId({userId}) {
        const getDonorByUserUseCase = new GetDonorByUserUseCase(this.donorRepository, this.userRepository)

        const response = await getDonorByUserUseCase.execute({userId});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    /*
    INPUT {
        NOT OPTIONAL
        donorId: donorId
        }

    */

    async deletePet({petId, donorId}) {
        const deleteDonorUseCase = new DeleteDonorUseCase(this.donorRepository)

        const response = await deleteDonorUseCase.execute({
            donorId
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    } 

}