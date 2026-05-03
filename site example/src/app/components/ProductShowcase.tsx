import { motion } from "motion/react";
import { Star, Zap, Eye, Sparkles, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProductShowcase() {
  const products = [
    {
      name: "Samsung Neo QLED 8K",
      model: "QN900D - 2026 Model",
      price: "€4.999",
      originalPrice: "€5.999",
      image: "https://images.unsplash.com/photo-1662557499872-8920a31e2f32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      specs: ["8K Resolution", "Neural Quantum Processor", "Infinity Screen", "Object Tracking Sound Pro"],
      badge: "Bestseller",
      rating: 4.9
    },
    {
      name: "LG OLED evo G4",
      model: "OLED83G4PSA - 2026",
      price: "€3.999",
      originalPrice: "€4.799",
      image: "https://images.unsplash.com/photo-1667510436110-79d3dabc2008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      specs: ["4K OLED", "α11 AI Processor", "Dolby Vision IQ", "Perfect Black"],
      badge: "Nieuw",
      rating: 5.0
    },
    {
      name: "Sony Bravia XR A95L",
      model: "XR-77A95L - 2026",
      price: "€4.499",
      originalPrice: "€5.299",
      image: "https://images.unsplash.com/photo-1774301266018-57c0b190ed43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      specs: ["QD-OLED", "Cognitive Processor XR", "Acoustic Surface Audio+", "Perfect for PS5"],
      badge: "Premium",
      rating: 4.8
    },
    {
      name: "Philips OLED+908",
      model: "77OLED908 - 2026",
      price: "€3.299",
      originalPrice: "€3.999",
      image: "https://images.unsplash.com/photo-1650091507687-5ea34d80e674?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      specs: ["OLED EX", "P5 AI Perfect Picture", "Ambilight 4-zijdig", "Bowers & Wilkins Audio"],
      badge: "Top Choice",
      rating: 4.7
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">2026 Collection</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nieuwste Modellen
            </span>
            <br />
            <span>van 2026</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ontdek de meest geavanceerde TV's met cutting-edge technologie.
            8K resolutie, AI-processing en ongeëvenaard beeld.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50"
            >
              {/* Badge */}
              <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold shadow-lg">
                {product.badge}
              </div>

              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-slate-950">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold flex items-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Bekijk Details
                  </motion.button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
                    <p className="text-slate-400 text-sm">{product.model}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-yellow-400">{product.rating}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-slate-400">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-slate-500 line-through mb-1">
                      {product.originalPrice}
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {product.price}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold shadow-lg shadow-purple-500/50"
                  >
                    Bestel Nu
                  </motion.button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full font-bold text-lg border border-white/20"
          >
            Bekijk Alle 500+ Modellen
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
