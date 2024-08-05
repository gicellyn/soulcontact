import { Contato } from "../models/contato.js";
import { contatoValidation } from "../utils/validations.js";
import { Router } from "express";

export const contatosRouter = Router();

//INSERÇÃO DE CONTATO[POST]
contatosRouter.post("/contatos", async (req, res) => {
    // error -> objeto com detalhes dos erros de validação[nulo, significa que está tudo ok]
    //value -> são os dados do req.body
    //abortEarly: false-> evita parar de validar o resto dos campo[ex: consegue mostrar mais de 1 erro]
    const {error, value} = contatoValidation.validate(req.body, {abortEarly: false});

    if (error) {
        // HTTP 400 - Bad Request - Indica que a requisição tem dados inválidos
        res.status(404).json({message: "Dados inválidos", error: error.details});
        return;   
    } 

    // Extrir as informações dos dados que foram validados anteriormente 
    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

    try {
        const novoContato = new Contato({ nome, sobrenome, email, telefone, observacoes, favorito });
        await novoContato.save();
        res.json({ message: "Contato criado com sucesso." });
    } catch (err) {
        res.status(500).json({ message: "Um erro ocorreu ao adicionar contato", error: err });
    }
});

//LISTAGEM DE CONTATOS [GET]
contatosRouter.get("/contatos", async (req, res) => {
    // const lista = await Contato.find({}, 'nome sobrenome'); --para mostrar os campos que você deseja
    const lista = await Contato.find();
    res.json(lista);
});

contatosRouter.get("/contatos/:id", async (req, res) => {
    const contato = await Contato.findById(req.params.id).select('-__v'); //select('-campo') exclui o campo da listagem

    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: "Contato não encontrado." });
    }
})

//ATUALIZAÇÃO DE CONTATO [PUT]
contatosRouter.put("/contatos/:id", async (req, res) => {
    const {error, value} = contatoValidation.validate(req.body, {abortEarly: false});

    if (error) {
        res.status(404).json({message: "Dados inválidos", error: error.details});
        return; 
    }
    
    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

    try {
        //ele procura pelo o contato indicado pelo ID, se existir ele será atualizado
        const contato = await Contato.findByIdAndUpdate(req.params.id, { nome, sobrenome, email, telefone, observacoes, favorito });

        if (contato) {
            res.json({ message: "Contato atualizado com sucesso." });
        } else {
            res.status(404).json({ message: "Contato não encontrato" });
        }

    } catch (err) {
        res.status(500).json({ message: "Não foi possível atualizar contato." });
    }
});

//REMOÇÃO DE CONTATO[DELETE]
contatosRouter.delete("/contatos/:id", async (req, res) => {
    
    try {
        const contato = await Contato.findByIdAndDelete(req.params.id);
        
        if (contato) {
            res.json({ message: "Contato removido com sucesso" });
        } else {
            res.status(404).json({ message: "Contato não encontrato" });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu ao remover ", error: err });
    }


})