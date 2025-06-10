import { left, right } from "/core/Either.js"; // Adicionado e caminho absoluto
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";

export class GetRatingUserUseCase {
    ratingUserRepository;
    constructor( ratingUserRepository) { //classes já instânciadas
        this.ratingUserRepository = ratingUserRepository;

    }

    async execute({
           id
        }) {

            if( !id ) {
                return left(new RequestMissingDataError());
            }

            const { ratingUser } = await this.ratingUserRepository.findById(id); // Desestruturação para obter ratingUser
            return right({
                ratingUser
            });
        }
    }