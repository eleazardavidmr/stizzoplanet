import { createContext, useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

import { PRODUCTS } from "../../data/products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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
          : product.category === selectedCategory,
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
