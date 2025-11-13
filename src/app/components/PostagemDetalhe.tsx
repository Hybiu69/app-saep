"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Navbar from "./navbar";

type Postagem = {
  id: string | number;
  nome: string;
  descricao: string;
  url: string;
  conteudo?: string;
  endereco?: string;
};

export default function PostagemDetalhe({ postagem }: { postagem: Postagem | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  if (!postagem) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Postagem não encontrada 😢
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col justify-center items-center flex-1 px-6 md:px-16 py-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-start justify-center">
          <div className="relative w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={postagem.url}
                alt={postagem.nome}
                fill
                unoptimized
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 h-16 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={postagem.url}
                    alt={`thumb-${i}`}
                    width={100}
                    height={80}
                    unoptimized
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-extralight text-[#172550] mb-2">
                  {postagem.nome}
                </h1>
                <FaRegHeart className="text-gray-400 text-2xl cursor-pointer hover:text-[#2D95BB]" />
              </div>

              {postagem.endereco && (
                <p className="text-[#6D91A1] text-sm mb-4">{postagem.endereco}</p>
              )}

              <p className="text-[#7798AA] text-base leading-relaxed mb-6">
                {postagem.conteudo}
              </p>

              <p className="text-[#7798AA] text-base leading-relaxed mb-6">
                {postagem.descricao}
              </p>
            </div>

            <hr className="my-4" />

            <div className="mt-2">
              <p className="text-gray-700 font-medium mb-2">Avalie aqui:</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-6 h-6 rounded-full ${
                      star <= rating ? "bg-[#2D95BB]" : "bg-gray-200"
                    } transition-all`}
                  ></button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escreva aqui seu comentário"
                  className="w-full h-28 border border-gray-300 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D95BB]"
                />
                <button
                  onClick={() => {
                    alert("Comentário enviado!");
                    setComment("");
                  }}
                  className="absolute bottom-3 right-3 text-[#2D95BB] hover:text-[#217b99]"
                >
                  <AiOutlineSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
