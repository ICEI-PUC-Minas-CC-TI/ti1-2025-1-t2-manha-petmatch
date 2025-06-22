import { Adoption } from "../../domain/adoption/enterprise/entities/Adoption.js";

export class JsonAdoptionRepositoryMapper {
    static toDomain(raw) {
        const domainAdoption = Adoption.create({
                createdAt: raw.created_at,
                petId: raw.pet_id,
                userId: raw.user_id,
                donorId: raw.donor_id,
                status: raw.status,
                updatedAt: raw.updated_at
        }, raw.id)
        
        return domainAdoption
    }
    static toJson(adoption) {

        const jsonAdoption =  {
           created_at: adoption.createdAt,
           id: adoption.id,
           user_id: adoption.userId,
           donor_id: adoption.donorId,
           pet_id: adoption.petId,
           status: adoption.status,
           updated_at: adoption.updatedAt
        }

        return jsonAdoption
    }
}