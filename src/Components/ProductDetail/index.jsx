import "./styles.css";
import { ProductContext } from "../Context";
import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Carousel from "../Carousel";
import { useState } from "react";
import { InstagramLogo } from "../../Icons/InstagramLogo";
import { WhatsAppLogo } from "../../Icons/WhatsAppLogo";
import { Link } from "react-router-dom";
export function ProductDetail() {
  const context = useContext(ProductContext);

  const [productAddedToCartMessage, setProductAddedToCartMessage] =
    useState(null);
  const [productAddedToFavoritesMessage, setProductAddedToFavoritesMessage] =
    useState(null);

  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]);
    showProductAddedToCartMessage(
      productToAdd.title,
      " ha sido agregado al carrito."
    );
  };

  const showProductAddedToCartMessage = (productTitle, message) => {
    setProductAddedToCartMessage(productTitle + message);
    setTimeout(() => setProductAddedToCartMessage(null), 5000);
  };

  const showProductAddedToFavoritesMessage = (productTitle, message) => {
    setProductAddedToFavoritesMessage(productTitle + message);
    setTimeout(() => setProductAddedToFavoritesMessage(null), 5000);
  };

  const renderBadge = () => {
    if (context.productToShow.new) {
      return (
        <span className=" h-fit w-fit bg-pink-100 text-pink-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
          Nuevo
        </span>
      );
    } else {
      return null;
    }
  };

  const renderCartIcons = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          onClick={() => addProductsToCart(context.productToShow)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

  const renderProductImage = (product) => {
    if (product.img.length === 1) {
      return (
        <motion.img
          className=" w-full md:w-[50%] aspect-[500/500] ml-5 mx-auto"
          src={product.img[0]}
          alt={product.title}
        />
      );
    } else if (product.img.length > 1) {
      return (
        <Carousel className="overflow-hidden relative mx-auto cursor-pointer mb-5 md:w-[50%] w-[90%]">
          {product.img.map((image, index) => (
            <motion.img
              key={index}
              className="w-full"
              src={image}
              alt={product.title}
            />
          ))}
        </Carousel>
      );
    }
  };

  const BuyButton = ({ content }) => {
    return (
      <button
        type="button"
        className="p-2 w-12 h-12 flex items-center justify-center text-sm font-medium  focus:outline-none text-white/60 rounded-full  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {content}
      </button>
    );
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {context.isProductDetailOpen && (
          <motion.aside
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key="box"
            className="product-detail cursor-pointer flex flex-col fixed top-[5%] left-3 overflow-x-hidden  z-[99] w-[90vw] h-[90vh] rounded-lg  mx-auto overflow-auto md:w-[90vw] md:left-[3%] md:top-[15%] lg:w-[60vw] lg:left-[20%] lg:py-0 md:h-[auto]"
          >
            <div className="sticky bg-[#090F15] md:bg-transparent md:px-8 top-0 flex items-center justify-between w-full p-5 lg:py-5 ">
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

            <figure className="w-full mx-auto flex flex-col justify-between md:flex-row md:w-full">
              {renderProductImage(context.productToShow)}
              <div className="flex flex-col items-center justify-center h-fit gap-5 md:w-[40%] m-auto w-[85%] ">
                <div className="flex flex-col gap-x-5">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex flex-col gap-y-2 items-end w-full">
                      {renderBadge()}
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
                  <div className="flex items-center justify-center gap-2 text-center text-white/60 md:text-left">
                    <a
                      href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${context.productToShow.title}`}
                      target="_blank"
                      type="button"
                      className="text-white w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Comprar
                    </a>
                    {renderCartIcons(context.productToShow.id)}
                  </div>
                </div>
                {/* PRODUCT-DETAIL INFO BUTTONS*/}
                <div className="flex items-center justify-center w-[90%] gap-5 mb-5 md:mb-0">
                  <p className="text-white/60">Compralos ya!</p>
                  <div className="flex items-center justify-center gap-1">
                    <BuyButton
                      content={<InstagramLogo width={24} height={24} />}
                    />
                    <BuyButton
                      content={<WhatsAppLogo width={24} height={24} />}
                    />
                  </div>
                </div>
              </div>
            </figure>
          </motion.aside>
        )}
        {productAddedToFavoritesMessage && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-primary-light border border-primary rounded-lg bg-green-50 dark:bg-gray-800 "
            role="alert"
          >
            <Link to="/favoritos">
              <div className="flex items-center justify-center gap-1 text-right">
                <span className="font-semibold">
                  {productAddedToFavoritesMessage}
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {productAddedToCartMessage && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => context.openOrderCheck()}
            className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
            role="alert"
          >
            <div className="flex items-center justify-center gap-1 text-right">
              <span className="font-semibold">{productAddedToCartMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
