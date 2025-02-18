import PropTypes from "prop-types";
import { ProductContext } from "../../Context";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Carousel from "../../Carousel";
import { Link } from "react-router-dom";
import "./styles.css";
import InfoIcon from "../../../Icons/InfoIcon";

export function Product({ data }) {
  const context = useContext(ProductContext);

  //adding products to favorites
  const addProductToFavorites = (productToAdd) => {
    context.addToFavorites(productToAdd);
    showAddingToFavoritesAlert(
      productToAdd.title,
      "ha sido agregado a favoritos."
    );
  };
  //deleting products from favorites
  const deleteFromFavorites = (productToDelete) => {
    context.removeFromFavorites(productToDelete.id);
    showDeletingFromFavoritesAlert(
      productToDelete.title,
      "ha sido eliminado de favoritos."
    );
  };

  //alerts states
  const [alertMessage, setAlertMessage] = useState(null);
  const [deletingFromFavoritesMessage, setDeletingFromFavoritesMessage] =
    useState(null);
  const [addingToFavoritesMessage, setAddingToFavoritesMessage] =
    useState(null);

  //alerts functions
  const showDeletingFromFavoritesAlert = (productTitle, message) => {
    setDeletingFromFavoritesMessage(productTitle + " " + message);
    setTimeout(() => setDeletingFromFavoritesMessage(null), 3000);
  };

  const showAddingToFavoritesAlert = (productTitle, message) => {
    setAddingToFavoritesMessage(productTitle + " " + message);
    setTimeout(() => setAddingToFavoritesMessage(null), 3000);
  };

  const showAlert = (productTitle) => {
    setAlertMessage(productTitle + " ");
    setTimeout(() => setAlertMessage(null), 5000);
  };

  //showing product
  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };

  //rendering
  const renderIcons = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            className="icon icon-tabler icon-tabler-shopping-cart-check"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M11.5 17h-5.5v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
            <path d="M15 19l2 2l4 -4" />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => addProductsToCart(data)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            className="icon icon-tabler icon-tabler-shopping-cart-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12.5 17h-6.5v-14h-2" />
            <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        </button>
      );
    }
  };

  const renderCategoryIcons = (category) => {
    const categoryElements = {
      caballero: (
        <span className="text-xs w-fit font-semibold text-white bg-blue-700 rounded-full px-2 py-1">
          Caballero
        </span>
      ),
      dama: (
        <span className="mr-1 text-xs w-fit font-semibold text-white  bg-pink-700 rounded-full px-2 py-1">
          Dama
        </span>
      ),
    };

    if (Array.isArray(category)) {
      return (
        <div className="flex items-center justify-center">
          {category.map((cat, index) => (
            <div key={index}>{categoryElements[cat]}</div>
          ))}
        </div>
      );
    } else {
      return categoryElements[category];
    }
  };

  const renderProductImage = (img) => {
    if (img.length === 1) {
      return (
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="w-full cursor-pointer aspect-[500/500] product-image"
          src={img[0]}
          alt={data.title}
        />
      );
    } else if (img.length > 1) {
      return (
        <Carousel className="overflow-hidden -z-50 relative mx-auto cursor-pointer mb-5 w-full">
          {img.map((image, index) => (
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              key={index}
              className="w-full cursor-pointer aspect-[500/500] product-image"
              src={image}
              alt={data.title}
            />
          ))}
        </Carousel>
      );
    }
  };

  const renderLikeButton = (id) => {
    const isInFavorites = context.favorites.some(
      (product) => product.id === id
    );

    if (isInFavorites) {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          type="button"
          onClick={() => deleteFromFavorites(data)}
          className="bg-primary rounded-full p-2 w-10 h-10"
        >
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
        </motion.button>
      );
    } else {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          type="button"
          className=" transition-all rounded-full p-2 w-10 h-10"
          onClick={() => addProductToFavorites(data)}
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        </motion.button>
      );
    }
  };

  //adding products to cart
  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]);
    showAlert(productToAdd.title);
  };

  return (
    <>
      {alertMessage && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => context.openOrderCheck()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          exit={{ opacity: 0, y: 100 }}
          className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <div className="flex items-center justify-center gap-1 text-right">
            <span className="font-semibold">
              {alertMessage} ha sido agregado al carrito.
            </span>
          </div>
        </motion.div>
      )}
      {addingToFavoritesMessage && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <Link to="/favoritos">
            <div className="flex items-center justify-center gap-1 text-right">
              <span className="font-semibold">{addingToFavoritesMessage}</span>
            </div>
          </Link>
        </motion.div>
      )}

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

      <AnimatePresence>
        <motion.div className="product rounded-xl w-[90vw] md:w-[400px] lg:h-[600px] flex items-center flex-col justify-between">
          <div className="flex mx-auto items-center justify-between w-[90%] transition-all mt-3 text-white/60">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => showProduct()}
              className=""
            >
              <InfoIcon />
            </motion.button>
            {renderLikeButton(data.id)}
          </div>
          {renderProductImage(data.img)}
          <div className="flex p-5 items-center justify-between mx-auto w-full dark:border-gray-700 bg-blue-950 dark:bg-[#101f2e] rounded-b-lg">
            <div className="flex flex-col">
              <span className="mb-2 gap-1 flex ">
                {renderCategoryIcons(data.category)}
              </span>
              <div className="flex items-left justify-center gap-1 flex-col">
                <span className="text-md font-regular text-gray-400">
                  {data.title}
                </span>
                <span className="text-3xl font-bold text-white">
                  ${data.price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between flex-col">
              <span className="flex items-center justify-between ">
                <a
                  href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${data.title}`}
                  target="_blank"
                  type="button"
                  className="text-white text-xs bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Comprar
                </a>

                {renderIcons(data.id)}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
};
