import { Product } from "./Product";
import { ProductContext } from "../Context";
import { useContext } from "react";
export function Products() {
  const context = useContext(ProductContext);
  const renderCategoryTitle = () => {
    if (context.selectedCategory === "dama") {
      return (
        <span>
          para{" "}
          <span className="underline underline-offset-2 decoration-primary">
            dama
          </span>
        </span>
      );
    } else if (context.selectedCategory === "caballero") {
      return (
        <span>
          para{" "}
          <span className="underline underline-offset-2 decoration-secondary">
            caballero
          </span>
        </span>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="mb-5">
        <h1 className="w-full text-3xl font-extrabold my-5 text-center text-white">
          Échale un vistaso a lo nuevo de{" "}
          <mark className="px-2 text-white rounded bg-primary">
            Stizzo Planet
          </mark>{" "}
          {renderCategoryTitle()}
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
