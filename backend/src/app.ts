import express from "express";

const app = express()

app.use(express.json())

//routes import
import userRouter from "./routes/user.route.js"

//routes declaration
app.use('/api', userRouter)


export default app;
