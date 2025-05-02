"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChartBar, Users, Globe } from "lucide-react";
import Link from "next/link";

const servicesList = [
  {
    Icon: ChartBar,
    title: "Marketing Ads",
    details:
      "Custom ad campaigns on Google, Meta & YouTube. We optimize budgets, creatives, and targeting to maximize ROI.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    Icon: Users,
    title: "Social Media Management",
    details:
      "End-to-end content strategy for Instagram, LinkedIn & X. Includes content creation, scheduling, and analytics.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    Icon: Globe,
    title: "Custom Websites",
    details:
      "Responsive, SEO-friendly websites and e-commerce platforms. Built for speed, performance, and conversions.",
    gradient: "from-green-400 to-teal-500",
  },
];

const ServicesPage = () => {
  return (
    <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Hero */}
      <section className="h-[60vh] flex flex-col items-center justify-center px-6 pb-0 mb-0 text-center">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="font-sans text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore our full suite of digital solutions designed to grow your
          brand and drive revenue.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="pb-26 pt-0 mt-0 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map(({ Icon, title, details, gradient }, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${gradient} text-white flex flex-col items-start`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              <Icon className="h-10 w-10 mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
              <p className="font-sans text-base leading-relaxed mb-6">
                {details}
              </p>
              <Link
                href="/contact"
                className="mt-auto inline-flex items-center font-semibold underline"
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-48 px-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-display text-7xl font-bold mb-10">
            Ready to elevate your brand?
          </h3>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 rounded-full bg-white text-indigo-600 font-semibold hover:opacity-90 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default ServicesPage;
