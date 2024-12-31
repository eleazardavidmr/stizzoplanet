import { motion } from "framer-motion";
export function NavbarButton({ content }) {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="text-sm px-5 py-2.5 text-center me-2 mb-2 border-2 border-primary/60 hover:bg-primary text-white rounded-full"
    >
      {content}
    </motion.button>
  );
}
