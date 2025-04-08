import { Request, ResponseToolkit } from '@hapi/hapi';
import { HealthCheckService } from '../../application/services/health.service';

export class HealthCheckController {
    constructor(private healthCheckService: HealthCheckService) {}

    async ping(request: Request, h: ResponseToolkit) {
        try {
            const healthStatus = await this.healthCheckService.checkHealth();
            return h.response(healthStatus).code(200);
        } catch (error) {
            console.error(error);
            return h.response('Service Unavailable').code(503);
        }
    }
}
