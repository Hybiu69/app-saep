'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { Postagem } from '../types/postagem';
import { useRouter } from 'next/navigation';  

export function usePostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const router = useRouter();                  
  const fetchPostagens = async () => {
    const response = await api.get<Postagem[]>('/postagens/');
    setPostagens(response.data);
  };

  useEffect(() => {
    fetchPostagens();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/postagens/${id}`);
        setPostagens((postagensAtuais) =>
          postagensAtuais.filter((p) => p.id !== id)
        );
        Swal.fire('Excluído!', 'A postagem foi removida.', 'success');
      } catch (error) {
        Swal.fire('Erro', 'Falha ao excluir a postagem.', 'error');
      }
    }
  };

  return {
    postagens,
    fetchPostagens,
    handleDelete,
    
    handleAdd: () => router.push('/postagens/cadastro'),
    handleEdit: (id: number) => router.push(`/postagens/editar/${id}`)
  };
}
