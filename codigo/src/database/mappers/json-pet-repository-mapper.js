import { Pet } from "../../domain/adoption/enterprise/entities/Pet.js";

export class JsonPetRepositoryMapper {
    static toDomain(raw) {
        const domainPet = Pet.create({
                name: raw.name,
                animalTypeId: raw.animal_type_id,
                size: raw.size,
                animalSex: raw.animal_sex,
                description: raw.description,
                imgUrls: raw.img_urls,
                bornAt: raw.born_at,
                breed: raw.breed,
                vaccinated: raw.vaccinated,
                castrated: raw.castrated,
                availableForAdoption: raw.available_for_adoption,
                personality: raw.personality,
                donorId: raw.donor_id,
                createdAt: raw.created_at,
                updatedAt: raw.updated_at
        }, raw.id)
        
        return domainPet
    }
    static toJson(pet) {

        const jsonPet =  {
            id: pet.id,
            name: pet.name,
            animal_type_id: pet.animalTypeId,
            size: pet.size,
            animal_sex: pet.animalSex,
            description: pet.description,
            img_urls: pet.imgUrls,
            born_at: pet.bornAt,
            breed: pet.breed,
            vaccinated: pet.vaccinated,
            castrated: pet.castrated,
            available_for_adoption: pet.availableForAdoption,
            personality: pet.personality,
            donor_id: pet.donorId,
            created_at: pet.createdAt,
            updated_at: pet.updatedAt

        }



        return jsonPet
    }
}