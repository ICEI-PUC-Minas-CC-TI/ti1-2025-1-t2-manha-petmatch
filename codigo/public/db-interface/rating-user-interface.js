/* export class RatingUserInterface {
    appraiserIdRepository = new JsonappraiserIdRepository();
    ratedIdRepository =  new JsonratedIdRepository();
    contentRepository = new JsoncontentRepository();
    rateRepository = new JsonrateRepository();
    

    async fetchRatingUser({userId}) {
            const fetchRatingUser = new FetchRatingUserUseCase(this.favoritePetRepository,this.userRepository)
    
            const response = await fetchRatingUser.execute({appraiserId: userId});
    
            if(response.isLeft() === true) {
                console.error(response);
                return response;
            }
    
            return response.value;
        }
 }*/


// 

// interface.js

import { JsonRatingUserRepository } from '../src/database/repositories/adoption/json-rating-user-repository';

export class RatingUserInterface {
    constructor() {
        this.repository = new JsonRatingUserRepository();
    }

    /**
     * Cria uma nova avaliação de usuário para um pet.
     * @param {Object} ratingUser - Objeto contendo os dados da avaliação.
     */
    async criarAvaliacao(ratingUser) {
        try {
            await this.repository.create(ratingUser);
        } catch (err) {
            console.error('Erro ao criar avaliação:', err);
        }
    }

    /**
     * Busca avaliação de usuário com base no ID do pet.
     * @param {string|number} petId - ID do pet.
     * @returns {Object|null}
     */
    async buscarPorPetId(petId) {
        try {
            return await this.repository.findByPetId(petId);
        } catch (err) {
            console.error('Erro ao buscar por ID do pet:', err);
            return null;
        }
    }

    /**
     * Busca avaliação de usuário com base no ID da avaliação.
     * @param {string|number} id - ID da avaliação.
     * @returns {Object|null}
     */
    async buscarPorId(id) {
        try {
            return await this.repository.findById(id);
        } catch (err) {
            console.error('Erro ao buscar por ID da avaliação:', err);
            return null;
        }
    }

    /**
     * Deleta uma avaliação de usuário.
     * @param {Object} ratingUser - Objeto de avaliação a ser deletado (deve conter o campo `id`).
     */
    async deletarAvaliacao(ratingUser) {
        try {
            await this.repository.delete(ratingUser);
        } catch (err) {
            console.error('Erro ao deletar avaliação:', err);
        }
    }
}

