import PropTypes from "prop-types";
import { ProductContext } from "../../Context";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
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
    setTimeout(() => setAlertMessage(null), 5000); // Oculta la alerta después de 3 segundos
  };

  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]);
    showAlert(productToAdd.title);
  };

  const renderIcons = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      // Ícono de carrito con check
      return (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      // Ícono de carrito con plus
      return (
        <button
          onClick={() => addProductsToCart(data)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

  return (
    <>
      {alertMessage && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="cursor-pointer fixed w-auto bottom-1 right-2 md:w-auto md:bottom-5 md:right-5 z-[99] flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <div className="flex items-center justify-center gap-1 text-right">
            <span className="font-semibold">{alertMessage}</span>
            <span>ha sido agregado al carrito</span>
            <button onClick={() => context.openOrderCheck()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <div className="product flex flex-col mx-auto items-center md:w-[300px] lg:w-[350px] ">
        <motion.img
          whileHover={{ scale: 1.05 }}
          onClick={() => showProduct()}
          className="w-full cursor-pointer aspect-[500/500]"
          src={data.img}
          alt={data.title}
        />
        <div className=" flex p-5 items-center justify-between mx-auto mt-5 w-full dark:border-gray-700 dark:bg-[#101f2e] rounded-b-lg">
          <div>
            <p className="text-xl font-semibold text-gray-400">{data.title}</p>
            <p className="text-3xl font-extrabold text-white">${data.price}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center justify-between">
              <a
                href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${data.title}`}
                target="_blank"
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
