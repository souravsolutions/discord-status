import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import onlineImg from "../assets/online.png";
import offlineImg from "../assets/offline.png";
import mainImg from "../assets/main.png";
import { useDiscordStatus } from "../hooks/useDiscordStatus";

export default function StatusBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOnline } = useDiscordStatus("1241601451440996413");

  const message = isOnline
    ? "Wanna eat ~ Senpai is online Writing Some Code "
    : "Senpai is offline... resting He is Tired 🌙";

  return (
    <>
      {/* Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(5,5,10,0.5)",
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-0"
            >
              {/* Anime-style speech text ABOVE the character — no bg, no border */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.3 }}
                className="flex flex-col items-center gap-1 mb-2"
              >
                {/* Status dot inline */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    {isOnline && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] ${
                      isOnline ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                {/* The speech line */}
                <p
                  className="text-[18px] font-semibold text-center leading-snug select-none"
                  style={{
                    color: "#252029",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.01em",
                  }}
                >
                  {message}
                </p>
              </motion.div>

              {/* Status image — subtle glow only */}
              <motion.img
                src={isOnline ? onlineImg : offlineImg}
                alt={isOnline ? "Online" : "Offline"}
                className="w-72 h-auto object-contain"
                style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))" }}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.28 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right character — plain, no bg/border, bigger */}
      <div className="fixed bottom-0 right-2 md:right-6 z-40 flex items-end">
        <motion.img
          src={mainImg}
          alt="Senpai character"
          className="w-44 md:w-64 object-contain object-bottom cursor-pointer origin-bottom-right"
          style={{ maxHeight: "90vh" }}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.5 },
            x: { duration: 0.5, delay: 0.5 },
            default: { duration: 0.25, ease: "easeOut" },
          }}
          onClick={() => setIsOpen(true)}
        />
      </div>
    </>
  );
}
