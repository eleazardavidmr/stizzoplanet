import "./styles.css";
import { ProductContext } from "../Context";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { totalPrice } from "../../Utils";
export function OrderCheck() {
  const context = useContext(ProductContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
    context.setCount(context.count - 1);
  };

  return (
    <>
      <AnimatePresence>
        {context.isOrderCheckOpen && (
          <motion.aside
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            className="fixed w-[90vw] top-0 h-[100vh] md:w-[50vw] overflow-y-scroll lg:w-[30vw] flex flex-col order-check z-[999] "
          >
            <div className="sticky bg-[#090F15] top-0 mb-5 flex items-center justify-between w-full p-5">
              <h1 className="font-semibold text-2xl">Mi Carrito</h1>
              <motion.span
                whileTap={{ scale: 0.8 }}
                onClick={() => context.closeOrderCheck()}
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
                  className="cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </motion.span>
            </div>

            <div className="flex-grow flex flex-col justify-between">
              {context.cartProducts.length > 0 ? (
                <figure className="w-full mx-auto flex flex-col justify-between gap-y-5">
                  <AnimatePresence>
                    {context.cartProducts.map((product, index) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          key={index}
                          className="flex flex-col w-[90%] md:flex-row mx-auto rounded-lg p-0 border border-gray-300 dark:border-gray-700"
                        >
                          <img
                            src={product.img}
                            alt={product.title}
                            className="w-full mx-auto md:w-[40%] object-contain rounded-lg"
                          />
                          <div className="flex w-full p-3 h-full border-l border-gray-300 dark:border-gray-700 m-auto flex-col">
                            <span className="flex justify-between items-center w-full mb-5">
                              <h1 className="text-md text-white/70">
                                {product.title}
                              </h1>
                              <span className="text-xl font-bold">
                                ${product.price}
                              </span>
                            </span>
                            <div className="flex-grow text-white/60 text-sm">
                              {product.desc}
                            </div>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="self-end flex items-center justify-center focus:outline-none text-white focus:ring-red-300 font-medium rounded-full w-10 h-10 text-sm px-2 py-2.5 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
                                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </figure>
              ) : (
                <p className="text-center text-white mt-5">
                  Tu carrito está vacío.
                </p>
              )}

              {context.cartProducts.length > 0 ? (
                <div className="sticky bottom-0 left-0 w-full flex items-center justify-center bg-slate-900 p-5">
                  <div className="w-[80%] flex items-center justify-between">
                    <p>{`Tienes ${context.count} ${
                      context.count === 1 ? "producto" : "productos"
                    } en el carrito `}</p>
                    <a
                      href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20${context.count}%20productos`}
                      target="_blank"
                      type="button"
                      className={`${
                        context.count === 0
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card-pay"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
                        <path d="M3 10h18" />
                        <path d="M16 19h6" />
                        <path d="M19 16l3 3l-3 3" />
                        <path d="M7.005 15h.005" />
                        <path d="M11 15h2" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
