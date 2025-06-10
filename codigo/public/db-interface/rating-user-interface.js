import { RatingUserUseCase } from "../src/domain/adoption/application/use-cases/rating-user.js";
import { JsonRatingUserRepository } from "../src/database/repositories/adoption/json-rating-user-repository.js";
import { JsonUserRepository } from "../src/database/repositories/adoption/json-user-repository.js";
import { JsonDonorRepository } from "../src/database/repositories/adoption/json-donor-repository.js";


export class RatingUserInterface {
    userRepository = new JsonUserRepository();
    ratingUserRepository = new JsonRatingUserRepository();
    donorRepository = new JsonDonorRepository();

    constructor() {
        this.ratingUserUseCase = new RatingUserUseCase(
            this.userRepository,
            this.ratingUserRepository,
            this.donorRepository
        );
    }

    async rateUser({ appraiserId, ratedId, content, rate }) {
        const result = await this.ratingUserUseCase.execute({
            appraiserId,
            ratedId,
            content,
            rate
        });

        return result;
    }
}