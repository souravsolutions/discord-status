import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import onlineImg from "../assets/online.png";
import offlineImg from "../assets/offline.png";
import { useDiscordStatus } from "../hooks/useDiscordStatus";

export default function StatusBadge() {
  const [isHovered, setIsHovered] = useState(false);
  const { isOnline } = useDiscordStatus("1241601451440996413");

  // Assistant-style friendly messages
  const message = isOnline
    ? "Senpai is currently Online ! ✨"
    : "Senpai is resting right now 🌙";

  return (
    <div
      className="fixed bottom-0 right-8 z-50 flex flex-col items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.5, rotate: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.8, rotate: -5 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              mass: 0.8,
            }}
            style={{ transformOrigin: "bottom right" }}
            className="absolute bottom-[95%] mb-4 right-16 text-[16px] font-medium pointer-events-none w-max max-w-[320px] leading-relaxed tracking-wide
              text-[#f4effa] flex flex-col gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3">
              {/* Little pulsing indicator dot for online/offline */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {isOnline && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 shadow-[0_0_10px_currentColor] ${isOnline ? 'bg-green-500 text-green-500' : 'bg-gray-500 text-gray-500'}`}></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9a8fa5] font-bold">
                System Status
              </span>
            </div>

            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-1 text-sm whitespace-normal break-words"
            >
              {message}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={isOnline ? onlineImg : offlineImg}
        alt={isOnline ? "Online Status" : "Offline Status"}
        className="w-48 h-auto object-contain cursor-default"
        whileHover={{
          scale: 1.05,
          filter: "drop-shadow(0 0 12px rgba(90, 83, 96, 0.6))",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.5 },
          x: { duration: 0.5, delay: 0.5 },
          default: { duration: 0.3, ease: "easeOut" }
        }}
      />
    </div>
  );
}
