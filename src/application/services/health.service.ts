import { DatabaseConnectionError } from '../../domain/errors/db-connection-failed.error';
import { PrismaHealthCheckRepository as HealthCheckRepository } from '../../infrastructure/database/prisma/health.repository';

export class HealthCheckService {
    constructor(private healthCheckRepository: HealthCheckRepository) {}

    async checkHealth(): Promise<{ ok: boolean }> {
        const isDatabaseHealthy = await this.healthCheckRepository.isDatabaseConnected();

        if (!isDatabaseHealthy) {
            throw new DatabaseConnectionError('DB disconnected');
        }

        return { ok: true };
    }
}
