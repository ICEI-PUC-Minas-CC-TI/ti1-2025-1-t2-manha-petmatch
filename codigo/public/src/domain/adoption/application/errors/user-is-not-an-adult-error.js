export class UserIsNotAnAdultError extends Error {
    constructor() {
        super("User is not an adult");
    }
}