import {JsonAnimalTypeRepository} from '../src/database/repositories/adoption/json-animal-type-repository.js'
import { FetchAnimalTypeUseCase } from '../src/domain/adoption/application/use-cases/fetch-animal-type.js'
import { GetAnimalTypeUseCase } from '../src/domain/adoption/application/use-cases/get-animal-type.js'


export class AnimalTypeInterface {
    animalTypeRepository = new JsonAnimalTypeRepository()
 
    /*
    OUTPUT {
        animalTypes: animalType[]
    }
    */
    async fetchAnimalType() {
        const fetchAnimalTypeUseCase = new FetchAnimalTypeUseCase(this.animalTypeRepository)

        const response = await fetchAnimalTypeUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

     
       /*
        OUTPUT {
            animalType: animalType
        }
        */
    async getAnimalType({id}) {
        const getAnimalTypeUseCase = new GetAnimalTypeUseCase(this.animalTypeRepository)

        console.log(id)
        const response = await getAnimalTypeUseCase.execute({id});

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}