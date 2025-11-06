"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
  initial={{ scale: 1.1, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  transition={{ duration: 0.35 }}
>
      {children}
    </motion.div>
  );
}
