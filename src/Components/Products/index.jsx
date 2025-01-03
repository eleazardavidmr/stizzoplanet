import { Product } from "./Product";
import { ProductContext } from "../Context";
import { useContext } from "react";
export function Products() {
  const context = useContext(ProductContext);

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row flex-wrap w-[90vw] mx-auto lg:w-[80%] mb-5">
        {/*
        {PRODUCTS.map((product) => {
          return <Product key={product.title} data={product} />;
        })}
  */}
        {context.filteredProducts.map((product) => {
          return <Product key={product.title} data={product} />;
        })}
      </div>
    </>
  );
}
