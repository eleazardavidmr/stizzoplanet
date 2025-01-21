//app
import logo from "/img/stizzo-letters.png";
import { NavbarButton } from "./NavbarButton";
import { ProductContext } from "../Context";
import "./styles.css";

//react
import { useState, useEffect, useContext } from "react";
import Hamburger from "hamburger-react";
import { Link, NavLink } from "react-router-dom";

//famer motion
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

//logos
import { InstagramLogo } from "../../Icons/InstagramLogo";
import { WhatsAppLogo } from "../../Icons/WhatsAppLogo";
import { TikTokLogo } from "../../Icons/TikTokLogo";

export function Navbar() {
  const context = useContext(ProductContext);
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
          isScrolled ? "backdrop-blur-[100px] scrolled" : ""
        } fixed z-50 top-0 left-0 flex items-center justify-between w-screen  h-[15%]  md:justify-center `}
      >
        <div className="flex items-center justify-between w-full mx-auto md:justify-center">
          <span className="md:hidden lg:hidden flex items-center justify-between w-[90%] mx-auto">
            <Link to="/">
              <img src={logo} alt="logo" className="w-[150px] drop-shadow-xl" />
            </Link>

            <div className="flex items-center justify-between gap">
              <span className="text-black">
                <button
                  type="button"
                  className="relative inline-flex items-center p-2 text-sm font-medium"
                  onClick={() => context.openOrderCheck()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                  <motion.div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {context.count}
                  </motion.div>
                </button>
              </span>
              <Hamburger
                size={20}
                label="show menu"
                rounded
                onToggle={handleToggle}
              />
            </div>
          </span>

          <div className="hidden lg:flex md:flex items-center justify-center gap-10">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => context.openOrderCheck()}
              type="button"
              className="relative inset-2 inline-flex items-center p-2 text-sm font-medium right-5 me-2 mb-2  hover:bg-primary text-white rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              <motion.div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {context.count}
              </motion.div>
            </motion.button>
            <div>
              <NavLink
                to="/favoritos"
                className={({ isActive }) => {
                  return isActive
                    ? "text-xs px-4 py-1.5 font-bold transition-all md:px-5 md:py-2.5 text-center text-[12px] border-2 bg-primary/60 border-primary/60 hover:bg-primary text-white rounded-full"
                    : "text-xs px-4 py-1.5 md:px-5 md:py-2.5 text-center text-[12px]  border-2 border-primary/60 hover:bg-primary text-white rounded-full";
                }}
              >
                Favoritos
              </NavLink>
            </div>

            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "w-[160px] transition-all"
                  : "transition-all w-[150px]";
              }}
              to="/"
            >
              <motion.img
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="logo"
                className="w-full"
              />
            </NavLink>

            <div className="flex items-center justify-center">
              <a
                href="https://www.instagram.com/stizzoplanet_/"
                target="_blank"
              >
                <NavbarButton
                  content={<InstagramLogo width={20} height={20} />}
                />
              </a>
              <a href="https://wa.me/573248600843" target="_blank">
                <NavbarButton
                  content={<WhatsAppLogo width={20} height={20} />}
                />
              </a>
              <a
                href="https://www.tiktok.com/@stizzoplanet_?_t=8sbIE8KdmW0&_r=1"
                target="_blank"
              >
                <NavbarButton content={<TikTokLogo width={20} height={20} />} />
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
            className="top-14 w-screen  h-96 z-[9999] backdrop-blur-2xl rounded-md fixed mx-auto flex items-center justify-center flex-col gap-2"
          >
            <NavLink
              to="/favoritos"
              className={({ isActive }) => {
                return isActive
                  ? "text-sm px-4 py-1.5 font-bold transition-all md:px-5 md:py-2.5 text-center text-[12px] border-2 bg-primary/60 border-primary/60 hover:bg-primary text-white rounded-full"
                  : "text-sm px-4 py-1.5 md:px-5 md:py-2.5 text-center text-[12px]  border-2 border-primary/60 hover:bg-primary text-white rounded-full";
              }}
            >
              Favoritos
            </NavLink>
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
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
