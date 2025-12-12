import { motion } from "framer-motion"; // Opcional: si quieres una entrada suave

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* CAPA 1: ORBES ANIMADOS 
        Usamos Framer Motion para asegurar que se muevan sin configurar Tailwind
      */}
      <div className="absolute inset-0 w-full h-full">
        {/* Orbe 1: Violeta (Arriba Izquierda) */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/40 dark:bg-purple-900/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Orbe 2: Azul/Cyan (Arriba Derecha) */}
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-cyan-300/40 dark:bg-blue-900/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Orbe 3: Rosa (Abajo Centro) */}
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-pink-300/40 dark:bg-rose-900/20 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      {/* CAPA 2: RUIDO (NOISE) CORREGIDO 
        Usamos una imagen de fondo que se repite (background-repeat)
        en lugar de un solo SVG estirado. Esto mantiene el grano fino.
      */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none z-0 mix-blend-overlay"
        style={{
          // Codificamos el SVG directamente en CSS para no depender de archivos
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          // IMPORTANTE: Esto evita el "ruido gigante". Repetimos cuadros de 150px.
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />
    </div>
  );
}
