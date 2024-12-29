import { Product } from "./Product";
export function Products() {
  const PRODUCTS = [
    {
      id: 1,
      img: "/img/products/nikeV2K.png",
      title: "Nike V2K",
      desc: "zapatillas para dama",
      sizes: [44, 42, 43],
      price: 999,
    },
    {
      id: 2,
      img: "/img/products/airmax97.png",
      title: "Air Max 97",
      desc: "zapatillas para dama",
      sizes: [30, 39, 44],
      price: 999,
    },
    {
      id: 3,
      img: "/img/products/newb327.png",
      title: "New B 327",
      desc: "zapatillas para dama",
      sizes: [44, 42, 41],
      price: 999,
    },
    {
      id: 4,
      img: "/img/products/reebook.png",
      title: "Reebook",
      desc: "zapatillas para dama",
      sizes: [44, 42, 40],
      price: 999,
    },
  ];
  return (
    <>
      <div className="flex w-[90vw] flex-col my-5 md:flex-row lg:w-[70vw] items-center justify-center gap-10 flex-wrap p-0 mx-auto">
        {PRODUCTS.map((product) => {
          return <Product key={product.id} data={product} />;
        })}
      </div>
    </>
  );
}
