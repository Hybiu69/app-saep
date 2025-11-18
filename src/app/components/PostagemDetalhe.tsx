"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaTrashAlt, FaEdit } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import Navbar from "./navbar";
import { useFormularioPostagem } from "../hooks/useFormularioPostagem";

type Postagem = {
  id: string | number;
  nome: string;
  descricao: string;
  url: string;
  url1?: string;
  url2?: string;
  url3?: string;
  conteudo?: string;
  endereco?: string;
};

type Comentario = {
  id: string;
  text: string;
  rating: number;
  date: string;
};

export default function PostagemDetalhe({ postagem }: { postagem: Postagem | null }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [mainImage, setMainImage] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comentario[]>([]);
  const { handleEdit, handleDelete } = useFormularioPostagem();

  useEffect(() => {
    if (postagem?.url) {
      setMainImage(postagem.url);
    }
    if (postagem) {
      // Carregar comentários do localStorage
      const storedComments = localStorage.getItem(`comments-${postagem.id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    }
  }, [postagem]);

  if (!postagem) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Postagem não encontrada 😢
      </div>
    );
  }

  const thumbnails = [postagem.url, postagem.url1, postagem.url2, postagem.url3].filter(Boolean) as string[];

  const handleSendComment = () => {
    if (!comment || rating === 0) {
      alert("Por favor, preencha o comentário e a avaliação.");
      return;
    }

    const newComment: Comentario = {
      id: Date.now().toString(),
      text: comment,
      rating: rating,
      date: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${postagem.id}`, JSON.stringify(updatedComments));
    setComment("");
    setRating(0);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col justify-center items-center flex-1 px-6 md:px-16 py-12 mt-15">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 items-start justify-center">
          <div className="relative w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-md">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={postagem.nome}
                  fill
                  unoptimized
                  className="object-cover rounded-2xl transition-all duration-300"
                />
              ) : (
                <div className="flex justify-center items-center h-full bg-gray-100 text-gray-400">
                  Imagem não disponível
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="w-24 h-16 rounded-lg overflow-hidden shadow-sm cursor-pointer"
                  onClick={() => setMainImage(thumb)}
                >
                  <Image
                    src={thumb}
                    alt={`thumb-${index}`}
                    width={100}
                    height={80}
                    unoptimized
                    className={`object-cover w-full h-full hover:opacity-80 transition-all ${
                      mainImage === thumb ? "opacity-70" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-extralight text-[#172550] mb-1">
                  {postagem.nome}
                </h1>

                <button onClick={() => setLiked(!liked)} className="transition-all">
                  {liked ? (
                    <FaHeart className="text-[#2D95BB] text-2xl cursor-pointer transition-all" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-2xl cursor-pointer hover:text-[#2D95BB] transition-all" />
                  )}
                </button>
              </div>

              {postagem.endereco && (
                <p className="text-[#6D91A1] mb-3 text-1xl">{postagem.endereco}</p>
              )}

              <p className="text-[#172550] text-base leading-relaxed mb-6">
                {postagem.conteudo}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(postagem.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#2D95BB] text-white rounded-xl hover:bg-[#217b99] transition-all"
              >
                <FaEdit />
                Editar
              </button>

              <button
                onClick={() => handleDelete(postagem.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
              >
                <FaTrashAlt />
                Deletar
              </button>
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

              <div className="relative mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escreva aqui seu comentário"
                  className="w-full h-28 border border-gray-300 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D95BB]"
                />
                <button
                  onClick={handleSendComment}
                  className="absolute bottom-3 right-3 text-[#2D95BB] hover:text-[#217b99]"
                >
                  <AiOutlineSend size={20} />
                </button>
              </div>

              <div>
                <h2 className="text-gray-700 font-medium mb-2">Comentários:</h2>
                {comments.length === 0 && <p className="text-gray-400">Nenhum comentário ainda.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="border-b border-gray-200 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < c.rating ? "bg-[#2D95BB]" : "bg-gray-200"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <p className="text-gray-700">{c.text}</p>
                    <span className="text-gray-400 text-sm">{c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
