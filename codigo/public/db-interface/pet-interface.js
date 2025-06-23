import {JsonPetRepository} from '../src/database/repositories/adoption/json-pet-repository.js'
import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'
import {JsonFavoritePetRepository} from '../src/database/repositories/adoption/json-favorite-pet-repository.js'

import {RegisterPetUseCase} from '../src/domain/adoption/application/use-cases/register-pet.js'
import {DeletePetUseCase} from '../src/domain/adoption/application/use-cases/delete-pet.js'
import { GetPetUseCase } from '../src/domain/adoption/application/use-cases/get-pet.js'
import { FetchPetUseCase } from '../src/domain/adoption/application/use-cases/fetch-pet.js'
import { FetchPetByFilterUseCase } from '../src/domain/adoption/application/use-cases/fetch-pet-by-filter.js'
import { FavoritePetUseCase } from '../src/domain/adoption/application/use-cases/favorite-pet.js'
import { FetchFavoritePetUseCase } from '../src/domain/adoption/application/use-cases/fetch-favorite-pet.js'
import { EditPetUseCase } from '../src/domain/adoption/application/use-cases/edit-pet.js'
import { UnfavoritePetUseCase } from '../src/domain/adoption/application/use-cases/unfavorite-pet.js'
import {JsonAddressRepository} from '../src/database/repositories/adoption/json-address-repository.js'

import {CurrentSession} from '../utils/current-session.js'
import { FetchAllPetsUseCase } from '../src/domain/adoption/application/use-cases/fetch-all-pets.js'
<<<<<<< HEAD
import {AddressInterface} from './address-interface.js'
import { CloudinaryService } from '../src/services/cloudinary/cloudinary-service.js'
=======
>>>>>>> 9dd0d3559e6e2ecf02f2730aa5fdc4a5f49f066a

export class PetInterface {
    addressRepository = new JsonAddressRepository()
    petRepository = new JsonPetRepository(this.addressRepository)
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository()
    favoritePetRepository = new JsonFavoritePetRepository()
    addressInterface = new AddressInterface()
    session = new CurrentSession()
    // Service
    cloudinaryService = new CloudinaryService()



    session = new CurrentSession()

    /*
    INPUT {
    petInfo: {
        name: string,
        animalTypeId: string,
        size: string,
        animalSex: string,
        descriptions: string,
        imgUrls: string[],
        bornAt: Date
        breed: string[]
        vaccinated: boolean,
        castrated: boolean,
        availableForAdoption: boolean,
        personality: string[]
        donorId: someId,
    }
    }
    */
<<<<<<< HEAD
    async registerPetInterface({petInfo, petAddress}) {


        const registerPetUseCase = new RegisterPetUseCase(this.petRepository, this.donorRepository, this.cloudinaryService)
        
        const response = await registerPetUseCase.execute({...petInfo, donorId: this.session.donorId});

=======
    async registerPetInterface({petInfo}) {

        const registerPetUseCase = new RegisterPetUseCase(this.petRepository, this.donorRepository)

        
        const response = await registerPetUseCase.execute({...petInfo, donorId: this.session.donorId});
>>>>>>> 9dd0d3559e6e2ecf02f2730aa5fdc4a5f49f066a
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        await this.addressInterface.registerPetAddress({
              entityId: response.value.pet.id,
              donorId: this.session.donorId,
              ...petAddress
        })

        return response.value;
    }

    /*
    INPUT {
        NOT OPTIONAL
        id: string
    }

    OUTPUT: {
        pet: Pet
    }
*/
    async getPetById({id}) {
        const getPetUseCase = new GetPetUseCase(this.petRepository)

        const response = await getPetUseCase.execute({id});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    /*
    OUTPUT: {
        pet: Pet[]
    }
    */
    async fetchPets() {
        const fetchPetsUseCase = new FetchPetUseCase(this.petRepository)

        const response = await fetchPetsUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    async fetchAllPets() {
        const fetchAllPetsUseCase = new FetchAllPetsUseCase(this.petRepository)

        const response = await fetchAllPetsUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    /*
    INPUT {
        NOT OPTIONAL
        search: string[]
    }

    OUTPUT: {
        pet: Pet[]
    }
    */
    async fetchPetsBySearch({search}) {
        const fetchPetByFilterUseCase = new FetchPetByFilterUseCase(this.petRepository)

        const response = await fetchPetByFilterUseCase.execute({search});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

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

    async fetchFavoritePet() {
        const fetchFavoritePet = new FetchFavoritePetUseCase(this.favoritePetRepository,this.userRepository)

        const response = await fetchFavoritePet.execute({appraiserId: this.session.userId});

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
    async favoritePet({petId}) {
        const favoritePetUseCase = new FavoritePetUseCase(this.favoritePetRepository, this.userRepository)

        const response = await favoritePetUseCase.execute({
            petId,
            userId: this.session.userId
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

    async unfavoritePet({petId}) {
        const unfavoritePetUseCase = new UnfavoritePetUseCase(this.favoritePetRepository, this.userRepository)

        const response = await unfavoritePetUseCase.execute({
            petId,
            appraiserId: this.session.userId
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
            petId: string
            donorId: string
        }
    */

    async deletePet({petId}) {
        const deletePetUserCase = new DeletePetUseCase(this.petRepository, this.donorRepository)

        const response = await deletePetUserCase.execute({
            donorId: this.session.donorId, 
            petId
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        const address = await this.addressInterface.getPetAddressByPet({petId})

        await this.addressInterface.deletePetAddress({
                   addressId:address.id ,
                   donorId: this.session.donorId
        })

        return response.value;
    } 
 

    /*
    INPUT {
        NOT OPTIONAL
        name: string,
        animalTypeId: string,
        size: string,
        animalSex: string,
        descriptions: string,
        imgUrls: string[],
        bornAt: Date
        breed: string[]
        vaccinated: boolean,
        castrated: boolean,
        availableForAdoption: boolean,
        personality: string[]
        donorId: someId,
        donorType: null,
        id: someId
    }
    OUTPUT {
        pet
    }
    */
   // ATENÇÃO, OS DADOS DEVEM SER REEVIADOS, CAMPOS NÃO PREECHIDOS SERÃO INTERPRETADOS COMO UNDEFINED E ESTARÃO NULOS NO BANCO DE DADOS
<<<<<<< HEAD
    async editPet({petInfo, petId, petAddress}) {
        const editPetUseCase = new EditPetUseCase(this.petRepository, this.donorRepository)

        const response = await editPetUseCase.execute({...petInfo, donorId: this.session.donorId, id: petId});
=======
    async editPet({pet, petId}) {
        const editPetUseCase = new EditPetUseCase(this.petRepository, this.donorRepository)

        const response = await editPetUseCase.execute({...pet, donorId: this.session.donorId, id: petId});
>>>>>>> 9dd0d3559e6e2ecf02f2730aa5fdc4a5f49f066a

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        const address = await this.addressInterface.getPetAddressByPet({petId})

        await this.addressInterface.editPetAddress({
              addressId: address._id,
              donorId: this.session.donorId,
              ...petAddress
        })

        return response.value;
    }
}