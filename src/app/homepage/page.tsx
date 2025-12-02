"use client";

import { useState, useEffect } from "react";
import CarouselComentarios from "../components/CarouselComentarios";
import CarouselLugares from "../components/CarouselLugares";
import Lugares from "../components/Lugares";
import Navbar from "../components/navbar";
import { usePostagens } from "../hooks/usePostagem";
import { useRouter } from "next/navigation";

type Comentario = {
  id: string;
  text: string;
  rating: number;
  date: string;
};

export default function HomePage() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const { postagens } = usePostagens();
  const router = useRouter();

  useEffect(() => {
    const allKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("comments-")
    );
    const allComments: Comentario[] = [];
    allKeys.forEach((key) => {
      const stored = localStorage.getItem(key);
      if (stored) allComments.push(...JSON.parse(stored));
    });
    setComentarios(allComments);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section
        className="relative h-[80vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fundo.png')" }}
      >
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className=" px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Viva experiências sem barreiras!
          </h1>
          <p className="text-lg md:text-3xl">
            Conheça novos lugares aqui perto de você
          </p>
        </div>
      </section>

      <div className=" w-full flex flex-col p-10 items-center bg-white mt-15">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#31437A]">
          Mais Visitados
        </h2>
        <CarouselLugares lugares={postagens} />
      </div>
      <div
        className="relative h-[100dvh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/piquinique.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className=" flex flex-col w-full bg-[#9EC0CD] p-10">
        <h2 className="text-3xl md:text-3xl font-semibold text-center text-[#172550] p-5">
          Principais Comentários
        </h2>
        <CarouselComentarios comentarios={comentarios} />
      </div>

      <div id="categorias">
        <Lugares postagens={postagens} />
      </div>

      <section
        className="relative h-[100vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/ioga.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Conheça os melhores espaços pra você
          </h1>
          <p className="text-lg md:text-3xl">
            Descubra novos caminhos e aproveite cada momento.
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col md:flex-row max-h-[1000px]">
        {/* --- COLUNA ESQUERDA (laranja + texto) --- */}

        <div className="w-full md:w-1/2 bg-[#E58D4A] flex items-center justify-center">
          <div
            className="bg-[#FABE75] p-20 shadow-[0_10px_30px_rgba(0,0,0,0.20)] max-w-xl mr-[-40%] relative transition-transform 
        duration-500 hover:scale-[1.02]"
          >
            <h2 className="text-4xl font-semibold text-[#1F2A41] mb-4">
              Sobre nós
            </h2>
            <hr className="h-px my-8 border-2 border-[#c17033] w-[25%]" />

            <p className="text-[#1F2A41] leading-relaxed mb-6 text-lg text-justify">
              Na E.V.A, acreditamos que todos merecem viver boas experiências.
              Por isso, criamos uma plataforma que facilita o acesso a
              informações reais sobre acessibilidade nos principais espaços de
              Itapetininga, ajudando moradores e visitantes a explorarem a
              cidade com mais autonomia.
            </p>

            <p className="text-[#1F2A41] leading-relaxed mb-6 text-lg text-justify">
              Nossa missão é conectar pessoas a lugares que acolhem, inspiram e
              respeitam a diversidade. Parques, pontos culturais, atrações
              históricas, eventos e muito mais — tudo organizado de forma clara,
              leve e prática.
            </p>

            <p className="text-[#1F2A41] leading-relaxed text-lg text-justify">
              Para que cada passo seja em direção a um convívio mais humano,
              aberto e acessível para todos.
            </p>
          </div>
        </div>

        {/* --- COLUNA DIREITA (branco + imagem) --- */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src="/images/itp.png"
              alt="mapa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="relative w-full bg-[#90AEAC] text-white py-16 px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start">
          {/* Coluna de imagens (ícones) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col space-y-6">
            <img
              src="/images/tiktok.png"
              alt="tiktok"
              className="w-6 opacity-90 hover:opacity-100 cursor-pointer"
            />

            <img
              src="/images/instagram.png"
              alt="instagram"
              className="w-6 opacity-90 hover:opacity-100 cursor-pointer"
            />

            <img
              src="/images/youtube.png"
              alt="youtube"
              className="w-6 opacity-90 hover:opacity-100 cursor-pointer"
            />
          </div>

          {/* Conteúdo central */}
          <div className="flex flex-col items-center space-y-6 text-justify">
            <div>
              <h3 className="text-xl font-bold">Telefone:</h3>
              <p>123-456-789-30</p>
              <p>info@mysite.com</p>

              <hr className="h-px my-5 border-2 border-white w-[30%]" />

              <h3 className="text-xl font-bold">Endereço:</h3>
              <p>Av. Padre Antônio Brunetti</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex justify-center p-8 bg-gray-50">
        <button
          onClick={() => router.push("/postagens")}
          className="px-6 py-3 text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          📄 Ver Todas as Postagens
        </button>
      </div>
    </main>
  );
}
