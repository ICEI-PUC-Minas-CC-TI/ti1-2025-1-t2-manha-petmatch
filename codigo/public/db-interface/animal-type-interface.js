
import { JsonAnimalTypeRepository } from '../src/database/repositories/adoption/json-animal-type-repository.js';
import { FetchAnimalTypeUseCase } from '../src/domain/adoption/application/use-cases/fetch-animal-type.js';
import { GetAnimalTypeUseCase } from '../src/domain/adoption/application/use-cases/get-animal-type.js';

export class AnimalTypeInterface {
    animalTypeRepository = new JsonAnimalTypeRepository();

    /**
     * Busca todos os tipos de animal
     * @returns {Promise<{ animaltypes: animalType[] }>} objeto com array "animaltypes"
     */
    async fetchAnimalType() {
        try {
            const fetchAnimalTypeUseCase = new FetchAnimalTypeUseCase(this.animalTypeRepository);
            const response = await fetchAnimalTypeUseCase.execute();

            if (response.isLeft() === true) {
                console.error("Erro ao buscar animaltypes:", response);
                return { animaltypes: [] };
            }

            const resultado = {
                animaltypes: response.value.animalTypes || response.value.animaltypes || []
            };

            console.log("Resultado fetchAnimalType():", resultado); // Debug 

            return resultado;
        } catch (e) {
            console.error("Erro inesperado:", e);
            return { animaltypes: [] };
        }
    }

    /**
     * Busca um tipo de animal por ID
     * @param {Object} param0 objeto com ID
     * @returns {Promise<{ animalType: animalType | null }>}
     */
    async getAnimalType({ id }) {
        try {
            const getAnimalTypeUseCase = new GetAnimalTypeUseCase(this.animalTypeRepository);
            const response = await getAnimalTypeUseCase.execute({ id });

            if (response.isLeft() === true) {
                console.error("Erro ao buscar animalType por ID:", response);
                return { animalType: null };
            }

            return response.value;
        } catch (e) {
            console.error("Erro inesperado:", e);
            return { animalType: null };
        }
    }
}
