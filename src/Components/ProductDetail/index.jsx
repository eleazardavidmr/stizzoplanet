import "./styles.css";
import { ProductContext } from "../Context";
import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";
import InfoIcon from "../../Icons/InfoIcon";

// Iconos SVG como componentes pequeños para limpiar el código principal
const HeartFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="icon icon-tabler icons-tabler-filled icon-tabler-heart"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
  </svg>
);

const HeartOutline = () => (
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
    className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);

const CartPlus = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M12.5 17h-6.5v-14h-2" />
    <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
  </svg>
);

const CartCheck = () => (
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
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M11.5 17h-5.5v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
    <path d="M15 19l2 2l4 -4" />
  </svg>
);

export function ProductDetail() {
  const context = useContext(ProductContext);

  // Estados de alertas unificados
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Limpiar timeout si el componente se desmonta
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => setToast({ ...toast, show: false }), 4000);
    }
    return () => clearTimeout(timer);
  }, [toast.show]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]);
    showToast(`${productToAdd.title} agregado al carrito`, "success");
  };

  const addProductToFavorites = (productToAdd) => {
    context.setFavorites([...context.favorites, productToAdd]);
    showToast(`${productToAdd.title} agregado a favoritos`, "info");
  };

  const deleteFromFavorites = (productToDelete) => {
    const filteredFavorites = context.favorites.filter(
      (product) => product.id !== productToDelete.id
    );
    context.setFavorites(filteredFavorites);
    showToast(`${productToDelete.title} eliminado de favoritos`, "error");
  };

  const renderBadge = () => {
    if (context.productToShow.new) {
      // Usamos el color secundario para el badge para que resalte pero combine
      return (
        <span className="absolute top-0 right-0 m-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          Nuevo
        </span>
      );
    }
    return null;
  };

  const renderCartButton = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    // Estilo base del botón
    const btnClass =
      "flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold transition-all shadow-md";

    if (isInCart) {
      return (
        <button
          type="button"
          disabled
          className={`${btnClass} bg-green-700/50 text-white/50 cursor-default border border-green-700`}
        >
          <CartCheck /> En el carrito
        </button>
      );
    } else {
      return (
        <button
          onClick={() => addProductsToCart(context.productToShow)}
          type="button"
          // Usamos el color Secondary (Azul) para la acción de añadir al carrito
          className={`${btnClass} bg-secondary hover:bg-blue-600 text-white focus:ring-4 focus:ring-blue-900`}
        >
          <CartPlus /> Agregar al Carrito
        </button>
      );
    }
  };

  const renderProductImage = (product) => {
    if (product.img.length === 1) {
      return (
        <motion.img
          layoutId={`product-image-${product.id}`}
          className="w-full h-full object-contain max-h-[400px] rounded-xl bg-black/20 p-4"
          src={product.img[0]}
          alt={product.title}
        />
      );
    } else if (product.img.length > 1) {
      return (
        <div className="w-full rounded-xl overflow-hidden bg-black/20">
          <Carousel className="">
            {product.img.map((image, index) => (
              <img
                key={index}
                className="w-full h-full object-contain"
                src={image}
                alt={product.title}
              />
            ))}
          </Carousel>
        </div>
      );
    }
  };

  // Botón de Favoritos (Corazón)
  const renderLikeButton = (id) => {
    const isInFavorites = context.favorites.some(
      (product) => product.id === id
    );

    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        onClick={() =>
          isInFavorites
            ? deleteFromFavorites(context.productToShow)
            : addProductToFavorites(context.productToShow)
        }
        // Usamos el Primary (Rojo) para el corazón
        className={`p-3 rounded-full shadow-lg transition-colors border ${
          isInFavorites
            ? "bg-primary text-white border-primary"
            : "bg-transparent text-primary border-primary/40 hover:bg-primary/10"
        }`}
      >
        {isInFavorites ? <HeartFilled /> : <HeartOutline />}
      </motion.button>
    );
  };

  if (!context.isProductDetailOpen) return null;

  return (
    <AnimatePresence>
      {context.isProductDetailOpen && (
        <>
          {/* BACKDROP (Fondo Oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => context.closeProductDetail()}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          {/* MODAL PRINCIPAL */}
          <motion.aside
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // Colores aplicados: bg-product-background y texto blanco
            className="fixed inset-0 m-auto z-[99] w-[95vw] md:w-[85vw] lg:w-[70vw] h-fit max-h-[90vh] overflow-y-auto bg-product-background text-white rounded-2xl shadow-2xl border border-white/10 flex flex-col"
          >
            {/* HEADER DEL MODAL */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-product-background/95 backdrop-blur-md border-b border-white/5">
              <div className="flex items-center gap-2 text-primary-light">
                <InfoIcon />
                <h1 className="font-bold text-lg tracking-wide uppercase text-white">
                  Detalle de Producto
                </h1>
              </div>

              <button
                onClick={() => context.closeProductDetail()}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
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
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* CONTENIDO (GRID LAYOUT) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* COLUMNA IZQUIERDA: IMAGEN */}
              <div className="relative w-full flex items-center justify-center">
                {renderBadge()}
                {renderProductImage(context.productToShow)}
              </div>

              {/* COLUMNA DERECHA: INFO */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-white">
                    {context.productToShow.title}
                  </h2>
                  <p className="text-4xl font-extrabold text-primary-light">
                    ${context.productToShow.price}
                  </p>
                </div>

                <div className="prose prose-invert">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {context.productToShow.desc}
                  </p>
                </div>

                {/* ACCIONES */}
                <div className="flex flex-col gap-4 mt-4">
                  {/* Fila de botones principales */}
                  <div className="flex items-center gap-3">
                    {renderCartButton(context.productToShow.id)}
                    {renderLikeButton(context.productToShow.id)}
                  </div>

                  {/* Botón WhatsApp (Separado para destacar) */}
                  <a
                    href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${context.productToShow.title}`}
                    target="_blank"
                    rel="noreferrer"
                    // Color verde de WhatsApp pero con estilo consistente
                    className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md transition-all focus:ring-4 focus:ring-green-900"
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                    Comprar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* TOAST / ALERTAS (Componente Unificado) */}
          <AnimatePresence>
            {toast.show && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                onClick={() => {
                  if (toast.type === "success") context.openOrderCheck();
                }}
                className={`fixed bottom-5 right-5 z-[100] cursor-pointer flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md ${
                  toast.type === "error"
                    ? "bg-red-900/90 border-red-500 text-red-100"
                    : "bg-product-background/90 border-primary text-white"
                }`}
              >
                {/* Icono dinámico según tipo */}
                <div
                  className={`p-2 rounded-full ${
                    toast.type === "error" ? "bg-red-500" : "bg-primary"
                  }`}
                >
                  {toast.type === "error" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="font-bold text-sm">
                    {toast.type === "error" ? "Eliminado" : "¡Éxito!"}
                  </span>
                  <span className="text-xs opacity-90">{toast.message}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
