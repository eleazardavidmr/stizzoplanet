import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../Context";
export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  data,
  className = "overflow-hidden relative mx-5 cursor-pointer mb-5 w-[50%]",
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const context = useContext(ProductContext);
  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };
  return (
    <div className={className}>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      <div className="absolute inset-0 flex items-center justify-between z-10">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/20 hover:bg-white/40 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </button>

        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/20 hover:bg-white/40 z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 right-0 left-0 ">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
  data: PropTypes.object, // Update:
};
