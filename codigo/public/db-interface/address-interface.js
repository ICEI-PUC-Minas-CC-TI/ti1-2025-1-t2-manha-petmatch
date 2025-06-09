import { JsonPetRepository } from '../src/database/repositories/adoption/json-pet-repository.js'
import { JsonAddressRepository } from '../src/database/repositories/adoption/json-address-repository.js'
import { JsonDonorRepository } from '../src/database/repositories/adoption/json-donor-repository.js'
import { RegisterPetAddressUseCase } from '../src/domain/adoption/application/use-cases/register-pet-address.js'
import { GeoCodeService } from '../src/services/geocode/geocode-service.js'
import { EditPetAddressUseCase } from '../src/domain/adoption/application/use-cases/edit-pet-address.js'
import { GetPetAddressUseCase } from '../src/domain/adoption/application/use-cases/get-pet-address.js'
import { GetPetAddressByPetUseCase } from '../src/domain/adoption/application/use-cases/get-pet-address-by-pet.js'
import { FetchPetAddressUseCase } from '../src/domain/adoption/application/use-cases/fetch-pet-address.js'
import { DeletePetAddressUseCase } from '../src/domain/adoption/application/use-cases/delete-pet-address.js'


export class AddressInterface {
    // Database
    addressRepository = new JsonAddressRepository()
    petRepository = new JsonPetRepository(this.addressRepository)
    donorRepository = new JsonDonorRepository()

    // Services
    geocodeService = new GeoCodeService()

    // props -> {
    //     entityId,
    //     donorId,
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
            this.donorRepository,
            this.addressRepository,
            this.geocodeService
        )

        const response = await registerPetAddress.execute(props)

        if (response.isLeft() === true) {
            console.error(response)
            return response
        }

        return response.value
    }

    /*
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

    async editPetAddress(props) {
        const editPetAddressUseCase = new EditPetAddressUseCase(this.addressRepository, this.donorRepository, this.petRepository, this.geocodeService)
        
        const response = await editPetAddressUseCase.execute(props);

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    // INPUT
    // {
    //     id: someId
    // }
    async getPetAddress(props) {
        const getPetAddressUseCase = new GetPetAddressUseCase(this.addressRepository)
        
        const response = await getPetAddressUseCase.execute(props)

        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }


    // INPUT
    // {
    //     petId: someId
    // }
    async getPetAddressByPet(props) {

        const getPetAddressByPetUseCase = new GetPetAddressByPetUseCase(this.petRepository, this.addressRepository)
        
        const response = await getPetAddressByPetUseCase.execute(props)

        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    async fetchPetsAddresses() {
        const fetchPetAddressUseCase = new FetchPetAddressUseCase(this.addressRepository)

        const response = await fetchPetAddressUseCase.execute()

        
        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

    
    // INPUT
    // {
    //    addressId,
    //   donorId
    // }

    async deletePetAddress(props) {
        const deletePetAddressUseCase = new DeletePetAddressUseCase(this.addressRepository, this.petRepository, this.donorRepository)

        const response = await deletePetAddressUseCase.execute(props)

          if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}
