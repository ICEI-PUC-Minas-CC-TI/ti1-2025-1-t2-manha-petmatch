import { RatingProfile } from "../entities/ratingProfile.js";

export class RatingUserRepositoryMapper {
    static toDomain(raw) {
        return RatingProfile.create({
            appraiserId: raw.appraiser_id,
            ratedId: raw.rated_id,
            content: raw.content_repository,
            rate: raw.rate_repository,
            createdAt: raw.created_at,
        }, raw.id);
    }

    static toJson(ratingUser) {
        return {
            id: ratingUser.id,
            appraiser_id: ratingUser.appraiserId,
            rated_id: ratingUser.ratedId,
            content_repository: ratingUser.content,
            rate_repository: ratingUser.rate,
            created_at: ratingUser.createdAt,
        };
    }
}
