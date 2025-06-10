import { left, right } from "/core/Either.js"; // Caminho absoluto
import { ResourceNotFoundError } from "/core/errors/resource-not-found-error.js"; // Caminho absoluto
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";

export class FetchRatingUserUseCase {
    ratingUserRepository;
    donorRepository;

    constructor(ratingUserRepository, donorRepository) { //classes já instânciadas
        this.ratingUserRepository = ratingUserRepository;
        this.donorRepository = donorRepository;

    }

     async execute({
           ratedId
        }) {

            if( !ratedId ) {
                return left(new RequestMissingDataError());
            }

            const { donor } = await this.donorRepository.findById(ratedId); // Certifique-se que seu DonorRepository tem findById

            if(!donor) {
            return left(new ResourceNotFoundError("Rated donor not found."));
            }

            // O seu repository deve ter um método findByRatedId (ou você pode criar um)
            const { ratingUser } = await this.ratingUserRepository.findByRatedId(ratedId);

            return right({
               ratingUser
            });
        }
    }