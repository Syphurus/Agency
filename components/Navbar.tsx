"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md bg-white dark:bg-gray-900 transition-colors duration-300 rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-black dark:text-white"
        >
          Nuvana
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            Home
          </Link>
          {["About", "Services", "Reviews", "Contact"].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase()}`}
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 text-black bg-white dark:text-white dark:bg-gray-900 border-0"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 rounded-b-2xl"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-black dark:text-white text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Home
              </Link>
              {["About", "Services", "Reviews", "Contact"].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-black dark:text-white text-lg hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
