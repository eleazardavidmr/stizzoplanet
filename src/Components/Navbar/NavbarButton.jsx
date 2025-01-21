import { motion } from "framer-motion";
export function NavbarButton({ content }) {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="text-xs px-5 ml-1 py-2.5 text-center border-2 border-primary/60 hover:bg-primary text-white rounded-full"
    >
      {content}
    </motion.button>
  );
}
