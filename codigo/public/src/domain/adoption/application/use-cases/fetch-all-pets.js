import { right, left } from '../../../../../core/Either.js';

/*
    OUTPUT: {
        pet: PET
    }
*/

export class FetchAllPetsUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute() {
        const pets = await this.petRepository.findManyPetsAll()

        return right({
            pets
        })
    }
}