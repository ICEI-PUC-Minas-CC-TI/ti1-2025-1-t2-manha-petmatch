export class EntityTypeDoesNotMatchError extends Error {
    constructor() {
        super("Entity type does not match")
    }
}