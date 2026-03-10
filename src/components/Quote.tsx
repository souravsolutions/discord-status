import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";

export default function Quote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative pt-10 pb-4 w-full flex flex-col items-center justify-center group "
    >
      <div className="relative flex justify-center max-w-[420px] w-full px-10 ">
        {/* Top-left quote icon */}
        <div className="absolute top-[-10px] left-0 text-[#252029] opacity-30 group-hover:text-[#5a5360]/30 transition-colors duration-500">
          <QuoteIcon size={20} className="fill-current " />
        </div>

        <p
          className="text-[#9a8fa5] text-[16px] md:text-[19px] leading-[1.6] md:leading-[1.7] text-center transition-colors duration-500 relative z-10 opacity-30"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.03em",
          }}
        >
          A man dies when people forget him!
        </p>

        {/* Bottom-right quote icon */}
        <div className="absolute bottom-[-10px] right-0 text-[#252029] opacity-30 group-hover:text-[#5a5360]/30 transition-colors duration-500 rotate-180">
          <QuoteIcon size={20} className="fill-current" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 relative z-10">
        <div className="h-[1px] w-8 bg-[#252029]"></div>
        <span
          className="text-[11px] uppercase tracking-[0.3em] text-[#4a4450] font-bold group-hover:text-[#5a5360] group-hover:scale-110 transition-all duration-300 opacity-25"
          style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
        >
          Dr. Hiriluk
        </span>
        <div className="h-[1px] w-8 bg-[#252029]"></div>
      </div>
    </motion.div>
  );
}
