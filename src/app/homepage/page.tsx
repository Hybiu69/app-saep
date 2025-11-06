'use client';
import Navbar from '../components/navbar';
  import { usePostagens } from '../hooks/usePostagem';
  

  export default function homepage(){
    const { postagens, handleDelete, handleAdd, handleEdit } = usePostagens();

    return (
    <main className="min-h-screen flex flex-col">

      <Navbar/>

      <section
        className="relative h-[80vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fundo.png')" }}
      >
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-8xl font-bold mb-4">
            Viva experiências sem barreiras!
          </h1>
          <p className="text-lg md:text-3xl">
            Conheça novos lugares aqui perto de você
          </p>
        </div>
      </section>
      
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
    </main>
  );
}
