import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { VibeType } from "./DropDown";
import LoadingDots from "./LoadingDots";
import ResizablePanel from "./ResizablePanel";
import Image from "next/image";

type Props = {};

export default function Hero({}: Props) {
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
    <div className="flex w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 w-64 h-64 bg-indigo-400 rounded-full -left-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob"></div>
        <div className="absolute top-0 rounded-full w-72 h-72 bg-pink-300 -right-4 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute rounded-full w-72 h-72 bg-emerald-300 -bottom-8 left-20 filter blur-3xl opacity-20 sm:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="relative space-y-4">
          <div className="flex flex-auto flex-col items-center">
            <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold">
              Übersetze deinen Text in Leichte Sprache!
            </h1>
            <p className="text-slate-500 mt-5">
              14.118 Texte bereits übersetzt.
            </p>
            <div className="max-w-xl w-full">
              <div className="flex mt-10 items-center space-x-3">
                <div className="text-white bg-orange-700 rounded-full p-2">
                  1
                </div>
                <p className="text-left font-medium">
                  Kopiere deinen Text{" "}
                  <span className="text-slate-500">
                    (oder schreibe ein paar Zeilen)
                  </span>
                  .
                </p>
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-md placeholder:text-gray-200/50 text-gray-100 border-gray-400 bg-gray-700/40 backdrop-blur-xl shadow-sm  focus:border-white focus:ring-0 my-5"
                placeholder={"Hier steht dein Text in komplizierter Sprache"}
              />

              {!loading && (
                <button
                  className="bg-orange-700/70 backdrop-blur-xl rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-orange-700/80 w-full"
                  onClick={(e) => generateBio(e)}
                >
                  Text übersetzen &rarr;
                </button>
              )}
              {loading && (
                <button
                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                  disabled
                >
                  <LoadingDots color="white" style="large" />
                </button>
              )}
            </div>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
            <ResizablePanel>
              <AnimatePresence mode="wait">
                <motion.div className="space-y-10 my-10">
                  {generatedBios && (
                    <>
                      <div>
                        <h2 className="sm:text-4xl text-3xl font-bold mx-auto">
                          Dein Text in leichter Sprache
                        </h2>
                      </div>
                      <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                        {generatedBios.split("2.").map((generatedBio) => {
                          return (
                            <div
                              className="bg-gray-700/40 backdrop-blur-xl rounded-xl shadow-md p-4 hover:bg-gray-700/60 transition cursor-copy border"
                              onClick={() => {
                                navigator.clipboard.writeText(generatedBio);
                                toast("Text in Zwischenablage kopiert", {
                                  icon: "✂️",
                                });
                              }}
                              key={generatedBio}
                            >
                              <p>{generatedBio}</p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </ResizablePanel>
          </div>
        </div>
      </div>
    </div>
  );
}
