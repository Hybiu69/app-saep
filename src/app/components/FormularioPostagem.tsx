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
          <label htmlFor="endereco" className="block font-medium">
            Endereço
          </label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            value={form.endereco}
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
          <label htmlFor="url1" className="block font-medium">
            URL 1
          </label>
          <input
            type="url1"
            name="url1"
            id="url1"
            value={form.url1}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="url2" className="block font-medium">
            URL 2
          </label>
          <input
            type="url2"
            name="url2"
            id="url2"
            value={form.url2}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="url3" className="block font-medium">
            URL 3
          </label>
          <input
            type="url3"
            name="url3"
            id="url3"
            value={form.url3}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descricao" className="block font-medium">
            Descrição
          </label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="conteudo" className="block font-medium">
            Conteúdo
          </label>
          <textarea
            name="conteudo"
            id="conteudo"
            value={form.conteudo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoria" className="block font-medium">
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            value={form.categoria}
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
