"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useTheme } from "next-themes";

const socialMediaLinks = [
  {
    label: "Mahadi github account",
    href: "https://github.com/Mahadi1000",
    icon: (
      <Github className="text-stone-900 dark:text-stone-50 hover:text-blue-500 transition ease-in rounded-sm w-5 h-5" />
    ),
  },
  {
    label: "Mahadi Linkedin account",
    href: "https://www.linkedin.com/in/mahadi-hasan-7027b72b4/",
    icon: (
      <Linkedin className="text-stone-900 dark:text-stone-50 hover:text-blue-500 transition ease-in rounded-sm" />
    ),
  },
  {
    label: "Mahadi gmail account",
    href: "mailto:muhammadmahdihasan1@gmail.com",
    icon: (
      <Mail className="text-stone-900 dark:text-stone-50 hover:text-blue-500 transition ease-in rounded-sm" />
    ),
  },
];

const Footer = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  return (
    <footer className="border-t dark:bg-stone-900 dark:border-t-stone-700 dark:shadow w-full">
      <div className="py-8 px-4 container w-full">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col md:flex-row">
              <Image
                src={"/icon.png"}
                width={500}
                height={500}
                alt="Url-Shortener"
                className="w-10 h-10 sm:w-16 sm:h-16"
              />

              {/* <Image src={!isDark ? "/logo.png" : "/logo-white-icon.png"} width={500} height={500} alt='Url-Shortener' className='w-20 h-20' /> */}
              <div>
                <h2 className="text-base lg:text-xl font-bold mb-4">
                  About Us
                </h2>
                <p className="text-stone-400 dark:text-stone-50 text-xs lg:text-sm whitespace-pre-line overflow-hidden">
                  We are a URL shortener service that helps you shorten your
                  long{"\n"}
                  URLs and track their performance.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-base lg:text-xl font-bold mb-4">Contact</h2>
              <p className="text-stone-400 dark:text-stone-50 text-xs lg:text-sm">
                Email:{" "}
                <a href="mailto:ivantom.python@gmail.com" className="font-bold">
                  muhammadmahdihasan1@gmail.com
                </a>
                <br />
                Address: Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-2">
            {socialMediaLinks.map((link, index) => (
              <Link key={index} aria-label={link.label} href={link.href}>
                <span className="text-stone-800">{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-between">
          {/* <p className="flex text-base items-center gap-1">
            <span>&copy; {new Date().getFullYear()}</span>
            <a href="/" className="font-bold">Url-Shortener</a>
            <div className="w-0.5 my-1 h-3 mx-0.5 bg-gray-400"></div>
            <span>Tomdieu Ivan</span>
            <span>. All rights reserved.</span>
          </p> */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © Url-Shortener. All rights reserved.
          </p>

          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
