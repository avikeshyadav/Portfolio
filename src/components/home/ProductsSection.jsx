import React from "react";

const products = [
  { title: "Portfolio Platform", text: "A modern personal brand experience with strong storytelling and conversion focused sections." },
  { title: "Student Management", text: "Clean records, smart dashboards, and automation for educational institutions." },
  { title: "Facial Recognition Console", text: "Advanced recognition monitoring, student access management, and audit-ready workflow." },
];

const ProductsSection = () => {
  return (
    <section id="products" className="px-6 py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Products</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Built for modern growth and operational clarity</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white">{product.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">{product.text}</p>
              <a href="#contact" className="mt-6 inline-flex text-sm font-semibold text-cyan-400 hover:underline">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
