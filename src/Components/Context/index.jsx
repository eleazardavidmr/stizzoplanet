import { createContext, useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const PRODUCTS = [
    {
      id: 16,
      img: [
        "/img/products/asics/asics-black.png",
        "/img/products/asics/asics-gray.png",
        "/img/products/asics/asics-white.png",
      ],
      title: "Asics",
      desc: "Nuevas Asics🦦🔥 Disponible aquí en @stizzoplanet 🪐Con domicilio GRATIS en Cali y envíos a todo colombia 🇨🇴✅💎",
      sizes: [44, 42, 40],
      price: 320000,
      category: "caballero",
      new: true,
    },
    {
      id: 15,
      img: [
        "/img/products/vansKnuSkool/vansKnuSkool-animalprint.png",
        "/img/products/vansKnuSkool/vansKnuSkool-red.png",
        "/img/products/vansKnuSkool/vansKnuSkool-pink.png",
      ],
      title: "Vans Knu Skool",
      desc: "Vans Knu Skool〽️🛹. Escríbenos por medio de WhatsApp y haz tu pedido, link en el perfil 📲",
      sizes: [44, 42, 40],
      price: 280000,
      category: "dama",
      new: true,
    },
    {
      id: 14,
      img: ["/img/products/puma-palermo.png"],
      title: "Puma Palermo",
      desc: "Puma Palermo🐆☑️ Haz tu pedido por medio de nuestro whatsapp 📲",
      sizes: [44, 42, 40],
      price: 250000,
      category: "caballero",
      new: false,
    },
    {
      id: 13,
      img: [
        "img/products/airMax/airMax-black-and-white.png",
        "/img/products/airMax/airMax-green.png",
        "/img/products/airMax/airMax-blue.png",
        "/img/products/airMax/airMax-orange.png",
        "/img/products/airMax/airMax-brown.png",
      ],
      title: "Air Max",
      desc: "Nuevo modelo disponible 🌪️👌🏻 Mira todos los colores disponibles en nuestro catálogo, link en el perfil📲",
      sizes: [44, 42, 40],
      price: 300000,
      category: "caballero",
      new: false,
    },
    {
      id: 12,
      img: ["/img/products/newBalance1906.png"],
      title: "New Balance 1906",
      desc: "New 1906😎🔥Recuerda que hacemos domicilios GRATIS en Cali📍y envíos nacionales a todo el país 🇨🇴",
      sizes: [44, 42, 40],
      price: 295000,
      category: "dama",
      new: false,
    },
    {
      id: 11,
      img: ["/img/products/adidasSamba.png"],
      title: "Adidas Samba",
      desc: "¿Qué tal estas nuevas samba?👀❤️💘 ¡Escríbenos y agenda tu pedido!🚚",
      sizes: [44, 42, 40],
      price: 270000,
      category: "dama",
      new: false,
    },
    {
      id: 10,
      img: [
        "/img/products/airMax95/airmax95-green.png",
        "/img/products/airMax95/airmax95-blue.png",
      ],
      title: "Air Max 95",
      desc: "Air Max 95❇️ Un modelo muy clásico〽️ Recuerda que hacemos domicilios GRATIS en Cali📍y envíos nacionales a todo el país 🇨🇴",
      sizes: [44, 42, 40],
      price: 310000,
      category: "caballero",
      new: false,
    },
    {
      id: 9,
      img: ["/img/products/adidasBadBunny.png"],
      title: "Adidas X Bad Bunny",
      desc: "Ad/das Response x Bad Bunny🔥 Todos los colores disponibles, escríbenos y haz tu pedido📲✔️",
      sizes: [44, 42, 40],
      price: 350000,
      category: ["dama", "caballero"],
      new: false,
    },
    {
      id: 8,
      img: [
        "/img/products/rebook/rebook-black.png",
        "/img/products/rebook/rebook-blue.png",
      ],
      title: "Rebook",
      desc: "REE🅱️OK🫡 Disponible aquí en @stizzoplanet 🪐Con domicilio GRATIS en Cali y envíos a todo colombia 🇨🇴✅💎",
      sizes: [44, 42, 40],
      price: 220000,
      category: "caballero",
      new: false,
    },
    {
      id: 7,
      img: ["/img/products/newBalance530.png"],
      title: "New Balance 530",
      desc: "New 530🫧💨 ¿Qué tal este color?😮‍💨😮‍💨 Haz tu pedido por medio de WhatsApp, link en el perfil 📲",
      sizes: [44, 42, 40],
      price: 290000,
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
      price: 330000,
      category: "caballero",
      new: false,
    },
    {
      id: 5,
      img: ["/img/products/nikeZoom.png"],
      title: "Nike Zoom",
      desc: "Nike Zoom🔥 Un modelo que no puede faltar en tu colección👟 Disponible para hombre📍",
      sizes: [44, 42, 40],
      price: 260000,
      category: "caballero",
      new: false,
    },
    {
      id: 4,
      img: ["/img/products/reebook.png"],
      title: "Reebook",
      desc: "Un modelo clásico que no puede faltar🔝 Disponible para hombre y dama aquí en @stizzoplanet_ 🤩",
      sizes: [44, 42, 40],
      price: 210000,
      category: "dama",
      new: false,
    },
    {
      id: 3,
      img: ["/img/products/newb327.png"],
      title: "New B 327",
      desc: "New B 327👨🏻☄️Tenemos variedad de colores☑️ Haz tu pedido por medio de WhatsApp, link en el perfil 📲",
      sizes: [44, 42, 41],
      price: 240000,
      category: "caballero",
      new: false,
    },
    {
      id: 2,
      img: ["/img/products/airmax97.png"],
      title: "Air Max 97",
      desc: "Air Max 97💨 Un modelo que no pasa de moda🔥 Recuerda que hacemos domicilios GRATIS en Cali📍y envíos nacionales a todo el país 🇨🇴",
      sizes: [30, 39, 44],
      price: 315000,
      category: "caballero",
      new: false,
    },
    {
      id: 1,
      img: ["/img/products/nikeV2K.png"],
      title: "Nike V2K",
      desc: "N🔝KE V2K✔️ De nuevo disponible para hombre y dama 🤩 Haz tu pedido y te lo entregamos con domi gratis en Cali📍",
      sizes: [44, 42, 43],
      price: 275000,
      category: "dama",
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

  //payment
  const [productsToPay, setProductsToPay] = useState([]); // <- asegurarse array por defecto
  const [isPaymentConfirmOpen, setIsPaymentConfirmOpen] = useState(false);

  const openPaymentConfirm = (products) => {
    setProductsToPay(products);
    setIsPaymentConfirmOpen(true);
  };

  const closePaymentConfirm = () => {
    setIsPaymentConfirmOpen(false);
    setProductsToPay([]); // limpiar al cerrar
  };

  const [formData, setFormData] = useState(null);

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

  //favorites

  const [favorites, setFavorites] = useState([]);
  const [isInFavorites, setIsInFavorites] = useState();

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to add a product to favorites
  const addToFavorites = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Function to remove a product from favorites
  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((fav) => fav.id !== productId));
  };

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
        favorites,
        setFavorites,
        isInFavorites,
        setIsInFavorites,
        addToFavorites,
        removeFromFavorites,
        isPaymentConfirmOpen,
        setIsPaymentConfirmOpen,
        openPaymentConfirm,
        closePaymentConfirm,
        productsToPay,
        setProductsToPay,
        formData,
        setFormData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
