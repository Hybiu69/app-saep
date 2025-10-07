'use client'
import NavBar from '@/app/components/Navbar';
import FormularioProduto from '../../../../components/FormularioProduto';
import {withAuth} from '@/app/components/withAuth';

function PaginaEdicao({params}:{params:{id:string}}){
    return(
        <section className='h-screen'>
            <NavBar texto={"Edição de Produto"}/>
            <FormularioProduto id={params.id}/>
        </section>
    );
}
export default withAuth(PaginaEdicao);