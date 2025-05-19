import { Donor } from "../../domain/adoption/enterprise/entities/Donor.js";

export class JsonDonorRepositoryMapper {
    static toDomain(raw) {
        const domainDonor = Donor.create({
                createdAt: raw.created_at,
                updatedAt: raw.updated_at,
                donorType: raw.donor_type,
                adoptionAmount: raw.adoption_amount,
                donorId: raw.donor_id,
        }, raw.id)
        
        return domainDonor
    }
    static toJson(donor) {

        const jsonDonor =  {
           created_at: donor.createdAt,
           updated_at: donor.updatedAt,
           id: donor.id,
           donor_id: donor.donorId,
           adoption_amount: donor.adoptionAmount,
        }

        return jsonDonor
    }
}