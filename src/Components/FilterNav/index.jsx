import { useContext } from "react";
import { ProductContext } from "../Context";
import { NavLink } from "react-router-dom";
export default function FilterNav() {
  const context = useContext(ProductContext);
  return (
    <>
      <section className="flex items-center justify-center mx-auto my-5">
        <NavLink
          to="/dama"
          className={({ isActive }) => {
            return isActive
              ? "text-xs px-4 py-1.5 transition-all md:px-5 md:py-2.5 text-center text-[12px]  me-2 mb-2 border-2 bg-primary/60 border-primary/60 hover:bg-primary text-white rounded-full"
              : "text-xs px-4 py-1.5 md:px-5 md:py-2.5 text-center  me-2 mb-2 border-2 border-primary/60 hover:bg-primary text-white rounded-full";
          }}
          onClick={() => context.setSelectedCategory("dama")}
        >
          Dama
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive
              ? "text-xs px-4 py-1.5 transition-all md:px-5 md:py-2.5 text-center me-2 mb-2 text-[12px]  border-2 bg-primary/60 border-primary/60 hover:bg-primary text-white rounded-full"
              : "text-xs px-4 py-1.5 md:px-5 md:py-2.5 text-center me-2 mb-2 text-[12px]  border-2 border-primary/60 hover:bg-primary text-white rounded-full";
          }}
          onClick={() => context.setSelectedCategory(null)}
        >
          Todos
        </NavLink>
        <NavLink
          to="/caballero"
          className={({ isActive }) => {
            return isActive
              ? "text-xs px-4 py-1.5 transition-all md:px-5 md:py-2.5 text-center me-2 mb-2 text-[12px]  border-2 bg-primary/60 border-primary/60 hover:bg-primary text-white rounded-full"
              : "text-xs px-4 py-1.5 md:px-5 md:py-2.5 text-center me-2 mb-2  text-[12px]  border-2 border-primary/60 hover:bg-primary text-white rounded-full";
          }}
          onClick={() => context.setSelectedCategory("caballero")}
        >
          Caballero
        </NavLink>
      </section>
    </>
  );
}
