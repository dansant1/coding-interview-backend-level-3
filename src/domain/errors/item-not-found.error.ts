export class ItemNotFoundError extends Error {
    constructor(id: number) {
        super(`Item with id ${id} not found`);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}