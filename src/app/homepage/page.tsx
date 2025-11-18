"use client";

import Navbar from "../components/navbar";
import { usePostagens } from "../hooks/usePostagem";
import CarouselLugares from "../components/CarouselLugares";
import { useEffect, useState } from "react";
import CarouselComentarios from "../components/CarouselComentarios";

type Comentario = {
  id: string;
  text: string;
  rating: number;
  date: string;
};

export default function HomePage() {
  const { postagens } = usePostagens();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  useEffect(() => {
    // Carregar todos os comentários do localStorage
    const allKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("comments-")
    );
    const allComments: Comentario[] = [];
    allKeys.forEach((key) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        allComments.push(...JSON.parse(stored));
      }
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
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Viva experiências sem barreiras!
          </h1>
          <p className="text-lg md:text-3xl">
            Conheça novos lugares aqui perto de você
          </p>
        </div>
      </section>
      <div className=" relative z-0 w-full flex flex-col p-10 items-center rounded-[50px] bg-white mt-15">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#31437A]"
          id="populares"
        >
          Mais Visitados
        </h2>

        <CarouselLugares lugares={postagens} />
      </div>

      <div
        className="-mt-[50px] h-[100dvh] bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/images/piquinique.jpg')" }}
      ></div>

      <div className=" -mt-[50px] flex flex-col w-full bg-[#9EC0CD] p-10 rounded-t-[50px]" id="avaliacoes">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#172550] mb-6 p-5">
          Principais Comentários
        </h2>

        <CarouselComentarios comentarios={comentarios} />
      </div>
    </main>
  );
}