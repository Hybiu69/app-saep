'use client';

import { useFormularioProduto } from '../hooks/useFormularioProduto';

export default function FormularioProduto({ id }: { id?: string }) {
  const { form, isEditMode, handleChange, handleSubmit, handleCancel } = useFormularioProduto(id);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>

        <div className="mb-4">
          <label htmlFor="nome">Nome</label>
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>

        <div className="mb-4">
          <label htmlFor="descricao">Descrição</label>
          <textarea name="descricao" value={form.descricao} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>

        <div className="mb-4">
          <label htmlFor="precoCusto">Preço Custo</label>
          <input type="number" name="precoCusto" value={form.precoCusto} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="precoVenda">Preço Venda</label>
          <input type="number" name="precoVenda" value={form.precoVenda} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="estoqueMinimo">Estoque mínimo</label>
          <input type="number" name="estoqueMinimo" value={form.estoqueMinimo} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="marca">Marca</label>
          <input type="text" name="marca" value={form.marca} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="modelo">modelo</label>
          <input type="text" name="modelo" value={form.modelo} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="ano_fabricao">Ano de Fabricação</label>
          <input type="text" name="anoFabricacao" value={form.anoFabricacao} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>
        <div className="mb-4">
          <label htmlFor="compatibilidade">compatibilidade</label>
          <input type="text" name="compatibilidade" value={form.compatibilidade} onChange={handleChange} required className="w-full p-2 border rounded mt-1"/>
        </div>

        <div className="flex justify-end gap-4">
            <button type="button" onClick={handleCancel} className="bg-gray-200 py-2 px-4 rounded">
                Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                {isEditMode ? 'Atualizar' : 'Salvar'}
            </button>
        </div>
      </form>
    </div>
  );
}