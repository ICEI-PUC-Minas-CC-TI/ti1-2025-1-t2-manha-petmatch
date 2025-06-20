import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { EntityAlredyHasAddressError } from "../errors/entity-alredy-has-address-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import {Address} from '../../enterprise/entities/Address.js'
import { right, left } from "../../../../../core/Either.js";
import { AddressNotFoundedError } from "../errors/address-not-founded-error.js";

export class RegisterUserAddressUseCase {
    userRepository;
    addressRepository;
    geoCodeService;

    constructor(userRepository, addressRepository, geoCodeService) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.geoCodeService = geoCodeService;
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
    }) { 
        if(!entityId || !street ||  !number ||
        !city ||
        !state ||
        !zipCode ||
        !neighborhood
    ) {
            return left(new RequestMissingDataError())
        }

        const {user} = await this.userRepository.findById(entityId)

        if(!user) {
            return left(new ResourceNotFoundError());
        }
        
        const userAlredyHasAddress = await this.addressRepository.findAddressByEntityId(entityId)

        if(userAlredyHasAddress.address !== null) {
            return left(new EntityAlredyHasAddressError())
        }

        const {coordinates} = await this.geoCodeService.addressToCoordinates({
                street,
                number,
                city,
                state,
                zipCode,
                country: 'Brasil',
        })

        if(!coordinates) {
            return left(new AddressNotFoundedError())
        }

        const address = Address.create({
                entityId,
                street,
                number,
                complement,
                neighborhood,
                city,
                state,
                zipCode,
                country: 'Brasil',
                latitude: coordinates.lat,
                longitude: coordinates.lon,
                entityType: 'user'
        })

        await this.addressRepository.create(address)

        return right(address);
    }
}