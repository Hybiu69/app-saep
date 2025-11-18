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
    url1: '',
    url2: '',
    url3: '',
    descricao: "",
    conteudo: "",
    categoria: ''
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      api
        .get(`/postagens/${id}`)
        .then((response) => setForm(response.data))
        .catch(() => {
          Swal.fire("Erro", "Postagem não encontrada", "error").then(() =>
            router.push("/homepage")
          );
        });
    }
  }, [id, isEditMode, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleCancel = () => {
    router.push("/homepage/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const method = isEditMode ? "put" : "post";
    const url = isEditMode ? `/postagens/${id}` : "/postagens/";
    const successMessage = `Postagem ${
      isEditMode ? "atualizada" : "cadastrada"
    } com sucesso!`;

    api[method](url, form)
      .then(() => Swal.fire("Sucesso", successMessage, "success"))
      .then(() => router.push("/homepage"))
      .catch((error) => {
        console.error("Falha ao salvar a postagem:", error);
        Swal.fire("Erro", "Não foi possível salvar a postagem.", "error");
      });
  };

  const handleEdit = (id: string | number) => {
    router.push(`/postagens/editar/${id}`);
  };

  const handleDelete = (id: string | number) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/postagens/${id}`)
          .then(() => {
            Swal.fire("Deletado!", "A postagem foi removida.", "success");
            router.push("/homepage");
          })
          .catch(() =>
            Swal.fire("Erro", "Não foi possível deletar a postagem.", "error")
          );
      }
    });
  };
  return {
    form,
    isEditMode,
    handleChange,
    handleCancel,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
}
