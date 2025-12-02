'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { PostagemForm } from '../types/PostagemFormulario';

export function useFormularioPostagem(id?: string) {
  const router = useRouter();
  const [form, setForm] = useState<PostagemForm>({
    nome: '',
    endereco: '',
    url: '',
    url1: '',
    url2: '',
    url3: '',
    descricao: '',
    conteudo: '',
    categoria: ''
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      api.get(`/postagens/${id}`)
        .then(response => setForm(response.data))
        .catch(() => {
          Swal.fire("Erro", "Postagem não encontrada", "error").then(() =>
            router.push("/homepage")
          );
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => router.push("/homepage/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditMode ? "put" : "post";
    const url = isEditMode ? `/postagens/${id}` : "/postagens/";

    try {
      await api[method](url, form);
      Swal.fire("Sucesso", `Postagem ${isEditMode ? 'atualizada' : 'cadastrada'} com sucesso!`, "success");
      router.push("/homepage");
    } catch (error) {
      Swal.fire("Erro", "Falha ao salvar a postagem.", "error");
    }
  };

  return { form, handleChange, handleCancel, handleSubmit, isEditMode };
}
