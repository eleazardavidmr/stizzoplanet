import "./App.css";
import "../src/a11y.css";
import FilterNav from "./Components/FilterNav";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { AuroraBackground } from "./Components/AuroraBackground";
import { OrderCheck } from "./Components/OrderCheck";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
function App() {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <OrderCheck />
      <ProductDetail />
      <AuroraBackground />
      <Navbar />

      <main id="main-content">
        <Hero />
        <FilterNav />
        <Products />
      </main>
    </>
  );
}

export default App;
