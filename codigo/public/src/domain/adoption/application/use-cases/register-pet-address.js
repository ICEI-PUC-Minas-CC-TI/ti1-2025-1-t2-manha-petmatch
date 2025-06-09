import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { EntityAlredyHasAddressError } from "../errors/entity-alredy-has-address-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import {Address} from '../../enterprise/entities/Address.js'
import { right, left } from "../../../../../core/Either.js";
import { AddressNotFoundedError } from "../errors/address-not-founded-error.js";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error.js";

export class RegisterPetAddressUseCase {
    petRepository;
    donorRepository;
    addressRepository;
    geoCodeService;

    constructor(petRepository, donorRepository, addressRepository, geoCodeService) {
        this.petRepository = petRepository;
        this.donorRepository = donorRepository;
        this.addressRepository = addressRepository;
        this.geoCodeService = geoCodeService;
    } 

    async execute({
        entityId,
        donorId,
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
        !country ||
        !neighborhood ||
        !donorId
    ) {
            return left(new RequestMissingDataError())
        }

        const {pet} = await this.petRepository.findById(entityId)

        if(!pet) {
            return left(new ResourceNotFoundError());
        }

        const {donor} = await this.donorRepository.findById(donorId)

        if(!donor || donor.id !== pet.donorId) {
            return left(new NotAllowedError())
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

        const address = Address.create({
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

        console.log(address)

        return right(address);
    }
}