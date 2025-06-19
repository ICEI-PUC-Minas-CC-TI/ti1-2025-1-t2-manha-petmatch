import { Session } from "../../domain/adoption/enterprise/entities/Session.js";

export class JsonSessionRepositoryMapper {
    static toDomain(raw) {
        return Session.create({
               userId: raw.user_id,
               donorId: raw.donor_id, 
               expiresAt: raw.expires_at,
               entityType: raw.entity_type,
               createdAt: raw.created_at
        }, raw.id);
    }

    static toJson(session) {
        return {
            id: session.id,
            user_id: session.userId,
            donor_id : session.donorId,
            expires_at: session.expiresAt,
            entity_type: session.entityType,
            created_at: session.createdAt
        };
    }
}