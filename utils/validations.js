import Joi from "joi";

//Validação para inserção/atualização de um contato
export const contatoValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    sobrenome: Joi.string().max(150),
    email: Joi.string().email(),
    telefone: Joi.string().required(),
    observacoes: Joi.string().max(200),
    favorito: Joi.boolean()
});

export const usuarioValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    email: Joi.string().email(),
    senha: Joi.string().min(6)
});