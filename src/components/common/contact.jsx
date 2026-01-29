"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
    businessGoals: "", // 👈 added
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sheetName: "ContactUs", // 👈 goes into ContactUs tab
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
          businessGoals: "",
          consent: false,
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center md:px-8 px-6  py-4 md:p-12">
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-start">
          {/* Left Column */}
          <div className="space-y-4 md:space-y-5">
            <div>
              <motion.h1 className="md:text-6xl text-4xl font-semibold md:mb-3 mb-2 tracking-tight"
               initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
                Contact{" "}
                <em className="font-instrument-italic font-light">Us</em>
              </motion.h1>
              <motion.p className="text-gray-600 md:text-xl leading-relaxed"
                       initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}>
                Reach out with your project, questions, or ideas.
              </motion.p>
            </div>

            <motion.a href="tel:+18076977177" className="group inline-block"
                     initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}>
              <button className="relative overflow-hidden bg-[var(--color-primary)] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base">
                <span className="relative z-10">Call Now</span>
                {/* Shiny effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </motion.a>
          </div>

          {/* Right Column - Form */}
          <motion.div 
          initial={{ opacity: 0 , y: 30}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}>
          <Card className="shadow-lg">
            <CardContent className="">
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What best describes you?
                    </label>
                    <select
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full h-9 rounded-md border px-3 text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Creator">Creator</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Agency">Agency</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How can we support your business goals?
                  </label>
                  <Textarea
                    id="businessGoals"
                    value={formData.businessGoals}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows={4}
                    required
                  />
                </div>

                {/* ✅ Full consent text preserved */}
                <div className="flex items-start text-sm text-gray-600 leading-relaxed mt-4 px-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="consent" className="cursor-pointer">
                    By clicking "Continue", I consent to being contacted by DSQR
                    Studio Inc. through various methods, including live agents,
                    artificial or prerecorded voices, automated or manual SMS
                    texts, and email. I also agree to the{" "}
                    <a
                      href="/privacy-policy"
                      // target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms-of-service"
                      // target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Service
                    </a>
                    .
                  </label>
                </div>

                <div className="flex justify-center">
                  <div className="group inline-block">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative overflow-hidden bg-[var(--color-primary)] hover:bg-[#cfee04] text-black font-medium px-6 py-2 rounded-full shadow-md cursor-pointer text-sm sm:text-base"
                    >
                      <span className="relative z-10">
                        {loading ? "Submitting..." : "Submit"}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </div>
                </div>
                {success && (
                  <p className="text-green-600 mt-2 text-center">
                    Form submitted successfully ✅
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
