import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { right, left } from "../../../../../core/Either.js";
import { EntityTypeDoesNotMatchError } from "../errors/entity-type-does-not-match-error.js";

export class GetPetAddressUseCase {
    addressRepository;

    constructor(addressRepository) {
        this.addressRepository = addressRepository
    } 

    async execute({
       id
    }) { 
        const {address} = await this.addressRepository.findById(id)

        if(!address) {
            return left(new ResourceNotFoundError())
        }

        if(address.entityType !== 'pet') {
            return left(new EntityTypeDoesNotMatchError())
        }

        return right(address);
    }
}