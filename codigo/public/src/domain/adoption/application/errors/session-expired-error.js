export class SessionExpiredError extends Error {
    constructor() {
        super("Sessin has expired.");
    }
}