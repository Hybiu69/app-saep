'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { Estoque } from '../types/estoque';

interface Props {
  item: Estoque;
  onClose: () => void;
  onSuccess: (estoqueAtualizado: Estoque) => void;
}

export function ModalMovimentacao({ item, onClose, onSuccess }: Props) {
  const [tipo, setTipo] = useState('ENTRADA');
  const [quantidadeMovimentada, setQuantidadeMovimentada] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantidadeMovimentada <= 0) {
      Swal.fire('Atenção!', 'A quantidade deve ser maior que zero.', 'warning');
      return;
    }

    let novaQuantidadeTotal = item.quantidade;

    if (tipo === 'ENTRADA') {
      novaQuantidadeTotal += quantidadeMovimentada;
    } else { // SAIDA
      if (quantidadeMovimentada > item.quantidade) {
        Swal.fire('Erro!', 'A quantidade de saída não pode ser maior que o estoque atual.', 'error');
        return;
      }
      novaQuantidadeTotal -= quantidadeMovimentada;
    }

    const dadosParaAtualizar = {
      ...item,
      quantidade: novaQuantidadeTotal,
    };

    api.put(`/estoque/${item.idEstoque}`, dadosParaAtualizar)
      .then(response => {
        Swal.fire('Sucesso!', 'Estoque atualizado com sucesso.', 'success');

        const estoqueComInfoExtra = {
          ...response.data,
          ultimaMovimentacao: {
            tipo,
            quantidade: quantidadeMovimentada
          }
        };

        onSuccess(estoqueComInfoExtra);
      })
      .catch(() => {
        Swal.fire('Erro!', 'Não foi possível atualizar o estoque.', 'error');
      });
  };

  return (
    <div className="fixed inset-0 bg-[#0000009b] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Movimentar: {item.produto.nome}</h2>
        <p className="mb-4">Estoque Atual: <strong>{item.quantidade}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tipo de Movimentação</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded">
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2">Quantidade</label>
            <input
              type="number"
              min="1"
              value={quantidadeMovimentada || ''}
              onChange={e => setQuantidadeMovimentada(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 py-2 px-4 rounded">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}