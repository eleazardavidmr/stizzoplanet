import "./App.css";
import FilterNav from "./Components/FilterNav";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { NoiseBackground } from "./Components/NoiseBackground";
import { OrderCheck } from "./Components/OrderCheck";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
import { useContext } from "react";
import { ProductContext } from "./Components/Context";
function App() {
  const context = useContext(ProductContext);
  return (
    <>
      <OrderCheck />
      <ProductDetail />
      <NoiseBackground />
      <Navbar />
      <Hero />
      <FilterNav />
      <Products />
    </>
  );
}

export default App;
