import { ServerRoute } from "@hapi/hapi";
import { HealthCheckController } from "../controllers/health.controller";

export const healthRoutes = (controller: HealthCheckController): ServerRoute[] => [
    {
        method: "GET",
        path: "/ping",
        handler:  controller.ping.bind(controller)
    }
];  
