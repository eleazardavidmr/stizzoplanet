import logo from "/img/stizzo-shadowed-hd.png";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./styles.css";
export function Hero() {
  const StyledWrapper = styled.div`
    button {
      --primary-color: #1d63a1;
      --secondary-color: #fff;
      --hover-color: #111;
      --arrow-width: 10px;
      --arrow-stroke: 2px;
      box-sizing: border-box;
      border: 0;
      border-radius: 20px;
      display: flex;
      transition: 0.2s background;
      align-items: center;
      gap: 0.6rem;
    }

    button .arrow-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button .arrow {
      margin-top: 1px;
      width: var(--arrow-width);
      background: var(--primary-color);
      height: var(--arrow-stroke);
      position: relative;
      transition: 0.2s;
    }

    button .arrow::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      border: solid var(--secondary-color);
      border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
      display: inline-block;
      top: -3px;
      right: 3px;
      transition: 0.2s;
      padding: 3px;
      transform: rotate(-45deg);
    }

    button:hover {
      background-color: var(--hover-color);
    }

    button:hover .arrow {
      background: var(--secondary-color);
    }

    button:hover .arrow:before {
      right: 0;
    }
  `;
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
          <StyledWrapper>
            <button className="py-2.5 px-5 text-sm font-bold mt-3 bg-secondary">
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
          </StyledWrapper>
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
