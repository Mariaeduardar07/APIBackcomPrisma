import anotacaoModel from "../models/anotacaoModel.js";

class AnotacaoController {
  getAll = async (req, res) => {
    try {
      const anotacoes = await anotacaoModel.getAll();
      res.json(anotacoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar anotações" });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      const anotacao = await anotacaoModel.getById(Number(id));
      if (!anotacao) {
        return res.status(404).json({ erro: "Anotação não encontrada" });
      }
      res.json(anotacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar a anotação" });
    }
  };

  create = async (req, res) => {
    const { titulo, conteudo, favorita, cor } = req.body;
    try {
      if (!titulo || !conteudo || !titulo || !cor) {
        return res.status(400).json({ erro: "Todos os campos são obrigatorios" });
      }
      const novaAnotacao = await anotacaoModel.create(titulo, conteudo, favorita, cor);
      res.status(201).json(novaAnotacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar anotação" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, favorita, cor} = req.body;
    try {
      const anotacaoAtualizada = await anotacaoModel.update(
        Number(id),
        titulo,
        conteudo,
        favorita,
        cor,
      );

      if (!anotacaoAtualizada) {
        return res.status(404).json({ erro: "Anotação não encontrada" });
      }
      res.json(anotacaoAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar anotação" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const anotacao = await anotacaoModel.delete(Number(id));

      if (!anotacao) {
        return res.status(404).json({ erro: "Anotação não encontrada" });
      }

      res.status(200).send({message: "Anotação deletada com sucesso"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar anotação" });
    }
  };
}
export default new AnotacaoController();
