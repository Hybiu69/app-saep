'use client'
import FormularioPostagem from "@/app/components/FormularioPostagem";

import { withAuth } from "@/app/components/withAuth";

function PaginaCadastro() {
  return (
    <section>
      <FormularioPostagem/>
    </section>
  );
}

export default withAuth(PaginaCadastro);