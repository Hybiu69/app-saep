"use client";

import { useFormularioPostagem } from "../hooks/useFormularioPostagem";

export default function FormularioPostagem({ id }: { id?: string }) {
  const { form, isEditMode, handleChange, handleSubmit, handleCancel } =
    useFormularioPostagem(id);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? "Editar Postagem" : "Cadastrar Postagem"}
        </h1>

        <div className="mb-4">
          <label htmlFor="nome" className="block font-medium">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numero" className="block font-medium">
            Número
          </label>
          <input
            type="number"
            name="numero"
            id="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rua" className="block font-medium">
            Rua
          </label>
          <input
            type="text"
            name="rua"
            id="rua"
            value={form.rua}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bairro" className="block font-medium">
            Bairro
          </label>
          <input
            type="text"
            name="bairro"
            id="bairro"
            value={form.bairro}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="block font-medium">
            URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            value={form.url}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descricao" className="block font-medium">
            Descrição
          </label>
          <textarea
            name="descricao"
            id="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>


        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isEditMode ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
