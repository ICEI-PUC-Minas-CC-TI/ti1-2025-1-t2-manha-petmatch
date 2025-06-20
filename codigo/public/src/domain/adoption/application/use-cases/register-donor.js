import { right, left } from '../../../../../core/Either.js';
import { DonorAlredyExistsError } from '../errors/donor-already-exists-error.js';
import {Donor} from '../../enterprise/entities/Donor.js'
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';


/*
    INPUT {
        NOT OPTIONAL
        userId: someValue 
    }
*/

export class RegisterDonorUseCase {
    donorRepository;
    userRepository;
    constructor(donorRepository, userRepository) {
        this.donorRepository = donorRepository;
        this.userRepository = userRepository;
    }

    async execute({
        userId
    }) {

        if(!userId) {
            return left(new RequestMissingDataError());
        } 

        const {user} = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        } 

        const {donor} = await this.donorRepository.findByUserId(userId)

        if(donor) {
            return left(new DonorAlredyExistsError());
        }

        const donorObject = Donor.create(
            {
                adoptionAmount: 0,
                userId: userId,
                donorType: 'USER'
            }
        )

        await this.donorRepository.create(donorObject);

        return right({
            donor: donorObject
        })
    }
}