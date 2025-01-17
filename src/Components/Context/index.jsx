import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const PRODUCTS = [
    {
      id: 8,
      img: [
        "/img/products/rebook/rebook-black.png",
        "/img/products/rebook/rebook-blue.png",
      ],
      title: "Rebook",
      desc: "REE🅱️OK🫡 Disponible aquí en @stizzoplanet 🪐Con domicilio GRATIS en Cali y envíos a todo colombia 🇨🇴✅💎",
      sizes: [44, 42, 40],
      price: 999,
      category: "caballero",
      new: false,
    },
    {
      id: 7,
      img: ["/img/products/newBalance530.png"],
      title: "New Balance 530",
      desc: "New 530🫧💨 ¿Qué tal este color?😮‍💨😮‍💨 Haz tu pedido por medio de WhatsApp, link en el perfil 📲",
      sizes: [44, 42, 40],
      price: 999,
      category: "dama",
      new: true,
    },
    {
      id: 6,
      img: [
        "/img/products/offWhite/offwhite-green.png",
        "/img/products/offWhite/offwhite-black.png",
        "/img/products/offWhite/offwhite-white.png",
      ],
      title: "Off White",
      desc: "Nuevas OFF White❕🧔🏽‍♂️ Mira nuestro catálogo, link en historias destacadas📲",
      sizes: [44, 42, 40],
      price: 999,
      category: "caballero",
      new: false,
    },
    {
      id: 5,
      img: ["/img/products/nikeZoom.png"],
      title: "Nike Zoom",
      desc: "Nike Zoom🔥 Un modelo que no puede faltar en tu colección👟 Disponible para hombre📍",
      sizes: [44, 42, 40],
      price: 999,
      category: "caballero",
      new: false,
    },
    {
      id: 4,
      img: ["/img/products/reebook.png"],
      title: "Reebook",
      desc: "Un modelo clásico que no puede faltar🔝 Disponible para hombre y dama aquí en @stizzoplanet_ 🤩",
      sizes: [44, 42, 40],
      price: 999,
      category: ["dama", "caballero"],
      new: false,
    },
    {
      id: 3,
      img: ["/img/products/newb327.png"],
      title: "New B 327",
      desc: "New B 327👨🏻☄️Tenemos variedad de colores☑️ Haz tu pedido por medio de WhatsApp, link en el perfil 📲",
      sizes: [44, 42, 41],
      price: 999,
      category: "caballero",
      new: false,
    },
    {
      id: 2,
      img: ["/img/products/airmax97.png"],
      title: "Air Max 97",
      desc: "Air Max 97💨 Un modelo que no pasa de moda🔥 Recuerda que hacemos domicilios GRATIS en Cali📍y envíos nacionales a todo el país 🇨🇴",
      sizes: [30, 39, 44],
      price: 999,
      category: "caballero",
      new: false,
    },
    {
      id: 1,
      img: ["/img/products/nikeV2K.png"],
      title: "Nike V2K",
      desc: "N🔝KE V2K✔️ De nuevo disponible para hombre y dama 🤩 Haz tu pedido y te lo entregamos con domi gratis en Cali📍",
      sizes: [44, 42, 43],
      price: 999,
      category: ["dama", "caballero"],
      new: false,
    },
  ];

  //product details
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //product cart
  const [productToShow, setProductToShow] = useState([]);
  //almacenamiento de todos los productos en el carrito
  const [cartProducts, setCartProducts] = useState([]);

  //order check
  const [isOrderCheckOpen, setIsOrderCheckOpen] = useState(false);
  const openOrderCheck = () => setIsOrderCheckOpen(true);
  const closeOrderCheck = () => setIsOrderCheckOpen(false);

  //cart count
  const [count, setCount] = useState(0);

  //filtring by category
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter((product) =>
        Array.isArray(product.category)
          ? product.category.includes(selectedCategory)
          : product.category === selectedCategory
      )
    : PRODUCTS;
  return (
    <ProductContext.Provider
      value={{
        isProductDetailOpen,
        setIsProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        count,
        setCount,
        cartProducts,
        setCartProducts,
        isOrderCheckOpen,
        setIsOrderCheckOpen,
        openOrderCheck,
        closeOrderCheck,
        selectedCategory,
        setSelectedCategory,
        filteredProducts,
        PRODUCTS,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
