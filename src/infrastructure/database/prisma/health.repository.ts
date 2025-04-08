import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaHealthCheckRepository {
   
    async isDatabaseConnected(): Promise<boolean> {
        try {
            await prisma.$queryRaw`SELECT 1 + 1`;
            return true;
        } catch (error) {
            console.error('Database connection failed', error);
            return false; 
        }
    }
}
