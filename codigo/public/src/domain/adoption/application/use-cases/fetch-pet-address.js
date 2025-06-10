import { right } from "../../../../../core/Either.js";

export class FetchPetAddressUseCase {
    addressRepository;
    constructor(addressRepository) {
        this.addressRepository = addressRepository
    } 

    async execute() { 
        const {addresses} = await this.addressRepository.findManyAddress()

        return right({addresses: addresses});
    }
}