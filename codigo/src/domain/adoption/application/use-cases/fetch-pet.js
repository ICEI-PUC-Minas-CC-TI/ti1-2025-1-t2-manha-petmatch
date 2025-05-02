import { right, left } from '../../../../../core/Either.js';

/*
    INPUT {
        NOT OPTIONAL
        Id: string
    }

    OUTPUT: {
        pet: PET
    }
*/

export class FetchPetUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute() {
        const pets = await this.petRepository.findManyPets()

        return right({
            pets
        })
    }
}