export class DonorAlredyExistsError extends Error {
    constructor() {
        super("Donor alredy exists");
    }
}