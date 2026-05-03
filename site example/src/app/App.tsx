import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Menu, X, ChevronRight, Star, MessageCircle, Phone,
  Wrench, Sparkles, Play, Check, Award, TrendingUp,
  Zap, Shield, Clock, Users
} from "lucide-react";
import { Hero } from "./components/Hero";
import { AIFeatures } from "./components/AIFeatures";
import { ProductShowcase } from "./components/ProductShowcase";
import { SpecialOffers } from "./components/SpecialOffers";
import { ReviewsSection } from "./components/ReviewsSection";
import { RepairService } from "./components/RepairService";
import { ChatBot } from "./components/ChatBot";
import { Footer } from "./components/Footer";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HelloTV
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {["TV's", "Audio", "Aanbiedingen", "AI Service", "Reparatie", "Winkels"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Contact
              </motion.button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 z-40 bg-slate-950 md:hidden pt-20"
        >
          <div className="flex flex-col gap-6 p-8">
            {["TV's", "Audio", "Aanbiedingen", "AI Service", "Reparatie", "Winkels"].map((item) => (
              <a key={item} href="#" className="text-xl">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <Hero />
      <AIFeatures />
      <ProductShowcase />
      <SpecialOffers />
      <RepairService />
      <ReviewsSection />
      <Footer />
      <ChatBot />
    </div>
  );
}
