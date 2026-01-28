import "./App.css";
import FilterNav from "./Components/FilterNav";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { AuroraBackground } from "./Components/AuroraBackground";
import { OrderCheck } from "./Components/OrderCheck";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        <title>Stizzo Planet | Tienda de Sneakers en Cali</title>
        <meta
          name="description"
          content="Encuentra las mejores zapatillas y sneakers en Cali. Envíos gratis en Cali y a todo Colombia. Nike, Adidas, New Balance y más."
        />
        <meta
          name="keywords"
          content="sneakers, cali, colombia, zapatos, tenis, nike, adidas"
        />
      </Helmet>
      <OrderCheck />
      <ProductDetail />
      <AuroraBackground />
      <Navbar />
      <Hero />
      <FilterNav />
      <Products />
    </>
  );
}

export default App;
