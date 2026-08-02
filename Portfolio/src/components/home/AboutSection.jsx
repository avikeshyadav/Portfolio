import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="px-6 py-20 bg-slate-900/70">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">About</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">We blend strategy, design, and engineering.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Our work is focused on creating polished digital experiences that feel premium, scale smoothly, and support real business goals.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-4">
              <span className="text-slate-300">Fast delivery</span>
              <span className="font-semibold text-cyan-400">100%</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-4">
              <span className="text-slate-300">Client satisfaction</span>
              <span className="font-semibold text-cyan-400">98%</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 px-4 py-4">
              <span className="text-slate-300">Custom solutions</span>
              <span className="font-semibold text-cyan-400">24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
