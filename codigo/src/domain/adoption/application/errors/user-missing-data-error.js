export class UserMissingDataError extends Error {
    constructor() {
        super("User missing data");
    }
}