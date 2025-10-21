'use client';

import { useState } from "react";
import NavBar from "../components/navbar";
import { withAuth } from "../components/withAuth";
import { ModalMovimentacao } from "../hooks/ModalMovimentacao";
import { useEstoque } from "../hooks/useEstoque";
import { Estoque } from "../types/estoque";



function PaginaEstoque() {
  const { estoques, setEstoques, loading, handleDelete, handleAdd } = useEstoque();
  const [itemSelecionado, setItemSelecionado] = useState<Estoque | null>(null);

  const handleSuccess = (estoqueAtualizado: Estoque) => {
    setEstoques(estoquesAtuais =>
      estoquesAtuais.map(e =>
        e.idEstoque === estoqueAtualizado.idEstoque ? estoqueAtualizado : e
      )
    );
    setItemSelecionado(null);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <section>
      <NavBar texto={"Estoque"} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Controle de Estoque</h1>
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
                <th className="py-3 px-4 text-left">Produto</th>
                <th className="py-3 px-4 text-left">Última Movimentação</th>
                <th className="py-3 px-4 text-left">Quantidade Total</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {estoques.map((item) => (
                <tr key={item.idEstoque} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.produto?.nome}</td>
                  <td className="py-3 px-4">
                    {item.ultimaMovimentacao ? (
                      <span className={item.ultimaMovimentacao.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'}>
                        {item.ultimaMovimentacao.tipo === 'ENTRADA' ? '+' : '-'} {item.ultimaMovimentacao.quantidade}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold">{item.quantidade}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setItemSelecionado(item)}
                      className="text-blue-500 font-semibold mr-4"
                    >
                      Atualizar
                    </button>
                    <button
                      onClick={() => handleDelete(item.idEstoque)}
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

      {itemSelecionado && (
        <ModalMovimentacao
          item={itemSelecionado}
          onClose={() => setItemSelecionado(null)}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}

export default withAuth(PaginaEstoque);