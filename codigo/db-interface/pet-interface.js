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

export class PetInterface {
    petRepository = new JsonPetRepository()
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository()
    favoritePetRepository = new JsonFavoritePetRepository()

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
    async registerPetInterface({petInfo}) {
        const registerPetUseCase = new RegisterPetUseCase(this.petRepository,this.donorRepository)

        const response = await registerPetUseCase.execute(petInfo);
        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

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

    async fetchFavoritePet({userId}) {
        const fetchFavoritePet = new FetchFavoritePetUseCase(this.favoritePetRepository,this.userRepository)

        const response = await fetchFavoritePet.execute({appraiserId: userId});

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


    
    /*
        INPUT {
            NOT OPTIONAL
            petId: string
            donorId: string
        }
    */

    async deletePet({petId, donorId}) {
        const deletePetUserCase = new DeletePetUseCase(this.petRepository, this.donorRepository)

        const response = await deletePetUserCase.execute({
            donorId, 
            petId
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
    async editPet({pet, petId, donorId}) {
        const editPetUseCase = new EditPetUseCase(this.petRepository, this.donorRepository)

        const response = await editPetUseCase.execute({...pet, donorId, id: petId});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}