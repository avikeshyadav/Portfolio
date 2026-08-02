import React from "react";

const services = [
  { title: "Web Development", description: "Modern responsive websites and React-based apps." },
  { title: "UI/UX Design", description: "Elegant interfaces crafted for user delight." },
  { title: "AI Dashboards", description: "Smart management systems for students, staff, and operations." },
  { title: "Growth Strategy", description: "Brand presence, product positioning, and digital marketing support." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="px-6 py-20 bg-slate-900/70">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Services</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Everything you need to launch faster</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
