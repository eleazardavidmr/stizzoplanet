import "./styles.css";
export function NoiseBackground() {
  return (
    <>
      <div className="noise fixed inset-x-0 bg-background top-0 -z-50 h-screen">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        ></svg>
      </div>
    </>
  );
}
