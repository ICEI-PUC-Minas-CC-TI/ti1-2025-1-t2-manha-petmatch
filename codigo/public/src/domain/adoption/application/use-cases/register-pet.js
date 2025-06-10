import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { Pet } from '../../enterprise/entities/Pet.js'
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
    }
*/

export class RegisterPetUseCase {
    petRepository;
    donorRepository;
    constructor(petRepository, donorRepository) {
        this.petRepository = petRepository;
        this.donorRepository = donorRepository
    }

    async execute({
        name,
        animalTypeId,
        size,
        animalSex,
        description,
        imgUrls,
        bornAt,
        breed,
        vaccinated,
        castrated,
        availableForAdoption,
        personality,
        donorId,
    }) {


        if (name == undefined ||
            animalTypeId == undefined ||
            size == undefined ||
            animalSex == undefined ||
            description == undefined ||
            imgUrls == undefined ||
            bornAt == undefined ||
            breed == undefined ||
            vaccinated == undefined ||
            castrated == undefined ||
            availableForAdoption == undefined ||
            personality == undefined ||
            donorId == undefined) {
            return left(new RequestMissingDataError());
        }

        const { donor } = await this.donorRepository.findById(donorId)

        if (!donor) {
            return left(new NotAllowedError());
        }

        const pet = Pet.create(
            {
                name,
                animalTypeId,
                size,
                animalSex,
                description,
                imgUrls,
                bornAt,
                breed,
                vaccinated,
                castrated,
                availableForAdoption,
                personality,
                donorId,

            }
        )

        await this.petRepository.create(pet);

        return right({
            pet
        })
    }
}