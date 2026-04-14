import { PrismaClient } from "@prisma/client";

// Keep one Prisma client instance for the app lifecycle to avoid extra DB connections.
const prisma = new PrismaClient();

export default prisma;
