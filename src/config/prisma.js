import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL
});

// Keep one Prisma client instance for the app lifecycle to avoid extra DB connections.
const prisma = new PrismaClient({ adapter });

export default prisma;
