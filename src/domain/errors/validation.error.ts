export class ValidationError extends Error {
    constructor(public errors: Array<{ field: string, message: string }>) {
        super('Validation Error');
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}