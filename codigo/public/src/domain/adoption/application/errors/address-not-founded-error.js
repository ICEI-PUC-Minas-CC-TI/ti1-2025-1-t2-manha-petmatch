export class AddressNotFoundedError extends Error {
    constructor() {
        super("Address not founded");
    }
}