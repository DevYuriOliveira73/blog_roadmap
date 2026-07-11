import connectDB from "./config/database.js";
import app from "./app.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${env.PORT}`);
    });

    server.on("error", (error) => {
      console.error("Erro no servidor:", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Falha na conexão com o banco de dados", error);
    process.exit(1);
  }
};

startServer();