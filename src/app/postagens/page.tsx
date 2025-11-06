'use client';

import { withAuth } from '../components/withAuth';
import { usePostagens } from '../hooks/usePostagem';


function PaginaPostagens() {
  const { postagens, handleDelete, handleAdd, handleEdit } = usePostagens();

  return (
    <section>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Postagens</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white rounded-full w-12 h-12 text-2xl"
          >
            +
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Número</th>
                <th className="py-3 px-4 text-left">Rua</th>
                <th className="py-3 px-4 text-left">Bairro</th>
                <th className="py-3 px-4 text-left">URL</th>
                <th className="py-3 px-4 text-left">Descrição</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {postagens.map((postagem) => (
                <tr key={postagem.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{postagem.nome}</td>
                  <td className="py-3 px-4">{postagem.numero}</td>
                  <td className="py-3 px-4">{postagem.rua}</td>
                  <td className="py-3 px-4">{postagem.bairro}</td>
                  <td className="py-3 px-4">{postagem.url}</td>
                  <td className="py-3 px-4">{postagem.descricao}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleEdit(postagem.id)}
                      className="text-blue-500 font-semibold mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(postagem.id)}
                      className="text-red-500 font-semibold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default withAuth(PaginaPostagens);
