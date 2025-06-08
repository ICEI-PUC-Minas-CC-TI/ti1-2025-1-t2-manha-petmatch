import { left, right } from '../../../../../core/Either.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { EntityTypeDoesNotMatchError } from '../errors/entity-type-does-not-match-error.js';


/*
    INPUT {
        NOT OPTIONAL
        id: "uuid"
    }
*/

export class DeletePetAddressUseCase {
    addressRepository;
    petRepository
    donorRepository;
    constructor(addressRepository,petRepository,donorRepository) {
        this.addressRepository = addressRepository;
        this.petRepository = petRepository
        this.donorRepository = donorRepository;
    }

    async execute({
       addressId,
       donorId
    }) {

        if(!addressId || !donorId) {
            return left(new RequestMissingDataError())
        }

        const {address} = await this.addressRepository.findById(addressId);

        if(!address) {
            return left(new ResourceNotFoundError());
        }

        if(address.entityType !== 'pet') {
            return left(new EntityTypeDoesNotMatchError())
        }

       const {pet} = await this.petRepository.findById(address.entityId);

        if(!pet) {
            return left(new ResourceNotFoundError());
        }
        const {donor} = await this.donorRepository.findById(donorId)

        if(!donor || donor.id !== pet.donorId) {
            return left(new NotAllowedError())
        }

        await this.addressRepository.delete(address);

        return right("Address Deleted");
    }
}