import { JsonPetRepository } from '../src/database/repositories/adoption/json-pet-repository.js'
import { JsonAddressRepository } from '../src/database/repositories/adoption/json-address-repository.js'
import { RegisterPetAddressUseCase } from '../src/domain/adoption/application/use-cases/register-pet-address.js'
import { GeoCodeService } from '../src/services/geocode/geocode-service.js'


export class AddressInterface {
    // Database
    petRepository = new JsonPetRepository()
    addressRepository = new JsonAddressRepository()

    // Services
    geocodeService = new GeoCodeService()

    // props -> {
    //     entityId,
    //     street,
    //     number,
    //     complement,
    //     neighborhood,
    //     city,
    //     state,
    //     zipCode,
    //     country,
    //     latitude,
    //     longitude
    // }
    async registerPetAddress(props) {
        const registerPetAddress = new RegisterPetAddressUseCase(
            this.petRepository,
            this.addressRepository,
            this.geocodeService
        )

        const response = await registerPetAddress.execute(props)

        if (response.isLeft && response.isLeft() === true) {
            console.error(response)
            return response
        }

        return response.value
    }
}
