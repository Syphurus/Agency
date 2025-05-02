"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
          Ready to Boost Your Business?
        </h2>
        <p className="font-sans text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join hundreds of brands who trust us to drive growth and transform
          their online presence.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;
