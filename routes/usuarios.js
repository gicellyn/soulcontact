import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { usuarioValidation } from "../utils/validations.js";

export const usuariosRouter = Router();

usuariosRouter.post("/usuarios", async (req, res) => {
    const {error, value} = usuarioValidation.validate(req.body, {abortEarly: false});

    if (error) {
        res.status(404).json({message: "Dados inválidos", error: error.details});
        return;   
    }

    const { nome, email, senha } = value;

    try {
        const novoUsuario = new Usuario({nome, email, senha});
        await novoUsuario.save();
        res.json({ message: "Usuário criado com sucesso." });
    } catch (err) {
        res.status(500).json({ message: "Um erro ocorreu ao criar contato", error: err });
    }
});