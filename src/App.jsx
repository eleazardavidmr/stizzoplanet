import "./App.css";
import { ProductProvider } from "./Components/Context";
import FilterNav from "./Components/FilterNav";
import { Footer } from "./Components/Footer";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { NoiseBackground } from "./Components/NoiseBackground";
import { OrderCheck } from "./Components/OrderCheck";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
function App() {
  return (
    <>
      <ProductProvider>
        <OrderCheck />
        <ProductDetail />
        {/* NoiseBackground, Navbar, Hero, Products, Footer */}
        <NoiseBackground />
        <Navbar />
        <Hero />
        <FilterNav />
        <Products />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;
