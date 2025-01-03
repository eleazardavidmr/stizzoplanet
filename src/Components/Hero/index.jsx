import cerezas from "/img/hero-image.png";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
export function Hero() {
  //className="underline underline-offset-3 decoration-8  dark:decoration-primary text-4xl font-extrabold text-primary-light dark:text-primary md:text-4xl lg:text-6xl "
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-screen h-[90vh] text-center mx-auto flex-col gap-10 flex items-center  justify-center md:flex-row md:justify-between mt-[13vh] md:w-[80vw] md:text-left"
      >
        <motion.span className="flex flex-col md:text-3xl w-full text-3xl font-semibold text-white">
          <span>
            <span>Bienvenido a</span>
          </span>
          <span className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
            <Typewriter
              loop={5}
              cursor
              cursorStyle="_"
              deleteSpeed={50}
              delaySpeed={1000}
              words={["Stizzo Planet"]}
            />
          </span>
        </motion.span>

        <motion.img
          src={cerezas}
          alt="logo"
          className="mx-auto w-max-[70%] md:w-[70%]"
        />
      </motion.section>
    </>
  );
}
