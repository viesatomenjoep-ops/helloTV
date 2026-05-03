import { motion } from "motion/react";
import {
  Sparkles, MapPin, Phone, Mail, Facebook, Instagram,
  Twitter, Youtube, Clock, CreditCard, Truck, Shield
} from "lucide-react";

export function Footer() {
  const footerLinks = {
    "Product": ["OLED TV's", "QLED TV's", "Neo QLED", "8K TV's", "Audio", "Accessoires"],
    "Service": ["Bezorging", "Installatie", "Reparatie", "Garantie", "Trade-In", "Advies"],
    "Bedrijf": ["Over Ons", "Winkels", "Vacatures", "Duurzaamheid", "Blog", "Pers"],
    "Klantenservice": ["Contact", "FAQ", "Retourneren", "Betalen", "Privacy", "Voorwaarden"]
  };

  const stores = [
    "Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven", "Groningen",
    "Tilburg", "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem"
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800">
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stores Section */}
        <div className="py-12 border-b border-slate-800">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            18 Winkels in Nederland
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stores.map((store, i) => (
              <motion.div
                key={store}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-slate-900/50 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer"
              >
                {store}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-12 grid md:grid-cols-3 gap-8 border-b border-slate-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold mb-1">Telefonisch</div>
              <div className="text-slate-400 text-sm mb-2">Ma-Za 09:00 - 21:00</div>
              <a href="tel:0201234567" className="text-blue-400 hover:text-blue-300">
                020 - 123 45 67
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold mb-1">Email</div>
              <div className="text-slate-400 text-sm mb-2">Binnen 2 uur reactie</div>
              <a href="mailto:info@hellotv.nl" className="text-blue-400 hover:text-blue-300">
                info@hellotv.nl
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold mb-1">Openingstijden</div>
              <div className="text-slate-400 text-sm">Ma-Za: 09:00 - 21:00</div>
              <div className="text-slate-400 text-sm">Zo: 12:00 - 18:00</div>
            </div>
          </motion.div>
        </div>

        {/* USPs */}
        <div className="py-12 grid md:grid-cols-4 gap-6 border-b border-slate-800">
          {[
            { icon: Truck, text: "Gratis bezorging vanaf €500" },
            { icon: Shield, text: "Tot 5 jaar garantie" },
            { icon: CreditCard, text: "Achteraf betalen mogelijk" },
            { icon: Clock, text: "24/7 AI Support" }
          ].map((usp, i) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <Icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-slate-300">{usp.text}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">HelloTV</div>
              <div className="text-xs text-slate-500">Dé tv-winkel van Nederland</div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="text-sm text-slate-400">
              © 2026 HelloTV. Alle rechten voorbehouden.
            </div>
            <div className="text-xs text-slate-500 mt-1">
              KVK: 12345678 • BTW: NL123456789B01
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Youtube, href: "#" }
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
