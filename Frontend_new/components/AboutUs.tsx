"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const AboutUs: React.FC = () => {
  return (
    <div id="about-us" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          About Us
        </motion.h1>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-8">
            <motion.div className="md:w-1/2 mb-8 md:mb-0" whileHover={{ scale: 1.05 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-us.jpg-K0CeiIyMhdiHEz0y4QhNQwgto3BQ3r.jpeg"
                alt="About Us"
                width={400}
                height={400}
                className="object-cover rounded-lg"
              />
            </motion.div>
            <div className="md:w-1/2 md:pl-8">
              <p className="text-lg leading-relaxed">
                Our AI-driven approach enhances the{" "}
                <strong>Uttar Pradesh Integrated Grievance Redressal System (IGRS)</strong> by providing a{" "}
                <strong>comprehensive and intelligent framework</strong> for addressing citizen concerns. Leveraging{" "}
                <strong>Natural Language Processing (NLP), predictive analytics, and data visualization</strong>, our{" "}
                <strong>Decision Support System (DSS)</strong> empowers policymakers to analyze, prioritize, and resolve
                grievances more effectively. This ensures a <strong>faster, more transparent, and accountable</strong>{" "}
                redressal process, fostering trust between the government and citizens. Through{" "}
                <strong>technology-driven innovation</strong>, we aim to transform governance, streamline
                decision-making, and enhance overall citizen satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

