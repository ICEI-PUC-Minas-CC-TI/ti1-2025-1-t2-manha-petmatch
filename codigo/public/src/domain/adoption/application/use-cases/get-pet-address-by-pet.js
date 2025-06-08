import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import { right, left } from "../../../../../core/Either.js";
import { EntityTypeDoesNotMatchError } from "../errors/entity-type-does-not-match-error.js";

export class GetPetAddressByPetUseCase {
    petRepository;
    addressRepository;

    constructor(petRepository, addressRepository) {
        this.petRepository = petRepository
        this.addressRepository = addressRepository
    } 

    async execute({
       petId
    }) { 
        if(!petId) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(petId)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        const {address} = await this.addressRepository.findAddressByEntityId(petId)

        if(!address) {
            return left(new ResourceNotFoundError())
        }

        if(address.entityType !== 'pet') {
            return left(new EntityTypeDoesNotMatchError())
        }
        
        return right(address);
    }
}