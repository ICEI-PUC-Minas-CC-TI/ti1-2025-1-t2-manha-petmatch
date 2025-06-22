import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'

import {RegisterUserUseCase} from '../src/domain/adoption/application/use-cases/register-user.js'
import {GetUserUseCase} from '../src/domain/adoption/application/use-cases/get-user.js'

import { DeleteUserUseCase } from '../src/domain/adoption/application/use-cases/delete-user.js'

import {AddressInterface} from './address-interface.js'
import {EditUserUseCase} from '../src/domain/adoption/application/use-cases/edit-user.js'
import {CloudinaryService} from '../src/services/cloudinary/cloudinary-service.js'

export class UserInterface {
    // Repository
    userRepository = new JsonUserRepository()

    // Interface
    addressInterface = new AddressInterface()

    // Service
    cloudinaryService = new CloudinaryService()

   /*
    INPUT {
        NOT OPTIONAL
        userId: someValue 
    }
    */
    async registerUser({    
        userData,
        address
    }) {

        const registerUserUseCase = new RegisterUserUseCase(this.userRepository)

        const response = await registerUserUseCase.execute(userData);
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        await this.addressInterface.registerUserAddress({
            ...address,
            entityId: response.value.user.id,
        })

        return response;
    }

    /*
    INPUT {
        NOT OPTIONAL
        userId: string
    }

    OUTPUT: {
        user: User
    }
*/
    async getUserById({id}) {
        const getUserUseCase = new GetUserUseCase(this.userRepository)

        const response = await getUserUseCase.execute({userId:id});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    async editUser({ 
        userId,
        name, 
        phoneNumber,

        description, 
        imgData, 
    }) {
        const editUserUseCase = new EditUserUseCase(this.userRepository, this.cloudinaryService)

        const response = await editUserUseCase.execute({ 
            userId,
            name, 
            phoneNumber,

            description, 
            imgData 
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
        userId: userId
        }

    */

    async deleteUser({userId}) {
        const deleteUserUseCase = new DeleteUserUseCase(this.userRepository)

        const response = await deleteUserUseCase.execute({
            userId
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    } 

}