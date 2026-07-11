import { prisma } from "../database/prisma.js";

const connectDB = async () => {
  await prisma.$connect();
  console.log("Banco de dados conectado");
};

export default connectDB;