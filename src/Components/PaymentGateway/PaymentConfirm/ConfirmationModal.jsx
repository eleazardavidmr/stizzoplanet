import { X } from "lucide-react";
import { useContext } from "react";
import { ProductContext } from "../../Context";
import { motion } from "framer-motion";

export default function PaymentConfirmModal() {
  const context = useContext(ProductContext);

  // normalizar productos: puede venir un objeto, un array o undefined
  const products = Array.isArray(context.productsToPay)
    ? context.productsToPay
    : context.productsToPay
    ? [context.productsToPay]
    : [];

  if (!products || products.length === 0) return null;

  const total = products.reduce((acc, p) => acc + Number(p?.price ?? 0), 0);

  const onClose = () => {
    context.closePaymentConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-[90%] max-w-lg md:w-[60%] p-6 relative"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Confirmar Pago
        </h2>

        {/* Lista de productos */}
        <div className="max-h-[50vh] overflow-y-auto mb-4 space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex-col md:flex-row"
            >
              <img
                src={product?.img?.[0] ?? "/img/placeholder.png"}
                alt={product?.title ?? "Producto"}
                className="w-[200px] md:w-[100px] rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {product?.title}
                </h3>
                {product?.desc && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.desc}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="block text-gray-700 dark:text-gray-300 font-medium">
                  ${Number(product?.price ?? 0).toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Total:
          </span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            ${Number(total).toLocaleString("es-CO")}
          </span>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            Cancelar
          </button>

          {context.formData && (
            <form
              method="POST"
              action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
              className="flex w-1/2 items-center justify-center"
            >
              <input
                type="hidden"
                name="merchantId"
                value={context.formData.merchantId}
              />
              <input
                type="hidden"
                name="accountId"
                value={context.formData.accountId}
              />
              <input
                type="hidden"
                name="description"
                value={
                  products.length === 1 ? products[0].title : "Compra multiple"
                }
              />
              <input
                type="hidden"
                name="referenceCode"
                value={context.formData.referenceCode}
              />
              <input
                type="hidden"
                name="amount"
                value={context.formData.amount ?? total}
              />
              <input
                type="hidden"
                name="currency"
                value={context.formData.currency}
              />
              <input
                type="hidden"
                name="signature"
                value={context.formData.signature}
              />
              <input type="hidden" name="test" value="0" />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 dark:hover:bg-green-500 transition"
              >
                Confirmar
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
