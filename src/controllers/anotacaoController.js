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

  create = async (req, res) => {
    const { titulo, conteudo } = req.body;
    try {
      if (!titulo || !conteudo) {
        return res.status(400).json({ erro: "Titulo e o conteudo são obrigatória" });
      }
      const novaAnotacao = await anotacaoModel.create(titulo);
      res.status(201).json(novaAnotacao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar anotação" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, favorita, cor, criadaEm, atualizadaEm} = req.body;
    try {
      const anotacaoAtualizada = await anotacaoModel.update(
        Number(id),
        titulo,
        conteudo,
        favorita,
        cor,
        criadaEm,
        atualizadaEm
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
      const sucesso = await anotacaoModel.delete(Number(id));

      if (!sucesso) {
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
