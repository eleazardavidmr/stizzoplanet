import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../../Context";
import PaymentConfirmModal from "./ConfirmationModal";
import { AnimatePresence } from "framer-motion";

export default function PaymentConfirm() {
  const context = useContext(ProductContext);
  // proteger
  if (!context.productsToPay || context.productsToPay.length === 0) return null;
  console.log(context.productsToPay);

  const renderPaymentConfirm = () => {
    if (context.productsToPay.length === 1) {
      return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AnimatePresence>
            <PaymentConfirmModal />
          </AnimatePresence>
        </div>
      );
    } else {
      return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AnimatePresence>
            <PaymentConfirmModal />
          </AnimatePresence>
        </div>
      );
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
