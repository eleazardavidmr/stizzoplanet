import logo from "/img/stizzo-shadowed-hd.png";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
export function Hero() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-screen h-max-screen lg:h-[100vh] lg:mt-[13vh] mb-6 text-center mx-auto flex-col gap-10 flex items-center justify-center md:flex-row md:justify-between mt-[18vh] md:w-[80vw] md:text-left"
      >
        <motion.span className="flex flex-col w-full text-3xl font-semibold text-white">
          <span className="text-xl font-semibold text-white">Bienvenido a</span>

          <span className="text-4xl w-full md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
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
          src={logo}
          alt="logo"
          className="w-[90%] mx-auto md:w-[50%] lg:w-[40%]"
        />
      </motion.section>
    </>
  );
}
