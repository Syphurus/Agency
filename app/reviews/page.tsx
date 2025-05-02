"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
};

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();

        // 1️⃣ Check HTTP status first
        if (!res.ok) {
          console.error("API error loading reviews:", data);
          return; // bail out, don’t call setReviewsData
        }

        // 2️⃣ Make sure the payload is actually an array
        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }

        // ✅ Now it’s safe to set state
        setReviewsData(data);
      } catch (err) {
        console.error("Network error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading…</p>;
  }

  return (
    <main>
      {reviewsData.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="grid gap-6">
          {reviewsData.map((r) => (
            <motion.div
              key={r.id}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Quote className="h-6 w-6 text-pink-500" />
              <p className="mt-4">“{r.text}”</p>
              <h3 className="mt-2 font-bold">{r.name}</h3>
              <p className="text-sm text-indigo-600">{r.role}</p>
            </motion.div>
          ))}
        </div>
      )}
      <section className="mt-12 text-center">
        <Link
          href="/contact"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full"
        >
          Let’s Chat
        </Link>
      </section>
    </main>
  );
};

export default ReviewsPage;
