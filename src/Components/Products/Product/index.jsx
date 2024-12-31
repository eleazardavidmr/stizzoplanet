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

  return (
    <>
      <div
        onClick={() => showProduct()}
        className="product rounded-xl px-8 py-5 items-center w-full backdrop-blur-sm transition-all hover:scale-[1.05] mx-auto md:w-[300px] lg:w-[350px] cursor-pointer"
      >
        <img className="w-full" src={data.img} alt={data.title} />
        <div className="">
          <p className="text-xl font-semibold tracking-tight text-gray-400">
            {data.title}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-white">
              ${data.price}
            </span>
            <a
              href={`https://wa.me/573248600843?text=Hola!%20estoy%20interesad@%20en%20las%20${data.title}`}
              target="_blank"
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Comprar
            </a>
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
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // El precio puede ser string o número (opcional si está fijo en el código)
  }).isRequired, // Aseguramos que `data` sea obligatorio
};
