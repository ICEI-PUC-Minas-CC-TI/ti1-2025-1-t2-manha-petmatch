import { RatingUser } from "../../domain/adoption/enterprise/entities/RatingUser.js";

export class JsonRatingUserRepositoryMapper {
    static toDomain(raw) {
        return RatingUser.create({
            appraiserId: raw.appraiserID, // Ajustado para 'appraiserID' conforme db.json
            ratedId: raw.ratedId,         // Ajustado para 'ratedId' conforme db.json
            content: raw.content,
            rate: raw.rate,
            createdAt: raw.created_at,
        }, raw.id);
    }

    static toJson(ratingUser) {
        return {
            id: ratingUser.id,
            appraiserID: ratingUser.appraiserId, // Ajustado para 'appraiserID'
            ratedId: ratingUser.ratedId,          // Ajustado para 'ratedId'
            content: ratingUser.content,
            rate: ratingUser.rate,
            created_at: ratingUser.createdAt,
        };
    }
}