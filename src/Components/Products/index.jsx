import { Product } from "./Product";
import { ProductContext } from "../Context";
import { useContext } from "react";
import Carousel from "../Carousel";
export function Products() {
  const context = useContext(ProductContext);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row flex-wrap w-[90vw] mx-auto lg:w-[80vw] mb-5">
        {context.filteredProducts.map((product) => {
          return <Product key={product.title} data={product} />;
        })}
      </div>
    </>
  );
}
