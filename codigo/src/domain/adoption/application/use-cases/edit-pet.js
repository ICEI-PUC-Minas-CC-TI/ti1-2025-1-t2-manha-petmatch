import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import {Pet} from '../../enterprise/entities/Pet.js'
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        name: string,
        animalTypeId: string,
        size: string,
        animalSex: string,
        descriptions: string,
        imgUrls: string[],
        bornAt: Date
        breed: string[]
        vaccinated: boolean,
        castrated: boolean,
        availableForAdoption: boolean,
        personality: string[]
        donorId: someId,
        donorType: null,
        id: someId
    }
*/

export class EditPetUseCase {
    petRepository;
    constructor(petRepository) {
        this.petRepository = petRepository;
    }

    async execute({
        name,
        animalTypeId,
        size,
        animalSex,
        descriptions,
        imgUrls,
        bornAt,
        breed,
        vaccinated,
        castrated,
        availableForAdoption,
        personality,
        donorId,
        id
    }) {

        if(!id || !donorId) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(id);
        console.log(pet)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        if(pet.donorId != donorId) {
            return left(new NotAllowedError())
        }

        pet.name = name;
        pet.animalTypeId = animalTypeId;
        pet.size = size;
        pet.animalSex = animalSex;
        pet.descriptions = descriptions;
        pet.imgUrls = imgUrls;
        pet.bornAt = bornAt;
        pet.vaccinated = vaccinated;
        pet.castrated = castrated;
        pet.availableForAdoption = availableForAdoption;
        pet.personality = personality;
        pet.breed = breed;

        pet.updatedAt = new Date();
    

        await this.petRepository.save(pet);

        return right({
            pet
        })
    }
}