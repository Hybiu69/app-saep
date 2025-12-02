"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Postagem } from "../types/postagem";

type Props = {
  postagens?: Postagem[];
};

export default function Lugares({ postagens = [] }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");

  const categorias = [
    { id: "todas", label: "Lugares" },
    { id: "natureza", label: "Natureza e parques" },
    { id: "cultura", label: "Cultura" },
    { id: "gastronomia", label: "Gastronomia" },
    { id: "patrimonio", label: "Patrimônio histórico" },
  ];

  const postagensFIltradas =
    categoriaAtiva === "todas"
      ? postagens
      : postagens.filter(
          (p) =>
            p.categoria &&
            p.categoria.toLowerCase() === categoriaAtiva.toLowerCase()
        );

  return (
    <div className="w-full bg-white flex flex-col items-center p-15">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#172550] mb-6">
        Lugares
      </h2>

      <div className="flex gap-12 text-lg text-[#31437A] font-medium border-b border-gray-500 pb-4">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaAtiva(cat.id)}
            className={`pb-2 transition ${
              categoriaAtiva === cat.id
                ? "border-b-2 border-[#31437A] font-semibold"
                : "hover:border-b-2 hover:border-[#31437A]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full px-10">
        {postagensFIltradas.length > 0 ? (
          postagensFIltradas.map((post) => (
            <Link
  key={post.id}
  href={`/postagem/${post.id}`}
  className="
    group 
    w-full 
    bg-white 
    rounded-3xl 
    shadow-[0_4px_20px_rgba(0,0,0,0.08)]
    hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
    transition-all 
    duration-300 
    overflow-hidden 
    border border-gray-200
  "
>
  <div className="relative w-full h-48 overflow-hidden">
    <img
      src={post.url || "/images/default.jpg"}
      alt={post.nome}
      className="
        w-full 
        h-full 
        object-cover 
        transition-transform 
        duration-500 
        group-hover:scale-110
      "
    />

    {/* overlay escuro suave */}
    <div
      className="
        absolute inset-0 
        bg-black/10 
        opacity-0 
        group-hover:opacity-40 
        transition-opacity
      "
    ></div>
  </div>

  <div className="p-5">
    <h3 className="text-xl font-semibold text-[#1F2A41] group-hover:text-[#31437A] transition-colors">
      {post.nome}
    </h3>

    <p className="text-[#4F5A71] mt-2 text-sm leading-relaxed line-clamp-3">
      {post.descricao}
    </p>

    {post.categoria && (
      <span className="
        inline-block 
        mt-4 
        px-3 
        py-1 
        text-xs 
        font-medium 
        rounded-full 
        bg-[#e5e7eb] 
        text-[#31437A]
        group-hover:bg-[#d9dce2]
        transition
      ">
        {post.categoria}
      </span>
    )}
  </div>
</Link>

          ))
        ) : (
          <div className="w-full text-center py-12 text-gray-500">
            Nenhuma postagem encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
