"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarScroll() {
  const [solid, setSolid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (href: string) => {
   
    setTimeout(() => router.push(href), 150);
  };

  return (
    <motion.nav
      animate={{
        backgroundColor: solid
          ? "rgba(209, 223, 236, 0.45)"
          : "rgba(255,255,255,0)",
        backdropFilter: solid ? "blur(50px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full py-4 z-50"
    >
      <div className="flex items-center justify-evenly px-6">
   
        <motion.div
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/homepage" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={45} height={45} alt="logo" />
            <h1 className="text-[#3a4fac] text-4xl font-normal" style={{ fontFamily: "var(--font-logo)" }}>
              E.V.A
            </h1>
          </Link>
        </motion.div>

        <ul className="hidden md:flex gap-8 text-xl font-medium text-[#3a4fac]">
          {[
            { label: "Explorar", href: "/homepage#" },
            { label: "Avaliações", href: "/homepage#avaliacoes" },
            { label: "Categorias", href: "/homepage#categorias" },
          ].map((item) => (
            <motion.li
              key={item.href}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
            >
              <Link href={item.href} className="transition hover:text-blue-700">
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => handleNavigate("/")}
          className="px-4 py-2 rounded-lg bg-[#3a4fac] text-white hover:bg-blue-600 transition"
        >
          Entrar
        </motion.button>
      </div>
    </motion.nav>
  );
}
