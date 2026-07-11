import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;