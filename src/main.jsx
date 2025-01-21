import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ProductProvider } from "./Components/Context";
import Favoritos from "./Pages/Favoritos/index.jsx";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/dama",
      element: <App />,
    },
    {
      path: "/todos",
      element: <App />,
    },
    {
      path: "/caballero",
      element: <App />,
    },
    {
      path: "/favoritos",
      element: <Favoritos />,
    },
  ]);
  return routes;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProductProvider>
  </StrictMode>
);
