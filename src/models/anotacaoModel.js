import prisma from "../../prisma/client.js";

class AnotacaoModel {
  getAll = async () => {
    return await prisma.nota.findMany();
  };

  create = async (titulo,conteudo, favorita, cor) => {
    return await prisma.nota.create({
      data: {
        titulo,
        conteudo, 
        favorita,
        cor
      },
    });
  };

  update = async (id, titulo, favorita, cor, atualizadaEm) => {
    try {
      const anotacao = await prisma.nota.update({
        where: { id },
        data: {
          favorita: favorita !== undefined ? favorita : true,
          titulo, 
          cor, 
          atualizadaEm: atualizadaEm || new Date(),
        },
      });

      return tarefa;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const anotacaoDeletada = await prisma.note.delete({
        where: { id },
      });

      return anotacaoDeletada;
    } catch (error) {
      console.log("Erro ao deletar a Anotação", error);
      throw error;
    }
  };
}
export default new AnotacaoModel();
