'use client';

import { useState, useEffect } from 'react';

const BOOT_LINES = [
  '> INICIANDO OL_SYSTEM_KERNEL...',
  '> CARGANDO MÓDULOS DE INGENIERÍA...',
  '> COMPILANDO DEPENDENCIAS...',
  '> [ OK ] ACCESO CONCEDIDO.',
];

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setLines([]);

    const lineTimers = BOOT_LINES.map((line, index) =>
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, (index + 1) * 200)
    );

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-label="Secuencia de inicio del sistema"
      className="fixed inset-0 z-50 bg-black text-white font-mono flex flex-col justify-center p-6 sm:p-12 select-none"
    >
      <div className="mx-auto w-full max-w-2xl border-2 border-white bg-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
        <div className="mb-4 flex items-center justify-between border-b-2 border-white pb-3 text-xs font-bold uppercase tracking-widest">
          <span className="text-red-600">OL_BOOTLOADER // V1.0</span>
          <span className="bg-red-600 px-2 py-0.5 text-black">SYS_INIT</span>
        </div>

        <div className="space-y-2.5 text-sm sm:text-base font-bold tracking-wider">
          {lines.map((line, index) => {
            const isSuccess = line.includes('[ OK ]');
            return (
              <p
                key={index}
                className={isSuccess ? 'text-red-600' : 'text-white'}
              >
                {line}
              </p>
            );
          })}
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-block h-4 w-2.5 bg-red-600 animate-blink" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
