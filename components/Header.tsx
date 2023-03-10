import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TbWriting } from "react-icons/tb";

export default function Header() {
  return (
    <header className="flex p-4 max-w-7xl mx-auto justify-between items-center w-full  sm:px-4  px-2">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        <Link href="/" className="flex space-x-3 items-center px-2">
          <TbWriting className="w-8 h-8"></TbWriting>
          <h2 className="sm:text-2xl text-2xl font-bold ml-2 tracking-widest">
            einfach.
          </h2>
        </Link>
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        {/* <button className="mx-4">Sign Up</button> */}
      </motion.div>
    </header>
  );
}
