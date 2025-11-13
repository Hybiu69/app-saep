"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import api from "../lib/api";
import { PostagemForm } from "../types/PostagemFormulario";

export function useFormularioPostagem(id?: string) {
  const router = useRouter();
  const [form, setForm] = useState<PostagemForm>({
    nome: "",
    endereco: "",
    url: "",
    descricao: "",
    conteudo: "",
  });
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      api
        .get(`/postagens/${id}`)
        .then((response) => setForm(response.data))
        .catch(() => {
          Swal.fire("Erro", "Postagem não encontrada", "error").then(() =>
            router.push("/postagens/")
          );
        });
    }
  }, [id, isEditMode, router]);

  return {
    form,
    isEditMode,
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((currentForm) => ({ ...currentForm, [name]: value }));
    },
    handleCancel: () => {
      router.push("/homepage/");
    },

    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      const method = isEditMode ? "put" : "post";
      const url = isEditMode ? `/postagens/${id}` : "/postagens/";
      const successMessage = `Postagem ${
        isEditMode ? "atualizada" : "cadastrada"
      } com sucesso!`;

      api[method](url,form)
        .then(() => {
          return Swal.fire("Sucesso", successMessage, "success");
        })
        .then(() => {
          router.push("/homepage");
        })
        .catch((error) => {
          console.error("Falha ao salvar a postagem:", error);
          Swal.fire("Erro", "Não foi possível salvar a postagem.", "error");
        });
    },
  };
}
