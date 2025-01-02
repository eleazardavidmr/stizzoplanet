import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
