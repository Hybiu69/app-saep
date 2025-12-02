'use client';

import React from 'react';
import { usePostagens } from '../hooks/usePostagem';
import { useRouter } from 'next/navigation';

export default function PagePostagens() {
  const { postagens, handleDelete, handleAdd, handleEdit } = usePostagens();
  const router = useRouter();

  return (
    <main style={{ padding: 20 }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0 }}>Todas as Postagens</h1>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={handleAdd}>Nova Postagem</button>
          <button onClick={() => router.push('/homepage')}>Voltar para Home</button>
        </div>
      </header>

      {postagens.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
          {postagens.map((p) => (
            <li
              key={p.id}
              style={{
                border: '1px solid #ddd',
                padding: 16,
                borderRadius: 10,
                background: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h2 style={{ margin: 0 }}>{p.nome}</h2>

              <p style={{ margin: 0 }}>
                <strong>Endereço:</strong> {p.endereco}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Categoria:</strong> {p.categoria}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Descrição:</strong> {p.descricao}
              </p>

              <p style={{ margin: 0 }}>
                <strong>Conteúdo:</strong> {p.conteudo}
              </p>

              <div style={{ marginTop: 10 }}>
                {[p.url, p.url1, p.url2, p.url3]
                  .filter((u) => u && u.trim() !== '')
                  .map((link, index) => (
                    <div key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        🔗 Link {index + 1}
                      </a>
                    </div>
                  ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <button onClick={() => handleEdit(p.id)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
