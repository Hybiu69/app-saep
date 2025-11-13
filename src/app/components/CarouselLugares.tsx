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
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("likes_lugares");
    if (saved) {
      setLikes(JSON.parse(saved));
    } else {
      const initial = lugares.reduce((acc, obj) => {
        acc[obj.id] = 0;
        return acc;
      }, {} as { [key: string]: number });
      setLikes(initial);
    }
  }, [lugares]);

  useEffect(() => {
    localStorage.setItem("likes_lugares", JSON.stringify(likes));
  }, [likes]);

  if (!lugares || lugares.length === 0)
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum lugar cadastrado ainda.
      </div>
    );

  const total = lugares.length;

  // ✅ Função corrigida: evita duplicatas no "visible"
  const getVisible = () => {
    const items: Lugar[] = [];
    for (let i = 0; i < Math.min(4, total); i++) {
      const item = lugares[(index + i) % total];
      if (!items.some((x) => x.id === item.id)) items.push(item);
    }
    return items;
  };

  const visible = getVisible();

  const previous = () =>
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  const next = () => setIndex((prev) => (prev + 1) % total);

  const handleLike = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  };

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
            key={lugar.id} // ✅ Agora garantidamente único
            onClick={() => router.push(`/postagem/${lugar.id}`)}
            className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden relative hover:scale-[1.02] transition-transform"
          >
            <div className="h-48 bg-gray-200 relative">
              <img
                src={lugar.url}
                alt={lugar.nome}
                className="w-full h-full object-cover"
              />

              <button
                onClick={(e) => handleLike(lugar.id, e)}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 hover:scale-110 transition shadow-md"
              >
                <span
                  className="text-xl font-bold transition-colors duration-500"
                  style={{
                    color: likes[lugar.id] > 0 ? "#2D95BB" : "#9ca3af",
                  }}
                >
                  ♥
                </span>
                <span className="text-[#2D95BB] font-semibold text-sm">
                  {likes[lugar.id] || 0}
                </span>
              </button>
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