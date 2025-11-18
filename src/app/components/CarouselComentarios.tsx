"use client";

import { useState, useEffect } from "react";

type Comentario = {
  id: string;
  text: string;
  rating: number;
  date: string;
};

interface CarouselComentariosProps {
  comentarios: Comentario[];
}

export default function CarouselComentarios({ comentarios }: CarouselComentariosProps) {
  const [index, setIndex] = useState(0);

  if (!comentarios || comentarios.length === 0)
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum comentário ainda.
      </div>
    );

  const total = comentarios.length;

  // Pega os comentários visíveis (até 4 por vez)
  const getVisible = () => {
    const items: Comentario[] = [];
    for (let i = 0; i < Math.min(4, total); i++) {
      const item = comentarios[(index + i) % total];
      if (!items.some((x) => x.id === item.id)) items.push(item);
    }
    return items;
  };

  const visible = getVisible();

  const previous = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev + 1) % total);

  return (
    <div className="relative w-full flex justify-center py-10">
      <button
        onClick={previous}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-200 text-black text-3xl px-3 py-1 rounded-full z-10"
      >
        ‹
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] max-w-7xl">
        {visible.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < c.rating ? "bg-[#2D95BB]" : "bg-gray-200"
                  }`}
                ></span>
              ))}
            </div>
            <p className="text-gray-700 mb-2">{c.text}</p>
            <span className="text-gray-400 text-sm">{c.date}</span>
          </div>
        ))}
      </div>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-200 text-black text-3xl px-3 py-1 rounded-full z-10"
      >
        ›
      </button>
    </div>
  );
}
