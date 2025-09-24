import { useState } from "react";

import { useContext } from "react";
import { ProductContext } from "../../Context";
import { totalPrice } from "../../../Utils";
export default function Checkout() {
  const context = useContext(ProductContext);
  const [formData, setFormData] = useState(null);

  const handlePay = async () => {
    context.setCartTotal(totalPrice(context.cartProducts));
    console.log(context.cartTotal);
    // Datos del pedido
    const order = {
      referenceCode: "TEST_" + Date.now(),
      amount: `${context.cartTotal}`,
    };

    // Pedimos al backend la firma
    const res = await fetch("http://localhost:3999/signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = await res.json();
    setFormData(data);
  };

  return (
    <div className="w-auto flex items-end justify-center">
      <button
        onClick={handlePay}
        className="mx-auto bg-green-601 px-4 py-2 rounded-xl"
      >
        Generar pago
      </button>

      {formData && (
        <div className="fixed z-51 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-3xl flex items-center justify-center flex-col gap-5">
          <div className="w-[89%] h-auto bg-black rounded-xl p-5 flex items-center justify-center flex-col gap-5">
            <p>
              El precio total de tu pedido es de:{" "}
              <span className="font-bold">
                ${context.cartTotal.toLocaleString("es-CO")}
              </span>
            </p>
            <p>Estas seguro de realizar tu pago?</p>
            <div className="flex items-center justify-center gap-6">
              <form
                method="POST"
                action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
                className="mx-auto flex items-center justify-center w-full"
              >
                <input
                  type="hidden"
                  name="merchantId"
                  value={formData.merchantId}
                />
                <input
                  type="hidden"
                  name="accountId"
                  value={formData.accountId}
                />
                <input
                  type="hidden"
                  name="description"
                  value="Compra de prueba"
                />
                <input
                  type="hidden"
                  name="referenceCode"
                  value={formData.referenceCode}
                />
                <input type="hidden" name="amount" value={formData.amount} />
                <input
                  type="hidden"
                  name="currency"
                  value={formData.currency}
                />
                <input
                  type="hidden"
                  name="signature"
                  value={formData.signature}
                />
                <input type="hidden" name="test" value="0" />

                <button
                  type="submit"
                  className="text-black bg-gradient-to-r from-green-401 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Pagar ahora
                </button>
              </form>

              <button
                type="button"
                onClick={() => context.closeOrderCheck()}
                className="text-black bg-gradient-to-r from-red-401 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
