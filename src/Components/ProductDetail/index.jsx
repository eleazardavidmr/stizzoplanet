import "./styles.css";
import { ProductContext } from "../Context";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
export function ProductDetail() {
  const context = useContext(ProductContext);
  return (
    <>
      <AnimatePresence initial={false}>
        {context.isProductDetailOpen && (
          <motion.aside
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            className="product-detail cursor-pointer flex flex-col fixed top-[5%] left-3 overflow-x-hidden py-6 z-[99] w-[90vw] h-[90vh] rounded-lg p-2 mx-auto overflow-auto md:w-[90vw] md:left-[3%] md:top-[15%] lg:w-[60vw] lg:left-[20%] lg:py-0 md:h-[auto]"
          >
            <div className="flex items-center justify-between w-full px-8 lg:py-5 ">
              <h1 className="font-semibold text-2xl">Detalle</h1>

              <motion.span
                whileTap={{ scale: 0.8 }}
                onClick={() => context.closeProductDetail()}
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

            <figure className="w-full mx-auto flex flex-col justify-between gap-y-5 md:flex-row md:w-full ">
              <img
                src={context.productToShow.img}
                alt={context.productToShow.title}
                className="w-[80%] mx-auto md:w-[50%] aspect-[500/500] "
              />

              <div className="flex flex-col md:w-[40%] m-auto w-[85%] gap-x-5">
                <div className="flex items-center justify-between gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="flex w-full items-center justify-between">
                      <p className="font-regular text-xl">
                        {context.productToShow.title}
                      </p>
                      <p className="font-extrabold text-2xl">
                        ${context.productToShow.price}
                      </p>
                    </span>

                    <p className="text-white/60 md:text-left">
                      {context.productToShow.desc}
                    </p>
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-5 text-center text-white/60 md:text-left">
                  <div className="flex flex-col md:flex-row items-center ">
                    <p className="font-bold">Tallas disponibles:</p>
                    <ul className="p-0 mx-auto flex items-center justify-between gap-5">
                      {context.productToShow.sizes.map((size) => {
                        return (
                          <li
                            className="flex items-center justify-center p-2 backdrop-blur-xl rounded-full w-8 h-8 font-semibold"
                            key={context.productToShow.id}
                          >
                            {size}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <a
                    href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${context.productToShow.title}`}
                    target="_blank"
                    type="button"
                    className="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </figure>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
