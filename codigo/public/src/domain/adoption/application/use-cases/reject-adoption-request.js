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

export class RejectAdoptionRequestUseCase {
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
        adoptionId,
        donorId
    }) {
        
        if(!adoptionId || !donorId) {
            return left(new RequestMissingDataError());
        } 

        const {adoption} = await this.adoptionRepository.findById(adoptionId)

        if(!adoption) {
            return left(new ResourceNotFoundError())
        }

        const {user} = await this.userRepository.findById(adoption.userId)
    
        const {donor} = await this.donorRepository.findById(adoption.donorId)

        const {pet} =  await this.petRepository.findById(adoption.petId)

        if(!user || !donor || !pet ) {
            return left(new ResourceNotFoundError())
        }

        if(pet.donorId !== donorId || donor.id !== donorId || adoption.donorId !== donorId) {
            return left(new NotAllowedError())
        }

        adoption.status = 'REJECTED'

        await this.adoptionRepository.save(adoption);

        return right({
            adoption: adoption
        })
    }
}