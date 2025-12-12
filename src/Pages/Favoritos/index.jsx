import { Navbar } from "../../Components/Navbar";
import { useContext } from "react";
import { ProductContext } from "../../Components/Context";
import { Product } from "../../Components/Products/Product";
import { OrderCheck } from "../../Components/OrderCheck";
import { ProductDetail } from "../../Components/ProductDetail";
import { AnimatePresence } from "framer-motion";
import ReturnHomeButton from "../../Components/ReturnHomeButton";
import { AuroraBackground } from "../../Components/AuroraBackground";
export default function Favoritos() {
  const context = useContext(ProductContext);
  return (
    <>
      <Navbar />
      <AuroraBackground />
      <OrderCheck />
      <ProductDetail />
      <AnimatePresence>
        <section className=" w-[90vw] mx-auto lg:w-[80vw] mb-5 mt-[15vh] text-white">
          {context.favorites.length >= 1 ? (
            <h1 className="text-2xl font-extrabold text-center mb-5 mt-5 md:text-left md:text-3xl">
              Tus favoritos de{" "}
              <span className="underline underline-offset-3 decoration-5 decoration-primary">
                Stizzo Planet
              </span>
            </h1>
          ) : (
            <div className="flex items-center flex-col md:flex-row md:justify-between justify-center gap-5 md:gap-0">
              <div className="text-2xl font-extrabold text-center  md:text-left">
                No tienes productos favoritos de{" "}
                <span className="underline underline-offset-3 decoration-5 decoration-primary">
                  Stizzo Planet
                </span>
              </div>
              <span>
                <ReturnHomeButton to="/" />
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 w-full">
            {Array.isArray(context.favorites) &&
              context.favorites.map((favoriteProduct, index) => (
                <Product key={index} data={favoriteProduct} />
              ))}
          </div>
        </section>
      </AnimatePresence>
    </>
  );
}
