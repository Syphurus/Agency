"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h3 className="font-display text-2xl text-gray-900 dark:text-white mb-4">
            Your SaaS
          </h3>
          <p className="font-sans text-sm">
            We empower brands with tailored digital marketing, social media
            management, and custom web solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg text-gray-900 dark:text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 font-sans text-sm">
            {["Services", "Reviews", "Pricing", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-900 hover:text-gray-400 dark:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-display text-lg text-gray-900 dark:text-white mb-3">
            Resources
          </h4>
          <ul className="space-y-2 font-sans text-sm">
            {[
              { name: "Blog", href: "/blog" },
              { name: "FAQ", href: "/faq" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
            ].map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="text-gray-900 hover:text-gray-400 dark:text-white transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="font-display text-lg text-gray-900 dark:text-white mb-3">
            Connect With Us
          </h4>
          <div className="flex space-x-4 mb-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-gray-900 hover:text-gray-400 dark:text-white transition-colors" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-gray-900 hover:text-gray-400 dark:text-white transition-colors" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-gray-900 hover:text-gray-400 dark:text-white transition-colors" />
            </Link>
          </div>
          <div className="flex items-center space-x-2 font-sans text-sm">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:info@yoursaas.com"
              className="text-gray-900 hover:text-gray-400 dark:text-white transition-colors"
            >
              info@yoursaas.com
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center font-sans text-sm">
        © {currentYear} Your SaaS. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
