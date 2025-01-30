import logo from "/img/stizzo-shadowed-hd.png";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "./styles.css";
export function Hero() {
  return (
    <>
      <motion.section className="w-screen mt-10 h-max-screen lg:-mt-7 lg:h-[100vh] mb-6 text-center mx-auto flex-col gap-10 flex items-center justify-center md:flex-row md:justify-between md:w-[80vw] md:text-left">
        <motion.span className="flex flex-col w-full text-3xl font-semibold text-white">
          <span className="text-xl font-semibold text-white">Bienvenido a</span>

          <span className="text-4xl w-full md:text-5xl lg:text-6xl font-extrabold text-primary ">
            <Typewriter
              loop={5}
              cursor
              cursorStyle="_"
              deleteSpeed={50}
              delaySpeed={1000}
              words={["Stizzo Planet"]}
            />
          </span>
          <button className="hero-button py-2.5 px-5 text-sm font-bold mt-3 bg-secondary hidden md:flex w-fit">
            <a
              href="https://www.instagram.com/stizzoplanet_/"
              className="flex items-center justify-center gap-2"
            >
              Explorar
              <div className="arrow-wrapper">
                <div className="arrow" />
              </div>
            </a>
          </button>
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
