"use client";

import React from "react";
import FormularioPostagem from "@/app/components/FormularioPostagem";
import { withAuth } from "@/app/components/withAuth";

function PaginaEdicao({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <section className="h-screen">
      <FormularioPostagem id={id} />
    </section>
  );
}

export default withAuth(PaginaEdicao);
