"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub } from "react-icons/fa6";

interface LinkPreviewProps {
  children: React.ReactNode;
  image?: string;
  url?: string;
  title?: string;
  type: "github" | "deploy";
}

export default function LinkPreview({
  children,
  image,
  url,
  title,
  type,
}: LinkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-[120%] left-1/2 bg-white p-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            z-[100] w-80 h-[200px] pointer-events-none overflow-hidden flex flex-col justify-center
            after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-2 after:border-8 after:border-solid
            after:border-t-white after:border-x-transparent after:border-b-transparent"
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
          >
            {type === "deploy" ? (
              url ? (
                <>
                  {isLoading && (
                    <div
                      className="flex flex-col items-center justify-center h-full w-full text-white text-sm bg-cover bg-center text-center gap-2"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image})`,
                      }}
                    >
                      {title && (
                        <h4 className="m-0 text-lg font-bold drop-shadow-md">
                          {title}
                        </h4>
                      )}
                      <p>Loading preview...</p>
                    </div>
                  )}
                  <iframe
                    src={url}
                    title="Project Preview"
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    style={{ display: isLoading ? "none" : "block" }}
                    className="w-full h-full border-0 rounded-lg bg-white"
                  />
                </>
              ) : image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={image}
                  alt="Project Preview"
                  className="w-full h-auto rounded-lg block object-cover border border-gray-200"
                />
              ) : null
            ) : (
              <div className="bg-[#1a1a1a] text-white p-6 rounded-lg flex flex-col items-center gap-4 text-center">
                <FaGithub className="text-5xl" />
                <div>
                  <span className="font-bold text-lg">View Repository</span>
                  <p className="text-sm opacity-80 m-0">
                    Check out the source code
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
