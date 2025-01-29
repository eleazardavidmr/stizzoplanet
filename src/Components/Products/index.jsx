import { Product } from "./Product";
import { ProductContext } from "../Context";
import { useContext } from "react";
export function Products() {
  const context = useContext(ProductContext);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-3xl font-extrabold ml-10 mb-5 text-center lg:text-left text-white">
          Échale un vistaso a lo nuevo de{" "}
          <mark className="px-2 text-white rounded bg-primary">
            Stizzo Planet
          </mark>
        </h1>
        <div className="flex items-center justify-center flex-col gap-4 lg:flex-row flex-wrap">
          {context.filteredProducts.map((product) => {
            return <Product key={product.title} data={product} />;
          })}
        </div>
      </div>
    </>
  );
}
