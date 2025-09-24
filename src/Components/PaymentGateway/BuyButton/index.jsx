import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../../Context";
import { totalPrice } from "../../../Utils";

export default function BuyButton({ productsToPay }) {
  const context = useContext(ProductContext);
  const handlePay = async () => {
    // normalizar a array y guardar en contexto sólo al hacer click
    const payload = Array.isArray(productsToPay)
      ? productsToPay
      : [productsToPay];

    context.setProductsToPay(payload);
    context.openPaymentConfirm(payload);

    const order = {
      referenceCode: "TEST_" + Date.now(),
      amount: `${totalPrice(payload)}`,
    };

    // Pedimos al backend la firma
    const res = await fetch("http://localhost:4000/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    context.setFormData(data);
  };

  return (
    <div>
      <button
        onClick={handlePay}
        className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-3xl text-xs px-5 py-2.5 text-center"
      >
        Comprar
      </button>
    </div>
  );
}

BuyButton.propTypes = {
  productsToPay: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      img: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};
