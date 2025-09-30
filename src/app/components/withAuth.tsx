'use clinet';

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";
import Swal from "sweetalert2";

export function withAuth<P extends object>(Component:ComponentType<P>){
    return function AuthenticatedComponent(props:P){
        const router=useRouter();

        const pathname=usePathname();

        const[isLoggedIn,setItsLoggedIn]=useState(false);

        useEffect(()=>{
            if(localStorage.getItem('logged')==='true'){
                setItsLoggedIn(true);
            }else{
                if(pathname!=='/'){
                    Swal.fire('Atenção','Você precisa estar logado!','warning')
                    .then(()=>router.push('/'));
                }
            }
        },[router,pathname]);

        if(!isLoggedIn){
            return null;
        }
        return <Component{...props}/>
    }
}