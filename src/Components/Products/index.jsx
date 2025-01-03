import { Product } from "./Product";
export function Products() {
  const PRODUCTS = [
    {
      id: 1,
      img: "/img/products/nikeV2K.png",
      title: "Nike V2K",
      desc: "N🔝KE V2K✔️ De nuevo disponible para hombre y dama 🤩 Haz tu pedido y te lo entregamos con domi gratis en Cali📍",
      sizes: [44, 42, 43],
      price: 999,
      category: "dama",
    },
    {
      id: 2,
      img: "/img/products/airmax97.png",
      title: "Air Max 97",
      desc: "Air Max 97💨 Un modelo que no pasa de moda🔥 Recuerda que hacemos domicilios GRATIS en Cali📍y envíos nacionales a todo el país 🇨🇴",
      sizes: [30, 39, 44],
      price: 999,
      category: "caballero",
    },
    {
      id: 3,
      img: "/img/products/newb327.png",
      title: "New B 327",
      desc: "New B 327👨🏻☄️Tenemos variedad de colores☑️ Haz tu pedido por medio de WhatsApp, link en el perfil 📲",
      sizes: [44, 42, 41],
      price: 999,
      category: "caballero",
    },
    {
      id: 4,
      img: "/img/products/reebook.png",
      title: "Reebook",
      desc: "Un modelo clásico que no puede faltar🔝 Disponible para hombre y dama aquí en @stizzoplanet_ 🤩",
      sizes: [44, 42, 40],
      price: 999,
      category: "dama",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row flex-wrap w-[90vw] mx-auto lg:w-[80%] mb-5">
        {PRODUCTS.map((product) => {
          return <Product key={product.title} data={product} />;
        })}
      </div>
    </>
  );
}
