export class DatabaseConnectionError extends Error {
    public statusCode: number;
    public errorType: string;

    constructor(message: string) {
        super(message);
        this.name = 'HealthCheckError';
        this.statusCode = 503;
        this.errorType = 'DatabaseConnectionError';
        Error.captureStackTrace(this, this.constructor);
    }
}
