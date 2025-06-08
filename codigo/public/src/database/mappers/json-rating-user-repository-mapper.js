export class RatingUserRepositoryMapper {
    static toDomain(raw) {
        const domainRatingUser = RatingUser.create({
            appraiserId: raw.appraiser_id,
            ratedId: raw.rated_id,
            contentRepository: raw_content_repository,
            rateRepository: raw_rate_repository,
            createdAt: raw.created_at,
        }, raw.id)
        
        return domainRatingUser
    }
    static toJson(ratingUser) {

        const jsonRatingUser =  {
           id: ratingUser.id,
           appraiser_id: ratingUser.appraiserId,
           rated_id: ratingUser.ratedId,
           content_repository: ratingUser.contentRepository,
           rate_repository: ratingUser.rateRepository,
           created_at: ratingUser.createdAt,
        }

        return jsonRatingUser
    }
}