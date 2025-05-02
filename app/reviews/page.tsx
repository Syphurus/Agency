"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Link from "next/link";

const cardVariants = {
  offscreen: { opacity: 0, scale: 0.95 },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
};

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await res.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setError("There was an error loading the reviews.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchReviews();
  }, []);

  // If the page is loading or there's an error
  if (loading) {
    return (
      <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen flex justify-center items-center">
        <p>Loading reviews...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen flex justify-center items-center">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-black text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Hero */}
      <section className="h-60 flex items-center justify-center px-6 pt-50 text-center">
        <motion.h1
          className="font-display text-6xl md:text-7xl font-extrabold leading-tight text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Clients <br />
          <span className="bg-gradient-to-br from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Say About Us
          </span>
        </motion.h1>
      </section>

      {/* Reviews Grid */}
      <section className="py-36 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviewsData.map((review) => (
            <motion.div
              key={review.id}
              className="relative bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl shadow-xl"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Quote className="absolute top-6 left-6 h-8 w-8 text-pink-500" />
              <p className="font-sans text-base text-gray-700 dark:text-gray-300 my-6 leading-relaxed">
                “{review.text}”
              </p>
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {review.name}
                </h3>
                <p className="font-sans text-sm text-gray-600 dark:text-gray-400">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-display text-7xl font-bold mb-10">
            Inspired by Their Success?
          </h3>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 rounded-full bg-white text-indigo-600 font-semibold hover:opacity-90 transition"
          >
            Let’s Chat
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default ReviewsPage;
