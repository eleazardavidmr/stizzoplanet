export function Footer() {
  return (
    <>
      <footer className="w-screen flex p-5 bg-blue-900 dark:bg-slate-900 text-center md:p-8">
        <div className="flex flex-col text-white/60 items-center justify-between mx-auto w-auto gap-5 md:flex-row md:gap-10">
          <p className="">Desarrolllado por Eleazar Muñoz</p>
          <a className="font-bold underline" href="https://edmr.surge.sh">
            edmr.surge.sh
          </a>
        </div>
      </footer>
    </>
  );
}
