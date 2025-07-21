import "./App.css";
import FilterNav from "./Components/FilterNav";
import { Hero } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { NoiseBackground } from "./Components/NoiseBackground";
import { OrderCheck } from "./Components/OrderCheck";
import { ProductDetail } from "./Components/ProductDetail";
import { Products } from "./Components/Products";
function App() {
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
