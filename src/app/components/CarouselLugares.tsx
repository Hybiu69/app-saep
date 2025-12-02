"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Lugar = {
  id: string | number;
  nome: string;
  descricao: string;
  url: string;
};

export default function CarouselLugares({ lugares }: { lugares: Lugar[] }) {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [filteredLugares, setFilteredLugares] = useState<Lugar[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedLikes = localStorage.getItem('likes'); 
    if (storedLikes) {
      try {
        const parsedLikes = JSON.parse(storedLikes);
        setLikes(parsedLikes);
        const filtered = lugares
          .filter((lugar) => parsedLikes[lugar.id] && parsedLikes[lugar.id] > 0)
          .sort((a, b) => parsedLikes[a.id] - parsedLikes[b.id]); 
        setFilteredLugares(filtered);
      } catch (error) {
        console.error('Erro ao carregar likes do localStorage:', error);
        setFilteredLugares([]);
      }
    } else {
      setFilteredLugares([]);
    }
  }, [lugares]);

  const total = filteredLugares.length;

  const getVisible = () => {
    const items: Lugar[] = [];
    for (let i = 0; i < Math.min(4, total); i++) {
      const item = filteredLugares[(index + i) % total];
      if (!items.some((x) => x.id === item.id)) items.push(item);
    }
    return items;
  };

  const visible = getVisible();

  const previous = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const next = () => setIndex((prev) => (prev + 1) % total);

  if (total === 0) {
    return null;
  }

  return (
    <div className="relative w-full flex justify-center py-10">
      <button
        onClick={previous}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-200 text-black text-3xl px-3 py-1 rounded-full z-10"
      >
        ‹
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] max-w-7xl">
        {visible.map((lugar) => (
          <div
            key={lugar.id}
            onClick={() => router.push(`/postagem/${lugar.id}`)}
            className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden relative hover:scale-[1.02] transition-transform"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={lugar.url}
                alt={lugar.nome}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                <span className="text-xl font-bold text-[#2D95BB]">♥</span>
                <span className="text-[#2D95BB] font-semibold text-sm">
                  {likes[lugar.id]}
                </span>
              </div>
            </div>

            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{lugar.nome}</h2>
              <p className="text-gray-600 text-sm mt-1">{lugar.descricao}</p>
            </div>
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
