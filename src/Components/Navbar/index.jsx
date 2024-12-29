import logo from "/img/stizzo-letters.png";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { NavbarButton } from "./NavbarButton";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import "./styles.css";

import { InstagramLogo } from "../../Icons/InstagramLogo";
import { WhatsAppLogo } from "../../Icons/WhatsAppLogo";
import { TikTokLogo } from "../../Icons/TikTokLogo";
import { Link } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggle = (toggled) => {
    setMenuOpen(toggled);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={` ${
          isScrolled ? "backdrop-blur-2xl scrolled" : ""
        } fixed z-50 top-0 left-0 flex transition-all items-center justify-between w-screen h-[13vh] px-8 py-5 md:justify-center `}
      >
        <div className="flex items-center justify-between w-full mx-auto lg:w-[80vw] md:justify-center">
          <span className="md:hidden lg:hidden flex items-center justify-center w-full">
            <img src={logo} alt="logo" className="w-[150px] drop-shadow-xl" />
            {/*
          <Hamburger
              size={20}
              label="show menu"
              rounded
              onToggle={handleToggle}
            />
  */}
          </span>

          <div className="hidden lg:flex md:flex lg:w-[70%]  items-center justify-center gap-10">
            <div>
              <Link to="/productos">
                <NavbarButton content="Productos" />
              </Link>
            </div>

            <Link to="/">
              <motion.img
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="logo"
                className="w-[150px] "
              />
            </Link>

            <div>
              <a
                href="https://www.instagram.com/stizzoplanet_/"
                target="_blank"
              >
                <NavbarButton
                  content={<InstagramLogo width={24} height={24} />}
                />
              </a>
              <a href="https://wa.me/573248600843" target="_blank">
                <NavbarButton
                  content={<WhatsAppLogo width={24} height={24} />}
                />
              </a>
              <a
                href="https://www.tiktok.com/@stizzoplanet_?_t=8sbIE8KdmW0&_r=1"
                target="_blank"
              >
                <NavbarButton content={<TikTokLogo width={24} height={24} />} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className=" w-[80%] backdrop-blur-2xl rounded-md fixed top-[20%] left-5 flex items-center justify-center"
          >
            <a href="https://www.instagram.com/stizzoplanet_/" target="_blank">
              <NavbarButton
                content={<InstagramLogo width={24} height={24} />}
              />
            </a>
            <a href="https://wa.me/573248600843" target="_blank">
              <NavbarButton content={<WhatsAppLogo width={24} height={24} />} />
            </a>
            <a
              href="https://www.tiktok.com/@stizzoplanet_?_t=8sbIE8KdmW0&_r=1"
              target="_blank"
            >
              <NavbarButton content={<TikTokLogo width={24} height={24} />} />
            </a>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
