"use client";

import Navbar from "../components/navbar";
import { usePostagens } from "../hooks/usePostagem";
import CarouselLugares from "../components/CarouselLugares";

export default function HomePage() {
  const { postagens, handleDelete, handleEdit } = usePostagens();

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
      <div className=" relative z-0 w-full flex flex-col items-center rounded-[50px] bg-white mt-15">
        <h2
          className="text-3xl md:text-4xl font-bold text-left text-[#31437A] mb-8"
          id="populares"
        >
          Melhores Avaliados
        </h2>

        <CarouselLugares lugares={postagens} />
      </div>

      <div
        className="-mt-[50px] h-[60dvh] bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/images/piquinique.jpg')" }}
      ></div>
    </main>
  );
}
