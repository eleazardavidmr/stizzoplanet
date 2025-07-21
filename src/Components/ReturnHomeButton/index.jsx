import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowLeftIcon from "../../Icons/ArrowLeftIcon";

export default function ReturnHomeButton({ to }) {
  return (
    <Link
      to={to}
      className="flex gap-2 font-semibold bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors"
    >
      <ArrowLeftIcon width={24} height={24} />
      Volver al Inicio
    </Link>
  );
}

ReturnHomeButton.propTypes = {
  to: PropTypes.string.isRequired,
};
