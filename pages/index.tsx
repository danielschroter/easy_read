import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  console.log("Streamed response: ", generatedBios);

  const prompt = `Übersetze den Text in Leichte Sprache. Mache kurze Sätze und verwende einfache Worte. Text: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <main className="bg-[rgb(34,34,34)] text-white min-h-screen ">
      {/* <div className="max-w-5xl max-auto"> */}
      <Head>
        <title>Einfach.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <section id="hero">
        <Hero />
      </section>

      <Footer />
      {/* </div> */}
    </main>
  );
};

export default Home;
