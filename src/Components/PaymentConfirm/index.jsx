import PropTypes from "prop-types";

export default function PaymentConfirm({ products }) {
  const renderPaymentConfirm = () => {
    console.log(products);
    if (products.length === 1) {
      return <div></div>;
    } else if (products.length > 1) {
      return <div></div>;
    }
  };
  return <>{renderPaymentConfirm()}</>;
}

PaymentConfirm.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      img: PropTypes.arrayOf(PropTypes.string).isRequired,
      // Agrega más propiedades si tu producto las necesita
    })
  ).isRequired,
};
