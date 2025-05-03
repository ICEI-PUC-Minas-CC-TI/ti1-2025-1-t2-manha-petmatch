import { FavoritePet } from "../../domain/adoption/enterprise/entities/FavoritePet.js";

export class JsonFavoritePetRepositoryMapper {
    static toDomain(raw) {
        const domainFavoritePet = FavoritePet.create({
            appraiserId: raw.appraiser_id,
            petId: raw.pet_id,
            createdAt: raw.created_at,
        }, raw.id)
        
        return domainFavoritePet
    }
    static toJson(favoritePet) {

        const jsonFavoritePet =  {
           id: favoritePet.id,
           appraiser_id: favoritePet.appraiserId,
           pet_id: favoritePet.petId,
           created_at: favoritePet.createdAt,
        }

        return jsonFavoritePet
    }
}