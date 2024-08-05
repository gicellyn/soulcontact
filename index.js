import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { contatosRouter } from "./routes/contatos.js";
import { usuarioValidation } from "./utils/validations.js";
import { usuariosRouter } from "./routes/usuarios.js";


mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("MongoDB conectado!");
    }).catch((err) => {
        console.log(err)
    });

const app = express();
app.use(express.json());

app.use(contatosRouter);
app.use(usuariosRouter);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
})