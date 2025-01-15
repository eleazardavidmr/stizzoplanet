import PropTypes from "prop-types";
import { ProductContext } from "../../Context";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "../../Carousel";
import "./styles.css";

export function Product({ data }) {
  const context = useContext(ProductContext);
  const [alertMessage, setAlertMessage] = useState(null);

  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };

  const showAlert = (productTitle) => {
    setAlertMessage(productTitle + " ");
    setTimeout(() => setAlertMessage(null), 5000);
  };

  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]);
    showAlert(productToAdd.title);
  };

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
        <span className="mr-1 text-xs w-fit font-semibold text-white bg-pink-700 rounded-full px-2 py-1">
          Dama
        </span>
      ),
    };

    if (Array.isArray(category)) {
      return (
        <div className="flex items-center justify-center">
          {category.map((cat) => categoryElements[cat])}
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
          className="w-full cursor-pointer aspect-[500/500] rounded-xl"
          src={img[0]}
          alt={data.title}
          whileHover={{ scale: 1.05 }}
          onClick={() => showProduct()}
        />
      );
    } else if (img.length > 1) {
      return (
        <Carousel className="overflow-hidden z-10 relative mx-auto cursor-pointer mb-5 w-full">
          {img.map((image, index) => (
            <motion.img
              key={index}
              className="w-full cursor-pointer aspect-[500/500] rounded-xl"
              src={image}
              alt={data.title}
            />
          ))}
        </Carousel>
      );
    }
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
          className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[9999999] flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex items-center justify-center gap-1 text-right">
            <span className="font-semibold">{alertMessage}</span>
            <span>ha sido agregado al carrito</span>
          </div>
        </motion.div>
      )}

      <div className="product flex flex-col mx-auto items-center justify-between w-[90vw] md:w-[50vw] lg:w-[350px] min-h-0">
        {renderProductImage(data.img)}
        <div className="flex p-4 items-center justify-between mx-auto w-full dark:border-gray-700 dark:bg-[#101f2e] rounded-b-lg">
          <div className="flex flex-col">
            <span className="mb-2 gap-1 flex flex-col">
              {renderCategoryIcons(data.category)}
            </span>
            <span className="text-md font-regular text-gray-400">
              {data.title}
            </span>
            <span className="text-3xl font-bold text-white">${data.price}</span>
          </div>

          <div className="flex items-center gap-2 justify-between flex-col">
            <span className="flex w-full">
              {data.img.length > 1 ? (
                <button
                  type="button"
                  onClick={() => showProduct()}
                  className="text-white bg-yellow-600 w-full hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-xs px-5 py-2.5 text-center dark:focus:ring-yellow-900"
                >
                  Ver más
                </button>
              ) : null}
            </span>
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
      </div>
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
