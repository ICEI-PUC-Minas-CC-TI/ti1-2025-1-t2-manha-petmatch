import {JsonAnimalTypeRepository} from '../src/database/repositories/adoption/json-animal-type-repository.js'
import { FetchAnimalTypeUseCase } from '../src/domain/adoption/application/use-cases/fetch-animal-type.js'


export class AnimalTypeInterface {
    animalTypeRepository = new JsonAnimalTypeRepository()
 

    async fetchAnimalType() {
        const fetchAnimalTypeUseCase = new FetchAnimalTypeUseCase(this.animalTypeRepository)

        const response = await fetchAnimalTypeUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}