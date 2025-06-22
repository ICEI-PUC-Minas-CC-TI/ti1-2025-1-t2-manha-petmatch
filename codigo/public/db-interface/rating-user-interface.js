import { RatingUserUseCase } from "../src/domain/adoption/application/use-cases/rating-user.js";
import { FetchRatingUserUseCase } from "../src/domain/adoption/application/use-cases/fetch-rating.js";
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

    async getRatesByRatedId({ ratedId }) {

        const fetchRatingUserUseCase = new FetchRatingUserUseCase(this.ratingUserRepository, this.donorRepository)

        const result = await fetchRatingUserUseCase.execute({
            ratedId
        });

        if(result.isLeft()) {
            console.error(result.value)
            return result
        }

        return result;
    }
}