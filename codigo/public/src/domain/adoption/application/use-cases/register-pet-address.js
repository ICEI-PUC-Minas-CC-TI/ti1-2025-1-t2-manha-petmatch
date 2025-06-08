import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { EntityAlredyHasAddressError } from "../errors/entity-alredy-has-address-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import {Address} from '../../enterprise/entities/Address.js'
import { right, left } from "../../../../../core/Either.js";
import { AddressNotFoundedError } from "../errors/address-not-founded-error.js";

export class RegisterPetAddressUseCase {
    petRepository;
    addressRepository;
    geoCodeService;

    constructor(petRepository, addressRepository, geoCodeService) {
        this.petRepository = petRepository
        this.addressRepository = addressRepository
        this.geoCodeService = geoCodeService
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
    }) { 
        if(!entityId || !street ||  !number ||
        !city ||
        !state ||
        !zipCode ||
        !country 
    ) {
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

        const {coordinates} = await this.geoCodeService.addressToCoordinates({
                street,
                number,
                city,
                state,
                zipCode,
                country,
        })

        if(!coordinates) {
            return left(new AddressNotFoundedError())
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
                latitude: coordinates.lat,
                longitude: coordinates.lon,
                entityType: 'pet'
        })

        await this.addressRepository.create(address)

        return right(address);
    }
}