"use client";

import PostagemDetalhe from "@/app/components/PostagemDetalhe";
import { usePostagens } from "@/app/hooks/usePostagem";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";


export default function PaginaPostagem() {
  const { id } = useParams();
  const { postagens } = usePostagens();

  const postagem = useMemo(
    () => postagens.find((p: any) => String(p.id) === String(id)) || null,
    [postagens, id]
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <PostagemDetalhe postagem={postagem} />
    </main>
  );
}
