"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        console.error("Submission failed");
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 py-16 pt-30 px-6">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          className="font-display text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in{" "}
          <span className="bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h1>
        <motion.p
          className="font-sans text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Whether you have a question, project idea, or just want to say hello,
          our team is here to help.
        </motion.p>
      </section>

      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
        {/* Contact Details */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-start">
            <MapPin className="h-6 w-6 text-indigo-600 mr-4" />
            <div>
              <h3 className="font-display text-xl font-bold text-gray-800 dark:text-gray-200">
                Our Office
              </h3>
              <p className="font-sans text-base text-gray-600 dark:text-gray-400">
                Faridabad, Haryana 121002
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-6 w-6 text-indigo-600 mr-4" />
            <div>
              <h3 className="font-display text-xl font-bold text-gray-800 dark:text-gray-200">
                Call Us
              </h3>
              <p className="font-sans text-base text-gray-600 dark:text-gray-400">
                +91 92892 05635
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-6 w-6 text-indigo-600 mr-4" />
            <div>
              <h3 className="font-display text-xl font-bold text-gray-800 dark:text-gray-200">
                Email
              </h3>
              <p className="font-sans text-base text-gray-600 dark:text-gray-400">
                nuvanaworkspace@gmail.com
              </p>
            </div>
          </div>

          {/* Placeholder for map or image */}
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl shadow-lg space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="font-display text-2xl font-bold mb-4">
                Thank you!
              </h2>
              <p className="font-sans text-base text-gray-700 dark:text-gray-300">
                Your message has been sent. We’ll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-800 dark:text-gray-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-800 dark:text-gray-200"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-800 dark:text-gray-200"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none text-gray-800 dark:text-gray-200"
              />

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </>
          )}
        </motion.form>
      </div>
    </main>
  );
};

export default ContactPage;
