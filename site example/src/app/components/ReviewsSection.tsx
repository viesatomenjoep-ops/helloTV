import { motion } from "motion/react";
import { Star, Quote, ThumbsUp, Award, TrendingUp } from "lucide-react";

export function ReviewsSection() {
  const reviews = [
    {
      name: "Mark van der Berg",
      location: "Amsterdam",
      rating: 5,
      date: "3 mei 2026",
      review: "Fantastische service! De AI-chatbot hielp me binnen 2 minuten de perfecte TV kiezen. Levering was supersnel en de installatie door hun technici was perfect. Mijn LG OLED ziet er geweldig uit!",
      product: "LG OLED evo G4 83\""
    },
    {
      name: "Sophie Janssen",
      location: "Rotterdam",
      rating: 5,
      date: "1 mei 2026",
      review: "Beste TV-winkel van Nederland! Personeel is super deskundig en de prijzen zijn scherp. De Samsung Neo QLED die ik kocht werkt fantastisch. Ook de AI Calling Agent voor vragen is echt next-level!",
      product: "Samsung Neo QLED 8K"
    },
    {
      name: "Joris Bakker",
      location: "Utrecht",
      rating: 5,
      date: "28 april 2026",
      review: "Mijn oude TV was kapot en HelloTV heeft hem binnen 24 uur gerepareerd! Gratis diagnose en transparante prijzen. De techicus was vriendelijk en vakkundig. Top service!",
      product: "Reparatie Service"
    },
    {
      name: "Lisa de Vries",
      location: "Den Haag",
      rating: 5,
      date: "25 april 2026",
      review: "Onwijs blij met mijn nieuwe Sony Bravia! Het was mijn eerste OLED en het beeld is echt verbazingwekkend. De winkel in Den Haag had een geweldige showroom waar ik alles kon vergelijken.",
      product: "Sony Bravia XR A95L"
    },
    {
      name: "Thomas Peters",
      location: "Eindhoven",
      rating: 5,
      date: "22 april 2026",
      review: "Trade-in actie was super! Mijn oude TV ingeleverd en €450 korting gekregen op een nieuwe Philips OLED. Ambilight is echt next level. Aanrader!",
      product: "Philips OLED+908"
    },
    {
      name: "Emma Vermeulen",
      location: "Groningen",
      rating: 5,
      date: "20 april 2026",
      review: "Uitstekende ervaring! Online besteld en de volgende dag al geleverd én geïnstalleerd. De bezorgers waren super professioneel. HelloTV is echt een klasse apart!",
      product: "Samsung QLED 4K"
    }
  ];

  const stats = [
    { icon: Star, value: "4.9/5", label: "Gemiddelde Score" },
    { icon: ThumbsUp, value: "15.000+", label: "Reviews" },
    { icon: Award, value: "#1", label: "TV Specialist NL" },
    { icon: TrendingUp, value: "98%", label: "Klant Tevredenheid" }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-yellow-950/20 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/20 rounded-full border border-yellow-500/30 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">Klantbeoordelingen</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Wat Klanten
            </span>
            <br />
            <span>Over Ons Zeggen</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Meer dan 15.000 tevreden klanten gingen je voor. Lees hun ervaringen
            en ontdek waarom HelloTV de #1 TV specialist is.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 text-center"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-yellow-500/20" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-300 mb-4 leading-relaxed">
                "{review.review}"
              </p>

              {/* Product */}
              <div className="px-3 py-1 bg-blue-600/20 rounded-full inline-block mb-4">
                <span className="text-xs text-blue-300">{review.product}</span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-sm text-slate-400">{review.location}</div>
                </div>
                <div className="text-xs text-slate-500">{review.date}</div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full font-bold text-lg shadow-2xl shadow-yellow-500/50"
          >
            Bekijk Alle 15.000+ Reviews
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {["Keurmerk", "Thuiswinkel", "WebwinkelKeur", "Trustpilot"].map((badge, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-sm">{badge}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-slate-400">9.2/10</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
