"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4 bg-white dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-black dark:text-white">
          We Build Brands That{" "}
          <span className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Stand Out
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Custom websites, ads, and social media that drive growth.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="
              px-8 py-3 rounded-2xl font-medium
              bg-gradient-to-br from-purple-500 to-indigo-600 text-white
              transition-colors duration-200
            "
          >
            Get Started
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/reviews"
            className="
              px-8 py-3 rounded-2xl font-medium
              border border-gray-300 dark:border-gray-600
              bg-gradient-to-br from-green-400 to-teal-500 text-white
              transition-colors duration-200
            "
          >
            See Our Work
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default Hero;
