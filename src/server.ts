import { ItemService } from "./application/services/item-service";
import { PrismaItemRepository } from "./infrastructure/database/prisma/item.repository";
import { ServerConfiguration } from "./infrastructure/http/server";
import { ItemController } from "./interfaces/controllers/item.controller";
import { itemRoutes } from './interfaces/routes/item.routes';
import { healthRoutes } from './interfaces/routes/health.routes';
import { HealthCheckController } from "./interfaces/controllers/health.controller";
import { HealthCheckService } from './application/services/health.service';
import { PrismaHealthCheckRepository } from './infrastructure/database/prisma/health.repository';

import dotenv from 'dotenv';

dotenv.config();

const _PORT = 4000;
const _HOST = "0.0.0.0";

const itemRepository = new PrismaItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService); 

const healthRepository = new PrismaHealthCheckRepository();
const healthService = new HealthCheckService(healthRepository);
const healthController = new HealthCheckController(healthService);

const routes = [...itemRoutes(itemController), ...healthRoutes(healthController)];

const getServer = () => {
    const serverConfig = ServerConfiguration.create(
        _PORT, 
        _HOST,
        routes
    );
    return serverConfig;
}

export const initializeServer = async () => {
    const serverConfig = getServer()
    await serverConfig.initialize()
    return serverConfig.server();
}

export const startServer = async () => {
    const serverConfig = getServer()
    await serverConfig.start()
    return serverConfig.server();
};