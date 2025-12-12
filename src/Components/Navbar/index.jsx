import "./styles.css";
import logo from "/img/stizzo-letters.png";
import { NavbarButton } from "./NavbarButton";
import { ProductContext } from "../Context";

// React & Router
import { useState, useContext, useEffect } from "react";
import Hamburger from "hamburger-react";
import { Link, NavLink, useLocation } from "react-router-dom";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// Icons
import { InstagramLogo } from "../../Icons/InstagramLogo";
import { WhatsAppLogo } from "../../Icons/WhatsAppLogo";
import { TikTokLogo } from "../../Icons/TikTokLogo";

export function Navbar() {
  const context = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú automáticamente cuando cambia la ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-5xl"
      >
        <div className="relative flex items-center justify-between px-4 py-2 bg-white/80 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg rounded-full">
          {/* --- LOGO (Izquierda) --- */}
          <Link to="/" className="flex-shrink-0 z-50">
            <img
              src={logo}
              alt="Stizzo Logo"
              className="w-28 md:w-32 object-contain drop-shadow-sm"
            />
          </Link>

          {/* --- DESKTOP MENU (Centro) --- */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                `text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10"
                }`
              }
            >
              Favoritos
            </NavLink>
          </div>

          {/* --- ACTIONS (Derecha) --- */}
          <div className="flex items-center gap-2 md:gap-4 z-50">
            {/* Iconos Sociales (Solo Desktop) */}
            <div className="hidden md:flex items-center gap-2 border-r border-gray-300 pr-4 mr-2">
              <SocialLink
                href="https://www.instagram.com/stizzoplanet_/"
                Icon={InstagramLogo}
              />
              <SocialLink
                href="https://wa.me/573248600843"
                Icon={WhatsAppLogo}
              />
              <SocialLink
                href="https://www.tiktok.com/@stizzoplanet_?_t=8sbIE8KdmW0&_r=1"
                Icon={TikTokLogo}
              />
            </div>

            {/* Carrito de Compras */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => context.openOrderCheck()}
              className="relative p-2.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-primary hover:text-white transition-colors text-gray-700 dark:text-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>

              {context.count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={context.count} // Reinicia animación al cambiar número
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-black"
                >
                  {context.count}
                </motion.span>
              )}
            </motion.button>

            {/* Hamburger (Solo Móvil) */}
            <div className="md:hidden text-gray-800 dark:text-white">
              <Hamburger
                toggled={menuOpen}
                toggle={setMenuOpen}
                size={20}
                rounded
                label="Menu"
              />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/90 dark:bg-black/90 flex flex-col items-center justify-center"
          >
            <motion.div
              className="flex flex-col items-center gap-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {/* Enlaces Móvil */}
              <MobileMenuItem>
                <NavLink
                  to="/favoritos"
                  className={({ isActive }) =>
                    `text-2xl font-semibold tracking-tight ${
                      isActive
                        ? "text-primary"
                        : "text-gray-800 dark:text-gray-200"
                    }`
                  }
                >
                  Favoritos
                </NavLink>
              </MobileMenuItem>

              <MobileMenuItem>
                <Link
                  to="/"
                  className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>
              </MobileMenuItem>

              {/* Separador */}
              <motion.div
                variants={itemVariants}
                className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full my-4"
              />

              {/* Redes Sociales Móvil */}
              <MobileMenuItem>
                <div className="flex gap-6">
                  <SocialLink
                    href="https://www.instagram.com/stizzoplanet_/"
                    Icon={InstagramLogo}
                    mobile
                  />
                  <SocialLink
                    href="https://wa.me/573248600843"
                    Icon={WhatsAppLogo}
                    mobile
                  />
                  <SocialLink
                    href="https://www.tiktok.com/@stizzoplanet_?_t=8sbIE8KdmW0&_r=1"
                    Icon={TikTokLogo}
                    mobile
                  />
                </div>
              </MobileMenuItem>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Componentes Auxiliares para limpiar el código ---

const SocialLink = ({ href, Icon, mobile }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`transition-transform hover:scale-110 ${
      mobile ? "p-2 bg-white dark:bg-white/10 rounded-full shadow-sm" : ""
    }`}
  >
    <NavbarButton
      content={<Icon width={mobile ? 28 : 20} height={mobile ? 28 : 20} />}
    />
  </a>
);

// Variantes de animación para items del menú
const itemVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0 },
};

const MobileMenuItem = ({ children }) => (
  <motion.div variants={itemVariants}>{children}</motion.div>
);
