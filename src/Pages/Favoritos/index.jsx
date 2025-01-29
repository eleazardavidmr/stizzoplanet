import { NoiseBackground } from "../../Components/NoiseBackground";
import { Navbar } from "../../Components/Navbar";
import { useContext } from "react";
import { ProductContext } from "../../Components/Context";
import { Product } from "../../Components/Products/Product";
import { OrderCheck } from "../../Components/OrderCheck";
import { ProductDetail } from "../../Components/ProductDetail";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Favoritos() {
  const context = useContext(ProductContext);
  const [deletingFromFavoritesMessage, setDeletingFromFavoritesMessage] =
    useState(null);
  const showDeletingFromFavoritesAlert = (productTitle, message) => {
    setDeletingFromFavoritesMessage(productTitle + " " + message);
    setTimeout(() => setDeletingFromFavoritesMessage(null), 3000);
  };
  const deleteFromFavorites = (productToDelete) => {
    const filteredFavorites = context.favorites.filter(
      (product) => product.id !== productToDelete.id
    );
    context.setFavorites(filteredFavorites);
    showDeletingFromFavoritesAlert(
      productToDelete.title,
      "ha sido eliminado de favoritos."
    );
  };
  return (
    <>
      <Navbar />
      <NoiseBackground />
      <OrderCheck />
      <ProductDetail />
      <AnimatePresence>
        <section className=" w-[90vw] mx-auto lg:w-[80vw] mb-5 mt-[15vh] text-white">
          {context.favorites.length >= 1 ? (
            <h1 className="text-2xl font-extrabold text-center mb-5 mt-5 md:text-left md:text-3xl">
              Tus favoritos de{" "}
              <span className="underline underline-offset-3 decoration-5 decoration-primary">
                Stizzo Planet
              </span>
            </h1>
          ) : (
            <h1 className="text-2xl font-extrabold text-center mb-5 md:text-left">
              No tienes productos favoritos de{" "}
              <span className="underline underline-offset-3 decoration-5 decoration-primary">
                Stizzo Planet
              </span>
            </h1>
          )}

          <div className="flex flex-wrap gap-3 w-full">
            {Array.isArray(context.favorites) &&
              context.favorites.map((favoriteProduct, index) => (
                <Product key={index} data={favoriteProduct} />
              ))}
          </div>
        </section>
        {deletingFromFavoritesMessage && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <Link to="/favoritos">
              <div className="flex items-center justify-center gap-1 text-right">
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="font-semibold">
                  {deletingFromFavoritesMessage}
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
