import { RatingUserUseCase } from "../use-cases/rating-user.js";
import { JsonRatingUserRepository } from "../repositories/json-rating-user-repository.js";
import { UserRepository } from "../repositories/user-repository.js"; 


export class RatingUserInterface {
    constructor() {
        this.userRepository = new UserRepository();
        this.ratingUserRepository = new JsonRatingUserRepository();
        this.ratingUserUseCase = new RatingUserUseCase(this.userRepository, this.ratingUserRepository);
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
