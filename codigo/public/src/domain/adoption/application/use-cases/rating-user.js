import { left, right } from "../../../../../core/Either.js";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import { RatingProfile } from "../entities/ratingProfile.js";

export class RatingUserUseCase {
    constructor(userRepository, ratingUserRepository) {
        this.userRepository = userRepository;
        this.ratingUserRepository = ratingUserRepository;
    }

    async execute({ appraiserId, ratedId, content, rate }) {
        if (!appraiserId || !ratedId || !content || !rate) {
            return left(new RequestMissingDataError());
        }

        const { user } = await this.userRepository.findById(appraiserId);

        if (!user) {
            return left(new ResourceNotFoundError());
        }

        const ratingUser = RatingProfile.create({
            appraiserId,
            ratedId,
            content,
            rate,
        });

        await this.ratingUserRepository.create(ratingUser);

        return right({ ratingUser });
    }
}
