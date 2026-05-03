import { motion } from "motion/react";
import { Wrench, Clock, Shield, CheckCircle, Phone, Calendar } from "lucide-react";

export function RepairService() {
  const repairFeatures = [
    {
      icon: Clock,
      title: "24-48 Uur Service",
      description: "Snelle reparatie binnen 2 werkdagen"
    },
    {
      icon: Shield,
      title: "1 Jaar Garantie",
      description: "Op alle reparaties en onderdelen"
    },
    {
      icon: CheckCircle,
      title: "Gecertificeerd",
      description: "Ervaren en gecertificeerde technici"
    },
    {
      icon: Phone,
      title: "Gratis Diagnose",
      description: "Geen kosten voor keuring en advies"
    }
  ];

  const repairSteps = [
    {
      number: "01",
      title: "Bel of Chat",
      description: "Neem contact op via telefoon of onze AI-chatbot voor een gratis diagnose"
    },
    {
      number: "02",
      title: "Afspraak Maken",
      description: "Plan direct een afspraak in bij jou thuis of in één van onze 18 winkels"
    },
    {
      number: "03",
      title: "Reparatie",
      description: "Onze technici repareren je TV snel en vakkundig met originele onderdelen"
    },
    {
      number: "04",
      title: "Garantie",
      description: "Geniet van 1 jaar garantie op je reparatie en ga zorgeloos verder"
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-green-950/20 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-full border border-green-500/30 mb-6">
            <Wrench className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-300">Professionele Service</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              TV Reparatie
            </span>
            <br />
            <span>Service</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Je TV kapot? Geen zorgen! Onze gecertificeerde technici staan voor je klaar
            met snelle en betrouwbare reparaties.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {repairFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Repair Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Hoe werkt het?
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            {repairSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < repairSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent" />
                )}

                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-lg shadow-green-500/50"
                >
                  {step.number}
                </motion.div>

                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 backdrop-blur-xl rounded-3xl border border-green-500/30 overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"
          />

          <div className="relative z-10 text-center">
            <Wrench className="w-16 h-16 mx-auto mb-6 text-green-400" />
            <h3 className="text-4xl font-bold mb-4">
              TV Kapot? Direct Hulp!
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Bel onze AI Calling Agent voor direct advies of plan een afspraak met één van onze technici.
              Gratis diagnose en transparante prijzen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-bold text-lg shadow-2xl shadow-green-500/50 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Bel Direct
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-xl rounded-full font-bold text-lg border border-white/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Plan Afspraak
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
