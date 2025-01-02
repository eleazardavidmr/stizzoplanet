import PropTypes from "prop-types";
import { ProductContext } from "../../Context";
import { useContext } from "react";
import { motion } from "framer-motion";
import "./styles.css";

export function Product({ data }) {
  const context = useContext(ProductContext);

  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };

  const addProductsToCart = (productToAdd) => {
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productToAdd]); // Agrega el producto al carrito
    console.log(context.cartProducts);
  };

  const renderIcons = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      //CART-CHECK ICON------------------------------------------------------
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-check"
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
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"
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
      <div className="product rounded-xl items-center w-full backdrop-blur-sm transition-all mx-auto md:w-[300px] lg:w-[350px] cursor-pointer">
        <motion.img
          whileHover={{ scale: 1.05 }}
          onClick={() => showProduct()}
          className="w-full"
          src={data.img}
          alt={data.title}
        />
        <div className="flex p-5 items-center justify-between mx-auto mt-5 w-full  dark:border-gray-700 dark:bg-[#0b141d] rounded-b-lg">
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
    img: PropTypes.string.isRequired, // La imagen del producto es necesaria
    title: PropTypes.string.isRequired, // El título del producto es necesario
    id: PropTypes.number.isRequired, // El id del producto es necesario
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // El precio puede ser string o número (opcional si está fijo en el código)
  }).isRequired, // Aseguramos que `data` sea obligatorio
};
