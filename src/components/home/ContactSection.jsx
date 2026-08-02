import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="px-6 py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Contact</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Ready to launch your next big idea?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          Let’s build a product that feels premium, performs fast, and supports your long-term growth.
        </p>
        <a href="mailto:hello@yourportfolio.com" className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600">
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
