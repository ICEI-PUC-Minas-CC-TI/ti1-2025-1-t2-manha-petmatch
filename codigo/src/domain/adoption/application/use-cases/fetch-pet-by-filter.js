import { right, left } from '../../../../../core/Either.js';

/*
    INPUT {
        NOT OPTIONAL
        search: string
    }

    OUTPUT: {
        pet: PET
    }
*/

export class FetchPetByFiterUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute({
        search
    }) {
        const pets = await this.petRepository.findPetsByFilters(search)

        return right({
            pets
        })
    }
}