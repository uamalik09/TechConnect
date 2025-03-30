import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";

const faqData = [
  { question: "Who can participate in the hackathon?", answer: "Anyone with an interest in technology and problem-solving can participate." },
  { question: "Is the hackathon online, offline, or hybrid?", answer: "The hackathon will be conducted in a hybrid mode with both online and offline events." },
  { question: "Is there a participation fee for the hackathon?", answer: "No, participation is completely free!" },
  { question: "What is the duration of the hackathon?", answer: "The hackathon will last for 36 hours non-stop!" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Header with Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <SiNintendoswitch className="text-4xl text-cyan-400 animate-pulse" />
        <h1 className="text-3xl font-bold text-cyan-400">NITK Hackathon FAQ</h1>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg mb-4 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-lg font-semibold text-cyan-300 hover:bg-gray-700 transition-all"
            >
              {faq.question}
              <FaChevronDown className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-gray-700 text-cyan-200"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
