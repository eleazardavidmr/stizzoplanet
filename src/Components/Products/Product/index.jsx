import PropTypes from "prop-types";
import { ProductContext } from "../../Context";
import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

// Iconos extraídos para limpiar el JSX
const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);

const CartPlusIcon = () => (
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
    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M12.5 17h-6.5v-14h-2" />
    <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
  </svg>
);

const CartCheckIcon = () => (
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
    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M11.5 17h-5.5v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
    <path d="M15 19l2 2l4 -4" />
  </svg>
);

export function Product({ data }) {
  const context = useContext(ProductContext);

  // --- GESTIÓN DE ALERTAS UNIFICADA ---
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };
  // ------------------------------------

  // Animations
  const cardHover = {
    hover: { y: -5, boxShadow: "0px 10px 30px -10px rgba(0,0,0,0.5)" },
  };

  const buttonTap = { scale: 0.9 };

  // Logic
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Evitar abrir el detalle si se clickea el corazón
    const isFavorite = context.favorites.some((p) => p.id === data.id);

    if (isFavorite) {
      context.removeFromFavorites(data.id);
      showToast("Eliminado de favoritos", "error");
    } else {
      context.addToFavorites(data);
      showToast("Agregado a favoritos", "primary");
    }
  };

  const toggleCart = (e) => {
    e.stopPropagation();
    const isInCart = context.cartProducts.some((p) => p.id === data.id);

    if (isInCart) {
      const filtered = context.cartProducts.filter((p) => p.id !== data.id);
      context.setCartProducts(filtered);
      context.setCount(context.count - 1);
      showToast("Eliminado del carrito", "error");
    } else {
      context.setCount(context.count + 1);
      context.setCartProducts([...context.cartProducts, data]);
      showToast("Agregado al carrito", "secondary");
    }
  };

  const openDetail = () => {
    context.setProductToShow(data);
    context.openProductDetail();
  };

  // Render Helpers
  const renderCategoryPill = (cat) => {
    const isLady = cat.toLowerCase() === "dama";
    return (
      <span
        key={cat}
        className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md text-white shadow-sm ${
          isLady ? "bg-primary" : "bg-secondary"
        }`}
      >
        {cat}
      </span>
    );
  };

  return (
    <>
      <motion.article
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        className="group relative flex flex-col w-[400px] bg-product-background rounded-2xl overflow-hidden border border-white/5 transition-colors duration-300 shadow-lg mx-auto"
      >
        {/* --- IMAGEN Y FAVORITO --- */}
        <div
          onClick={openDetail}
          className="relative w-full aspect-[4/5] overflow-hidden bg-black/20 cursor-pointer"
        >
          <img
            src={data.img[0]}
            alt={data.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Botón Favorito Flotante */}
          <motion.button
            whileTap={buttonTap}
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-lg backdrop-blur-md border transition-all ${
              context.favorites.some((p) => p.id === data.id)
                ? "bg-primary text-white border-primary"
                : "bg-white/10 text-white border-white/20 hover:bg-primary hover:border-primary"
            }`}
          >
            <HeartIcon
              filled={context.favorites.some((p) => p.id === data.id)}
            />
          </motion.button>
        </div>

        {/* --- INFO DEL PRODUCTO --- */}
        <div className="flex flex-col p-4 gap-3">
          {/* Categorías */}
          <div className="flex flex-wrap gap-1">
            {Array.isArray(data.category)
              ? data.category.map(renderCategoryPill)
              : renderCategoryPill(data.category)}
          </div>

          {/* Título y Precio */}
          <div className="flex flex-col gap-1">
            <h3
              onClick={openDetail}
              className="text-white font-medium text-lg leading-tight truncate cursor-pointer hover:text-primary-light transition-colors"
              title={data.title}
            >
              {data.title}
            </h3>
            <span className="text-2xl font-extrabold text-primary-light">
              ${data.price}
            </span>
          </div>

          {/* --- ACCIONES (GRID) --- */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 mt-2 items-center">
            {/* 1. Botón Más Info (Principal) */}
            <motion.button
              whileTap={buttonTap}
              onClick={openDetail}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/20 hover:bg-white/5 transition-colors"
            >
              Ver Detalle
            </motion.button>

            {/* 2. Botón WhatsApp */}
            <motion.a
              whileTap={buttonTap}
              href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${data.title}`}
              target="_blank"
              className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md flex items-center justify-center"
              title="Comprar por WhatsApp"
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
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
              </svg>
            </motion.a>

            {/* 3. Botón Carrito */}
            <motion.button
              whileTap={buttonTap}
              onClick={toggleCart}
              className={`p-2 rounded-xl shadow-md flex items-center justify-center transition-colors ${
                context.cartProducts.some((p) => p.id === data.id)
                  ? "bg-green-700 text-white border border-green-500" // Estado activo
                  : "bg-secondary text-white hover:bg-blue-600" // Estado normal (Azul)
              }`}
              title="Añadir al carrito"
            >
              {context.cartProducts.some((p) => p.id === data.id) ? (
                <CartCheckIcon />
              ) : (
                <CartPlusIcon />
              )}
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* --- TOAST NOTIFICATION (Posicionada relativa o fija) --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-4 right-4 z-[999] flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border backdrop-blur-md ${
              toast.type === "error"
                ? "bg-red-900/90 border-red-500 text-white"
                : toast.type === "secondary"
                ? "bg-secondary/90 border-blue-400 text-white"
                : "bg-primary/90 border-primary-light text-white"
            }`}
          >
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
