import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { EntityAlredyHasAddressError } from "../errors/entity-alredy-has-address-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import {Address} from '../../enterprise/entities/Address.js'
import { right, left } from "../../../../../core/Either.js";

export class RegisterPetAddressUseCase {
    petRepository;
    addressRepository;

    constructor(petRepository, addressRepository) {
        this.petRepository = petRepository
        this.addressRepository = addressRepository
    } 

    async execute({
        entityId,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        country,
        latitude,
        longitude
    }) { 
        if(!entityId || !street ||  !number ||
        !complement ||
        !neighborhood ||
        !city ||
        !state ||
        !zipCode ||
        !country ||
        !latitude ||
        !longitude) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(entityId)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        const petAlredyHasAddress = await this.addressRepository.findAddressByEntityId(entityId)

        console.log(petAlredyHasAddress)

        if(petAlredyHasAddress.address !== null) {
            return left(new EntityAlredyHasAddressError())
        }

        const address = new Address({
               entityId,
                street,
                number,
                complement,
                neighborhood,
                city,
                state,
                zipCode,
                country,
                latitude,
                longitude,
                entityType: 'pet'
        })

        await this.addressRepository.create(address)

        return right(address);
    }
}