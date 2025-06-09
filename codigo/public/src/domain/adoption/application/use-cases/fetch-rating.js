import { left, right } from "../../../../../core/Either.js"; // Adicionar import do left/right
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";

export class FetchRatingUserUseCase {
    ratingUserRepository;
    donorRepository;

    constructor(ratingUserRepository, donorRepository) {
        this.ratingUserRepository = ratingUserRepository;
        this.donorRepository = donorRepository;
    }

    async execute({ ratedId }) {
        if (!ratedId) {
            return left(new RequestMissingDataError());
        }

        const { donor } = await this.donorRepository.findById(ratedId);

        if (!donor) {
            return left(new ResourceNotFoundError("Rated donor not found."));
        }
        
        const { ratingUser } = await this.ratingUserRepository.findByRatedId(ratedId);

        return right({
           ratingUser
        });
    }
}