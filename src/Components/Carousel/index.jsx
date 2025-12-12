import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../Context";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  data, // Objeto del producto para abrir el detalle
  className = "relative overflow-hidden w-full md:w-[50%] h-64 md:h-auto rounded-xl shadow-md group",
}) {
  const [curr, setCurr] = useState(0);
  const context = useContext(ProductContext);

  const prev = (e) => {
    e?.stopPropagation(); // Evita abrir el detalle del producto al hacer clic
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = (e) => {
    e?.stopPropagation(); // Evita abrir el detalle del producto al hacer clic
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  // Lógica de Auto-slide inteligente: Se reinicia si el usuario interactúa manualmente
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, curr]); // Añadimos 'curr' para resetear el timer al cambiar manual

  const handleImageClick = () => {
    if (data && context.openProductDetail) {
      context.setProductToShow(data);
      context.openProductDetail();
    }
  };

  return (
    <div className={className}>
      {/* Contenedor de Slides con evento de Click para abrir detalle */}
      <div
        onClick={handleImageClick}
        className="flex transition-transform ease-out duration-500 h-full cursor-pointer"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      {/* Flechas de Navegación (Solo visibles en Hover para desktop) */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Botón Anterior */}
        <button
          onClick={prev}
          className="pointer-events-auto p-2 rounded-full bg-black/30 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all shadow-lg transform hover:scale-110"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </button>

        {/* Botón Siguiente */}
        <button
          onClick={next}
          className="pointer-events-auto p-2 rounded-full bg-black/30 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all shadow-lg transform hover:scale-110"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </button>
      </div>

      {/* Indicadores (Puntos) */}
      <div className="absolute bottom-0 w-full py-4 flex justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`
              transition-all duration-300 w-2 h-2 rounded-full shadow-sm
              ${curr === i ? "bg-white w-4" : "bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
  data: PropTypes.object,
  className: PropTypes.string,
};
