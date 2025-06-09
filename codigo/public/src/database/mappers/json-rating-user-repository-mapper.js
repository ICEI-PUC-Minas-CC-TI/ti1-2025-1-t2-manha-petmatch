import { RatingUser } from "../../../src/domain/adoption/enterprise/entities/RatingUser.js";

export class RatingUserRepositoryMapper {
    static toDomain(raw) {
        return RatingUser.create({
            appraiserId: raw.appraiserID, 
            ratedId: raw.ratedId,       
            content: raw.content,       
            rate: raw.rate,             
            createdAt: raw.created_at,
        }, raw.id);
    }

    static toJson(ratingUser) {
        return {
            id: ratingUser.id,
            appraiserID: ratingUser.appraiserId, 
            ratedId: ratingUser.ratedId,      
            content: ratingUser.content,       
            rate: ratingUser.rate,             
            created_at: ratingUser.createdAt,
        };
    }
}