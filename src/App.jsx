import "./App.css";
import { ProductProvider } from "./Components/Context";
import { Footer } from "./Components/Footer";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { NoiseBackground } from "./Components/NoiseBackground";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
function App() {
  return (
    <>
      <ProductProvider>
        <NoiseBackground />
        <Navbar />
        <Hero />
        <Products />
        <ProductDetail />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default App;