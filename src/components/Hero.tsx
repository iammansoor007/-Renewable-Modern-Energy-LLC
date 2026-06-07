import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Home, Sun, Droplets } from "lucide-react";

import heroBg from "@/assets/hero-bg.png";
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
  FiZap,
  FiClock,
  FiShield,
  FiTool,
  FiSun,
  FiCloudRain,
  FiAward,
  FiDroplet,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";



// MODERN PROFESSIONAL FORM COMPONENT - UPDATED FOR ROOFING & SOLAR SERVICES
const RoofingInquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    serviceType: "roof-inspection",
    serviceDetails: "",
    email: "",
    phone: "",
    address: "",
    urgency: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(520);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(Math.max(height, 500));
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Roofing quote request:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        serviceType: "roof-inspection",
        serviceDetails: "",
        email: "",
        phone: "",
        address: "",
        urgency: "standard",
      });
    }, 3000);
  };

  const serviceOptions = [
    {
      value: "roof-inspection",
      label: "Roof Inspection",
      icon: FiSearch,
      desc: "Thorough assessment of your property's condition",
    },
    {
      value: "roof-replacement",
      label: "Roof Replacement",
      icon: FiHome,
      desc: "Expert full roof installation services",
    },
    {
      value: "solar-services",
      label: "Solar Services",
      icon: FiSun,
      desc: "Professional solar panel installation and removal",
    },
    {
      value: "roof-repair",
      label: "Roof Repair",
      icon: FiTool,
      desc: "Fixing leaks, damage, and wear",
    },
    {
      value: "maintenance",
      label: "Maintenance",
      icon: FiTool,
      desc: "Tune-ups and cleaning to extend roof life",
    },
    {
      value: "gutters",
      label: "Gutters",
      icon: FiDroplet,
      desc: "Complete gutter installation and cleaning",
    },
  ];

  const urgencyOptions = [
    { value: "emergency", label: "🚨 Urgent (ASAP)" },
    { value: "soon", label: "⚡ Soon (1-2 weeks)" },
    { value: "planned", label: "📅 Planning (1-3 months)" },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];
  const stepLabels = ["Your Info", "Project Details", "Contact"];

  const SelectedIcon =
    serviceOptions.find((opt) => opt.value === formData.serviceType)?.icon ||
    FiHome;

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 will-change-transform transform-gpu"
      >
        <div className="relative flex-shrink-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent border-b border-white/10">
          <div className="px-5 sm:px-6 md:px-8 py-4 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    Free Estimate
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">
                    Get your custom quote in 3 easy steps
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${step >= i
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white/10 text-gray-400"
                        }`}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300 ml-1">
                  Steps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: `${containerHeight}px` }}
          className="transition-all duration-300 ease-in-out"
        >
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="px-4 sm:px-6 md:px-8 py-4 sm:py-6"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/45 ring-4 ring-primary/20"
                            : isCompleted
                              ? "bg-primary/35 text-white border border-primary/40"
                              : "bg-white/5 border border-white/10 text-gray-500"
                            }`}
                        >
                          {isCompleted ? (
                            <FiCheckCircle className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-4.5 h-4.5" />
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-bold mt-2 tracking-wider uppercase transition-colors ${isActive
                            ? "text-primary"
                            : isCompleted
                              ? "text-primary/70"
                              : "text-gray-500"
                            }`}
                        >
                          {stepLabels[s - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-primary rounded-full shadow-[0_0_8px_rgba(185,28,28,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiUser className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-gray-300">
                          Step 1 of 3 - Tell us who you are
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          First name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all font-medium text-sm"
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Last name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all font-medium text-sm"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Property address
                        </label>
                        <div className="relative group">
                          <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all font-medium text-sm"
                            placeholder="123 Main St, Canton, MI"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                          !formData.firstName ||
                          !formData.lastName ||
                          !formData.address
                        }
                        className="w-full bg-gradient-to-r from-primary to-red-600 text-white py-3.5 rounded-xl font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group text-sm active:scale-95"
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiTool className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-gray-300">
                          Step 2 of 3 - What service do you need?
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Service needed
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl py-3.5 pl-12 pr-10 text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm font-medium"
                            style={{ height: "52px" }}
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-[#181818] text-white">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <SelectedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Urgency
                        </label>
                        <div className="relative">
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full bg-[#121212] border border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all appearance-none cursor-pointer text-sm font-medium"
                          >
                            {urgencyOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-[#181818] text-white">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Additional details{" "}
                          <span className="text-gray-500 font-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          name="serviceDetails"
                          value={formData.serviceDetails}
                          onChange={handleChange}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all resize-none text-sm font-medium"
                          placeholder="Tell us about your project, colors, etc."
                          style={{ minHeight: "80px" }}
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border border-white/10 text-white py-3.5 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm active:scale-95"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-gradient-to-r from-primary to-red-600 text-white py-3.5 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group text-sm active:scale-95"
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-2 mb-2">
                        <FiShield className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-gray-300">
                          Step 3 of 3 - How should we reach you?
                        </span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Email address
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all font-medium text-sm"
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Phone number
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/20 transition-all font-medium text-sm"
                            placeholder="+1 (386) 246-7999"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border border-white/10 text-white py-3.5 rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all text-sm active:scale-95"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={
                            isSubmitting || !formData.email || !formData.phone
                          }
                          className="flex-1 bg-gradient-to-r from-primary to-red-600 text-white py-3.5 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group text-sm active:scale-95"
                        >
                          {isSubmitting ? "Sending..." : "Get Free Estimate"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-12 text-center flex flex-col items-center justify-center"
              style={{ minHeight: `${containerHeight}px` }}
            >
              <div className="w-20 h-20 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                <FiCheckCircle className="w-10 h-10 text-primary animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Estimate Request Sent!
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
                Thanks for contacting Renewable Modern Energy LLC. We'll reach out within 24 hours with your free estimate.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  const { badge, headlines, description, buttons, stats } = completeData.hero;

  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
    FiDollarSign: FiDollarSign,
    FiClock: FiClock,
    FiShield: FiShield,
    FiHome: FiHome,
    FiTool: FiTool,
    FiMapPin: FiMapPin,
    FiMessageSquare: FiMessageSquare,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black isolate flex items-center"
    >
      {/* Dynamic glow blobs in the background */}
      <div className="absolute top-1/4 left-1/12 w-[350px] h-[350px] bg-primary/25 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/12 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

      <div className="absolute inset-0 -z-20">
        <motion.img
          src={heroBg}
          alt="Renewable Modern Energy LLC - Professional renovation & roofing services"
          loading="eager"
          {...({ fetchpriority: "high" } as any)}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="w-full h-full object-cover absolute inset-0 opacity-95 will-change-transform"
        />
        {/* Softened Dark Overlays to brighten the hero section */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Softened Directional Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-28 pb-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
              <motion.div
                className="mt-2 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mx-auto lg:mx-0 border border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-white text-[10px] uppercase tracking-[0.3em] font-black font-heading leading-none">
                  {badge}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white lg:leading-[1.15] tracking-tight font-heading w-full max-w-none text-center lg:text-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Harness the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-rose-600 font-extrabold relative">Solar</span>. Expert Installations Await You.
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal text-center lg:text-left mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {description}
              </motion.p>

              <motion.div
                className="w-full mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button, idx) => {
                    const Icon = iconComponents[button.icon as keyof typeof iconComponents];
                    const isFirst = idx === 0;

                    return (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className={`
                          group relative overflow-hidden px-8 py-4 rounded-xl w-full sm:w-auto 
                          inline-flex items-center justify-center gap-3 text-base font-bold transition-all duration-300
                          ${isFirst
                            ? "bg-gradient-to-r from-primary to-red-600 text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:brightness-115"
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                          }
                          hover:scale-[1.02] active:scale-[0.98]
                        `}
                      >
                        <span>{button.text}</span>
                        {Icon && (
                          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-white" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-6 border-t border-white/10 w-full mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                {stats.map((stat, idx) => {
                  const StatIcon =
                    iconComponents[stat.icon as keyof typeof iconComponents];
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 px-4.5 transition-all duration-300 hover:bg-white/10 hover:border-primary/30 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-105">
                        {StatIcon ? (
                          <StatIcon className="w-4.5 h-4.5 text-primary" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="text-base sm:text-lg font-extrabold text-white leading-none mb-1">
                          {stat.value}
                        </div>
                        <div className="text-[9px] tracking-wider uppercase font-bold text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <RoofingInquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Elegant Transition Fade to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
