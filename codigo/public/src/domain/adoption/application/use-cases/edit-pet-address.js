import { right, left } from '../../../../../core/Either.js';
import { NotAllowedError } from '../../../../../core/errors/not-allowed-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { AddressNotFoundedError } from '../errors/address-not-founded-error.js';
import { EntityTypeDoesNotMatchError } from '../errors/entity-type-does-not-match-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
         street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        country,
        donorId,
        addressId
    }
*/

export class EditPetAddressUseCase {
    addressRepository;
    donorRepository;
    petRepository;
    geoCodeService;
    constructor(addressRepository, donorRepository, petRepository, geoCodeService) {
        this.addressRepository = addressRepository;
        this.donorRepository = donorRepository;
        this.petRepository = petRepository;
        this.geoCodeService = geoCodeService;
    }

    async execute({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        donorId,
        addressId
    }) {

         if( !street ||  !number ||
        !city ||
        !state ||
        !zipCode ||
        !neighborhood ||
        !donorId
    ) {
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

        const {coordinates} = await this.geoCodeService.addressToCoordinates({
                street,
                number,
                city,
                state,
                zipCode,
                country: "Brasil",
        })

        if(!coordinates) {
            return left(new AddressNotFoundedError())
        }

        address.street = street;
        address.number = number;
        address.complement = complement;
        address.neighborhood = neighborhood;
        address.city = city;
        address.state = state;
        address.zipCode = zipCode;
        address.country = 'Brasil';
        address.latitude = coordinates.lat;
        address.longitude = coordinates.lon;    

        await this.addressRepository.save(address);

        return right({
            address
        })
    }
}