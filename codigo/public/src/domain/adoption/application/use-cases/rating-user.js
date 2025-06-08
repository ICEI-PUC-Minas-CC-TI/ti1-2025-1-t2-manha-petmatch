import { left, right } from "../../../../../core/Either.js";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";


export class RatingUserUseCase {
    appraiserIdRepository;
    ratedIdRepository;
    contentRepository;
    rateRepository;

    constructor(appraiserIdRepository, ratedIdRepository, contentRepository, rateRepository) {
        this.appraiserIdRepository = appraiserIdRepository;
        this.ratedIdRepository = ratedIdRepository;
        this.contentRepository = contentRepository;
        this.rateRepository = rateRepository;
    }

    async execute({
        appraiserId,
        ratedIdRepository,
        contentRepository,
        rateRepository
    }) {
        if( appraiserId == undefined || ratedIdRepository == undefined || contentRepository == undefined || rateRepository == undefined) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId);

        if(!user) {
            return left(new ResourceNotFoundError());
        }

        const ratingUser = RatingUser.create({
                    appraiserId: ratedIdRepository,
                    contentRepository,
                    rateRepository
                })
                
                await this.ratingUserRepository.create(ratingUser);
        
                return right({
                    ratingUser
                })
 }
 }