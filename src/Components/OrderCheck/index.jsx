import "./styles.css";
import { useContext } from "react";
import { ProductContext } from "../Context";
import { AnimatePresence, motion } from "framer-motion";
import { totalPrice } from "../../Utils"; // Ahora sí lo usamos
import Carousel from "../Carousel";

export function OrderCheck() {
  const context = useContext(ProductContext);

  // Lógica de eliminación mejorada para asegurar consistencia
  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
    // Es más seguro actualizar el contador basado en el nuevo array que restar 1
    context.setCount(filteredProducts.length);
  };

  // Renderizado condicional de imágenes
  const renderProductImage = (product) => {
    if (!product.img || product.img.length === 0) return null;

    if (product.img.length === 1) {
      return (
        <img
          src={product.img[0]} // Asumiendo que es un array, accedemos al índice 0
          alt={product.title}
          className="w-full mx-auto md:w-[40%] h-40 object-cover rounded-lg"
        />
      );
    } else {
      return (
        <div className="w-full md:w-[40%] mb-5 md:mb-0">
          <Carousel className="overflow-hidden relative mx-auto cursor-pointer w-full h-40 rounded-lg">
            {product.img.map((image, index) => (
              <img
                src={image}
                alt={product.title}
                key={index}
                className="w-full h-full object-cover"
              />
            ))}
          </Carousel>
        </div>
      );
    }
  };

  // Calcular el total para mostrarlo o enviarlo
  const total = totalPrice(context.cartProducts);

  return (
    <AnimatePresence>
      {context.isOrderCheckOpen && (
        <motion.aside
          initial={{ x: "100%" }} // Usualmente los carritos entran desde la derecha
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-[100dvh] w-[90vw] md:w-[50vw] lg:w-[30vw] flex flex-col z-[999] bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
        >
          {/* --- Header --- */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="font-semibold text-2xl text-gray-800 dark:text-white">
              Mi Carrito
            </h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => context.closeOrderCheck()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                className="text-gray-800 dark:text-white"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* --- Lista de Productos (Scrollable) --- */}
          <div className="flex-grow overflow-y-auto p-5 scrollbar-hide">
            {context.cartProducts.length > 0 ? (
              <div className="flex flex-col gap-y-6">
                <AnimatePresence mode="popLayout">
                  {context.cartProducts.map((product) => (
                    <motion.div
                      key={product.id} // El key debe ir en el elemento directo del map
                      layout // Animación suave al reordenar lista
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.2 },
                      }}
                      className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 shadow-sm"
                    >
                      {renderProductImage(product)}

                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-md font-medium text-gray-800 dark:text-white/90 line-clamp-2">
                              {product.title}
                            </h3>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${product.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-white/60 line-clamp-2">
                            {product.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="self-end mt-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                          aria-label="Eliminar producto"
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
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <p className="text-lg text-gray-800 dark:text-white">
                  Tu carrito está vacío.
                </p>
              </div>
            )}
          </div>

          {/* --- Footer / Checkout --- */}
          {context.cartProducts.length > 0 && (
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Total:</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${total}
                </span>
              </div>

              <a
                href={`https://wa.me/573248600843?text=Hola!%20Estoy%20interesad@%20en%20comprar%20${context.count}%20productos%20por%20un%20valor%20total%20de%20$${total}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full gap-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 transition-all dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <span>Finalizar Pedido por WhatsApp</span>
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
              </a>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
