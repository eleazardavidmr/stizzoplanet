import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

import { ProductProvider } from "./Components/Context";
import Favoritos from "./Pages/Favoritos/index.jsx";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/dama", element: <App /> },
    { path: "/todos", element: <App /> },
    { path: "/caballero", element: <App /> },
    { path: "/favoritos", element: <Favoritos /> },
  ]);
  return routes;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ProductProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ProductProvider>
    </HelmetProvider>
  </StrictMode>,
);
