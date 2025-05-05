import { right, left } from '../../../../../core/Either.js';
import {Adoption} from '../../enterprise/entities/Adoption.js'
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { PetNotAvaiiableForAdoptionError } from '../errors/pet-not-available-for-adoption-error.js';
import { Pet } from '../../enterprise/entities/Pet.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId: string,
        petId: string,
        donorId: string,

    }
*/

export class RegisterAdoptionUseCase {
    adoptionRepository;
    userRepository;
    donorRepository;
    petRepository;
    constructor(adoptionRepository, userRepository, donorRepository, petRepository) {
        this.adoptionRepository = adoptionRepository;
        this.userRepository = userRepository;
        this.donorRepository = donorRepository;
        this.petRepository = petRepository; 
    }

    async execute({
        userId,
        donorId,
        petId
    }) {

        if(!userId || !donorId || !petId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId)
        

        console.log(userId, donorId, petId)
        const {donor} = await this.donorRepository.findById(donorId)

        const {pet} =  await this.petRepository.findById(petId)


        if(!user || !donor || !pet ) {
            return left(new ResourceNotFoundError())
        }

        console.log(pet)

        if(pet.availableForAdoption === false) {
            return left(new PetNotAvaiiableForAdoptionError())
        }

        if(pet.donorId !== donorId) {
            return left(new NotAllowedError())
        }

        const adoption = Adoption.create(
            {
                petId,
                donorId, 
                userId
            }
        )

        await this.adoptionRepository.create(adoption);

        const newPetState = Pet.create({...pet, availableForAdoption: false});

        await this.petRepository.save(newPetState);

        return right({
            adoption
        })
    }
}