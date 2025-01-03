import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
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
  ]);
  return routes;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
