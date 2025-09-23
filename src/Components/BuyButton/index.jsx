import { useState } from "react";
import PropTypes from "prop-types";

import { useContext } from "react";
import { ProductContext } from "../Context";
import { totalPrice } from "../../Utils";
import PaymentConfirm from "../PaymentConfirm";
export default function BuyButton({ productsToPay }) {
  const context = useContext(ProductContext);
  const [formData, setFormData] = useState(null);

  const handlePay = async () => {
    context.openPaymentConfirm();

    // Datos del pedido. Aquí tengo que mirar si son 1 o más productos
    const order = {
      referenceCode: "TEST_" + Date.now(),
      products: productsToPay,
      amount: `${totalPrice(productsToPay)}`,
    };

    // Pedimos al backend la firma
    const res = await fetch("http://localhost:4000/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    setFormData(data);
  };

  return (
    <div>
      <button
        onClick={handlePay}
        className="mx-auto bg-green-601 px-4 py-2 rounded-xl"
      >
        Generar pago
      </button>

      {context.isPaymentConfirmOpen ? (
        <PaymentConfirm products={productsToPay} />
      ) : null}

      {formData && (
        <form
          method="POST"
          action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
          className="mx-auto flex items-center justify-center w-full"
        >
          <input type="hidden" name="merchantId" value={formData.merchantId} />
          <input type="hidden" name="accountId" value={formData.accountId} />
          <input type="hidden" name="description" value="Compra de prueba" />
          <input
            type="hidden"
            name="referenceCode"
            value={formData.referenceCode}
          />
          <input type="hidden" name="amount" value={formData.amount} />
          <input type="hidden" name="currency" value={formData.currency} />
          <input type="hidden" name="signature" value={formData.signature} />
          <input type="hidden" name="test" value="0" />

          <button
            type="submit"
            className="text-black bg-gradient-to-r from-green-401 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Pagar ahora
          </button>
        </form>
      )}
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
      // Puedes agregar más propiedades según tu modelo de producto
    })
  ).isRequired,
};
