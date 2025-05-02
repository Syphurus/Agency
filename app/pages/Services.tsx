"use client";

import { motion } from "framer-motion";
import React from "react";
import { ChartBar, Users, Globe } from "lucide-react";

const servicesData = [
  {
    Icon: ChartBar,
    title: "Marketing Ads",
    description:
      "Precision-targeted ad strategies on Google, Meta & YouTube. We optimize spend, creatives & conversions for max ROI.",
    color: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
  },
  {
    Icon: Users,
    title: "Social Media Management",
    description:
      "Scheduled, brand-aligned posts that spark engagement on Instagram, LinkedIn & X. Full analytics & community building.",
    color: "bg-gradient-to-br from-pink-500 to-rose-600 text-white",
  },
  {
    Icon: Globe,
    title: "Custom Websites",
    description:
      "High-performance, responsive sites & e-commerce platforms. SEO-ready, UX-first, with lightning-fast load times.",
    color: "bg-gradient-to-br from-green-400 to-teal-500 text-white",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ServicesSection = () => (
  <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <motion.h2
        className="font-display text-5xl md:text-6xl font-extrabold mb-4 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        Tailored Growth Solutions
      </motion.h2>
      <motion.p
        className="font-sans text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        From powerful ad campaigns to immersive online experiences, our
        end-to-end services turbocharge your digital presence.
      </motion.p>

      <motion.div
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {servicesData.map(({ Icon, title, description, color }, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.07 }}
            className={`${color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300`}
          >
            <div className="flex items-center justify-center mb-6">
              <Icon className="h-12 w-12" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-3">{title}</h3>
            <p className="font-sans text-base leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
