"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const ReviewsCarouselSection = () => {
  const [reviewsData, setReviewsData] = useState<
    { name: string; role: string; text: string }[]
  >([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviewsData.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviewsData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [reviewsData]);

  if (reviewsData.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          What Our Clients Say
        </h2>
        <div className="relative min-h-[200px]">
          <AnimatePresence>
            {reviewsData.map(
              (review, idx) =>
                idx === current && (
                  <motion.div
                    key={idx}
                    variants={fadeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-4"
                  >
                    <p className="font-sans text-lg text-gray-700 dark:text-gray-300 mb-6 italic">
                      “{review.text}”
                    </p>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {review.name},
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.role}
                    </span>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarouselSection;
