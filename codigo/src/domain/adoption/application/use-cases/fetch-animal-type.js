import { right, left } from '../../../../../core/Either.js';

/*
    OUTPUT: {
        animaltype: ANIMALTYPE
    }
*/

export class FetchAnimalTypeUseCase {
    animaltypeRepository;
    constructor(animaltypeRepository) {
        this.animaltypeRepository = animaltypeRepository;
    }

    async execute() {
        const animaltypes = await this.animaltypeRepository.findManyAnimalTypes()

        console.log(animaltypes)

        return right({
            animaltypes
        })
    }
}