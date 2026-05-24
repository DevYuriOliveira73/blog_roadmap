import express from "express";

const app = express()

app.use(express.json())

//routes import
import userRouter from "./routes/user.route.js"
// import clienteRouter from "./routes/cliente.route"
// import pedidoRouter from "./routes/pedido.route"


//routes declaration
app.use('/api', userRouter)
// app.use('/api/v1', clienteRouter)
// app.use('/api/v1', pedidoRouter)


export default app;
