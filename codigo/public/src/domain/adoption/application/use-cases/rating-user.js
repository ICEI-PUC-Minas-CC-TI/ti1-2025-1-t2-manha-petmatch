import { left, right } from "/core/Either.js"; 
import { ResourceNotFoundError } from "/core/errors/resource-not-found-error.js"; 
import { RequestMissingDataError } from "../errors/request-missing-data-error.js"; 
import { RatingUser } from "../../enterprise/entities/RatingUser.js";

export class RatingUserUseCase {
    userRepository;
    ratingUserRepository;
    donorRepository;

    constructor(userRepository, ratingUserRepository, donorRepository) { //classes já instânciadas
        this.userRepository = userRepository;
        this.ratingUserRepository = ratingUserRepository;
        this.donorRepository = donorRepository;
    }

    async execute({ appraiserId, ratedId, content, rate }) {
        if (!appraiserId || !ratedId || !content || !rate) {
            return left(new RequestMissingDataError());
        }

        const { user } = await this.userRepository.findById(appraiserId);
        const { donor } = await this.donorRepository.findById(ratedId);

        if (!user) {
            return left(new ResourceNotFoundError('Appraiser user not found.'));
        }

        if (!donor){
            return left(new ResourceNotFoundError('Rated donor not found.'));
        }

        const ratingUser = RatingUser.create({
            appraiserId,
            ratedId,
            content,
            rate,
        });

        await this.ratingUserRepository.create(ratingUser);

        return right({ ratingUser });
    }
}