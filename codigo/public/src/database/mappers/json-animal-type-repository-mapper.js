import { AnimalType } from "../../domain/adoption/enterprise/entities/AnimalType.js";

export class JsonAnimalTypeRepositoryMapper {
    static toDomain(raw) {
        const domainAnimalType = AnimalType.create({
                createdAt: raw.created_at,
                type: raw.type,
                imgUrlReference: raw.img_url_reference
        }, raw.id)
        
        return domainAnimalType
    }
    static toJson(animaltype) {

        const jsonAnimalType =  {
           created_at: animaltype.createdAt,
           id: animaltype.id,
           type: animaltype.type,
           img_url_reference: animaltype.imgUrlReference,
        }

        return jsonAnimalType
    }
}