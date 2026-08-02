import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Portfolio Studio</h3>
          <p className="mt-2 text-sm text-slate-400">
            Crafting smart products, modern brands, and future-ready experiences.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#home" className="transition hover:text-cyan-400">Home</a>
          <a href="#services" className="transition hover:text-cyan-400">Services</a>
          <a href="#products" className="transition hover:text-cyan-400">Products</a>
          <a href="#contact" className="transition hover:text-cyan-400">Contact</a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Portfolio Studio. All rights reserved.
      </div>
    </footer>
  );
};
