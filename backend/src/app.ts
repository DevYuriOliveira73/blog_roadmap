import express from "express";

const app = express()

app.use(express.json())

//routes import
import router from "./routes/index.js"

//routes declaration
app.use('/api', router)

export default app;