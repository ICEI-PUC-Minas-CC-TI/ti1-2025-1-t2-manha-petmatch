import { Pet } from "../../domain/adoption/enterprise/entities/Pet.js";

export class JsonPetRepositoryMapper {
    static toDomain(raw) {
        const domainPet = Pet.create({
                name: raw.name,
                animalTypeId: raw.animal_type_id,
                size: raw.size,
                animalSex: raw.animal_sex,
                descriptions: raw.descriptions,
                imgUrls: raw.img_urls,
                bornAt: raw.born_at,
                breed: raw.breed,
                vaccinated: raw.vaccinated,
                castrated: raw.castrated,
                availableForAdoption: raw.available_for_adoption,
                personality: raw.personality,
                donorId: raw.donor_id,
                donorType: raw.donor_type,
                createdAt: raw.created_at,
                updatedAt: raw.updated_at
        }, raw.id)
        
        return domainPet
    }
    static toJson(pet) {

        console.log("domain: ",pet)
        const jsonPet =  {
            id: pet.id,
            name: pet.name,
            animal_type_id: pet.animalTypeId,
            size: pet.size,
            animal_sex: pet.animalSex,
            descriptions: pet.descriptions,
            img_urls: pet.imgUrls,
            born_at: pet.bornAt,
            breed: pet.breed,
            vaccinated: pet.vaccinated,
            castrated: pet.castrated,
            available_for_adoption: pet.availableForAdoption,
            personality: pet.personality,
            donor_id: pet.donorId,
            donor_type: pet.donorType,
            created_at: pet.createdAt,
            updated_at: pet.updatedAt

        }

        console.log("db: ",jsonPet)


        return jsonPet
    }
}