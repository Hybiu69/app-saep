'use client';

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { withAuth } from "../components/withAuth";

function Dashboard(){
    const router=useRouter();
    const [userName,setUserName]=useState('');
    useEffect(()=>{
        const name=localStorage.getItem('userName');
        if(name){
            setUserName(name);
        }
    },[]);
    const handleLogout=()=>{
        localStorage.removeItem('logged');
        localStorage.removeItem('userName');
        router.push('/');
    };
    return(
        <div style={{textAlign:'center',marginTop:'50px'}}>
            <h1>Dashboard</h1>
            {userName&&<p>Bem-vindo,{userName}!</p>}
            <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded cursor-pointer hover:bg-red-500 px-6 py-2 mt-5">
            Sair
            </button>
        </div>
    );
}
export default withAuth(Dashboard);