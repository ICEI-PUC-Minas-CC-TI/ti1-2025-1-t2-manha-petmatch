export class RequestMissingDataError extends Error {
    constructor() {
        super("Request missing data");
    }
}