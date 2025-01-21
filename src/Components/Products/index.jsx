import { Product } from "./Product";
import { ProductContext } from "../Context";
import { useContext } from "react";
export function Products() {
  const context = useContext(ProductContext);

  return (
    <>
      <div className=" w-[90vw] mx-auto lg:w-[80vw] mb-5">
        <h1 className="text-3xl font-extrabold mb-5 text-center md:text-left text-white">
          Échale un vistaso a lo nuevo de{" "}
          <mark className="px-2 text-white rounded bg-primary">
            Stizzo Planet
          </mark>
        </h1>
        <div className="flex flex-wrap gap-4">
          {context.filteredProducts.map((product) => {
            return <Product key={product.title} data={product} />;
          })}
        </div>
      </div>
    </>
  );
}
