"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About{" "}
          <span className="bg-gradient-to-br from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Us
          </span>
        </motion.h1>
        <motion.p
          className="font-sans text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We’re Sanidhya and Sharav—a dynamic duo blending marketing expertise
          and web development excellence to fuel your digital growth.
        </motion.p>
      </section>

      {/* Mission & Values Section Redesigned */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Our Mission",
              icon: <span className="text-4xl">🎯</span>,
              content:
                "To empower brands with data-driven marketing and cutting-edge web solutions, fostering sustainable growth and measurable results.",
            },
            {
              title: "Our Values",
              icon: <span className="text-4xl">💡</span>,
              content: (
                <ul className="list-none space-y-2">
                  {[
                    "Data-driven strategies",
                    "Pixel-perfect craftsmanship",
                    "Transparent communication",
                    "Continuous innovation",
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="mr-2 text-indigo-600">✔️</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map(({ title, icon, content }, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg flex flex-col items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="font-display text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {title}
              </h3>
              <div className="font-sans text-base text-gray-600 dark:text-gray-300">
                {content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="font-display text-4xl font-extrabold mb-8 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet the Founders
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Sanidhya */}
            <motion.div
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl shadow-lg text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/sanidhya.jpg"
                  alt="Sanidhya"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h4 className="font-display text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                Sanidhya
              </h4>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-4">
                Marketing Strategist
              </p>
              <p className="font-sans text-base">
                Drives creative ad campaigns, social media growth, and brand
                positioning to maximize ROI.
              </p>
            </motion.div>

            {/* Sharav */}
            <motion.div
              className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl shadow-lg text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/sharav.jpg"
                  alt="Sharav"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h4 className="font-display text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                Sharav
              </h4>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mb-4">
                Lead Developer
              </p>
              <p className="font-sans text-base">
                Architects and builds responsive, high-performance web solutions
                that scale with your business.
              </p>
            </motion.div>
          </div>
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
            Want to Work With Us?
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

export default AboutPage;
