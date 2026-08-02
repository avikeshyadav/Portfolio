import React from "react";

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%)] px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Smart AI-powered solutions for modern brands
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build beautiful digital experiences with confidence.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We create high-performance web products, modern portfolios, and intelligent management platforms for businesses that want to grow faster.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <a href="#products" className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600">
              Explore Products
            </a>
            <a href="#services" className="rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400">
              View Services
            </a>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Live Preview</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Facial Recognition Suite</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Secure identity management, smart monitoring, and efficient access control in one elegant dashboard.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">
                <span>Student Records</span>
                <span className="font-semibold text-cyan-400">24/7</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">
                <span>Face Verification</span>
                <span className="font-semibold text-cyan-400">98.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
