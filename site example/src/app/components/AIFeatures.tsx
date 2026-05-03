import { motion } from "motion/react";
import { MessageCircle, Phone, Sparkles, Zap, Brain, Bot } from "lucide-react";

export function AIFeatures() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chatbot Assistent",
      description: "24/7 beschikbaar om al je vragen te beantwoorden. Onze AI-chatbot helpt je de perfecte TV te kiezen.",
      gradient: "from-blue-600 to-cyan-600",
      benefits: ["Direct antwoord", "Productadvies", "Specificaties vergelijken"]
    },
    {
      icon: Phone,
      title: "AI Calling Agent",
      description: "Bel met onze slimme AI-agent voor persoonlijk advies. Natuurlijke gesprekken, instant oplossingen.",
      gradient: "from-purple-600 to-pink-600",
      benefits: ["Spraakherkenning", "Persoonlijk advies", "Afspraak maken"]
    },
    {
      icon: Brain,
      title: "Smart Aanbevelingen",
      description: "AI-gedreven productaanbevelingen gebaseerd op jouw voorkeuren en kijkgedrag.",
      gradient: "from-orange-600 to-red-600",
      benefits: ["Gepersonaliseerd", "Machine learning", "Beste prijs/kwaliteit"]
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full border border-blue-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Powered by AI</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span>Service & Support</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ervaar de toekomst van klantenservice met onze geavanceerde AI-technologie.
            Altijd bereikbaar, altijd behulpzaam.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 mb-6">{feature.description}</p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                      <span className="text-sm text-slate-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl border border-blue-500/30 overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 text-center">
            <Bot className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h3 className="text-3xl font-bold mb-4">
              Probeer Onze AI-Assistent Nu
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Start een gesprek met onze AI-chatbot en ontdek hoe we je kunnen helpen
              de perfecte TV te vinden voor jouw situatie.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg shadow-2xl shadow-blue-500/50"
            >
              Start Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
