import { motion } from "motion/react";
import { Percent, Gift, Clock, Sparkles, Tag, ChevronRight } from "lucide-react";

export function SpecialOffers() {
  const offers = [
    {
      title: "Weekend Deal",
      subtitle: "Tot 40% korting op OLED TV's",
      description: "Geldig t/m zondag 23:59",
      discount: "40%",
      gradient: "from-orange-600 to-red-600",
      icon: Percent,
      tag: "Beperkte tijd"
    },
    {
      title: "Gratis Installatie",
      subtitle: "Bij aankoop boven €2.000",
      description: "Inclusief muurbeugel",
      discount: "€299",
      gradient: "from-green-600 to-emerald-600",
      icon: Gift,
      tag: "Deze maand"
    },
    {
      title: "Trade-In Bonus",
      subtitle: "Extra korting met inruil",
      description: "Tot €500 extra voordeel",
      discount: "€500",
      gradient: "from-blue-600 to-cyan-600",
      icon: Tag,
      tag: "Altijd"
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-orange-950/20 to-slate-950" />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/20 rounded-full border border-orange-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">Exclusieve Deals</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Onweerstaanbare
            </span>
            <br />
            <span>Aanbiedingen</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Profiteer van onze exclusieve deals en bespaar honderden euro's
            op de nieuwste TV technologie.
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative"
              >
                <div className="relative p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden">
                  {/* Tag */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${offer.gradient} rounded-full text-xs font-bold mb-6`}>
                    <Clock className="w-3 h-3" />
                    {offer.tag}
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-20 h-20 bg-gradient-to-br ${offer.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Discount Badge */}
                  <div className="absolute top-8 right-8">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`px-4 py-2 bg-gradient-to-br ${offer.gradient} rounded-full font-bold text-2xl shadow-lg`}
                    >
                      {offer.discount}
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-lg text-slate-300 mb-3">{offer.subtitle}</p>
                  <p className="text-sm text-slate-400 mb-6">{offer.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 bg-gradient-to-r ${offer.gradient} rounded-full font-bold flex items-center justify-center gap-2`}
                  >
                    Bekijk Deal
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Animated Border */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl border-2 border-transparent`}
                    style={{
                      background: `linear-gradient(${offer.gradient.replace('from-', '').replace('to-', ', ')}) border-box`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Deal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-orange-600/30 via-red-600/30 to-pink-600/30 backdrop-blur-xl rounded-3xl border border-orange-500/50 overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-orange-500/40 to-red-500/40 rounded-full blur-3xl"
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/30 rounded-full border border-orange-500/50 mb-6">
                <Sparkles className="w-4 h-4 text-orange-300" />
                <span className="text-sm font-bold text-orange-300">Flash Sale</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  Mega Deal
                </span>
                <br />
                Eindejaarsuitverkoop
              </h3>

              <p className="text-lg text-slate-300 mb-6">
                Vanaf nu tot eind december: tot 50% korting op geselecteerde modellen.
                Premium TV's voor de laagste prijs van het jaar!
              </p>

              <ul className="space-y-3 mb-8">
                {["Gratis bezorging & installatie", "5 jaar garantie", "30 dagen niet goed, geld terug"].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold text-lg shadow-2xl shadow-orange-500/50"
              >
                Bekijk Alle Deals
              </motion.button>
            </div>

            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-8xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                  50%
                </div>
                <div className="text-2xl font-bold">KORTING</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
