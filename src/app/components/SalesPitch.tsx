import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Calendar, Euro, Users, Shield, AlertTriangle, CheckCircle2, TrendingUp, Zap, Clock, Rocket, Sparkles } from 'lucide-react';
import hellotvLogo from '../../assets/hellotv_logoo.svg';
import viesaLogo from '../../assets/Viesa.svg';

const sections = [
  { id: 'hero', title: 'Master Voorstel 11-11', color: '#000000' },
  { id: 'pitch', title: 'De Pitch', color: '#FFC107' },
  { id: 'team', title: 'Het Team', color: '#000000' },
  { id: 'personal', title: 'Persoonlijk Woord', color: '#FFC107' },
  { id: 'project', title: '1. Projectomvang', color: '#000000' },
  { id: 'impact', title: '2. Bedrijfsimpact & ROI', color: '#FFC107' },
  { id: 'market', title: '3. Marktvergelijking', color: '#000000' },
  { id: 'financial', title: '4. Financiële Investering', color: '#FFC107' },
  { id: 'maintenance', title: '5. Onderhoudsvoorstel', color: '#000000' },
  { id: 'nda', title: '6. Geheimhouding & NDA', color: '#FFC107' },
  { id: 'warning', title: 'Waarschuwing', color: '#FF0000' },
  { id: 'signature', title: 'Handtekeningen', color: '#000000' }
];

export function SalesPitch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sections.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const renderSlideContent = () => {
    const section = sections[currentSlide];

    switch (section.id) {
      case 'hero':
        return (
          <div className="flex flex-col items-center justify-center h-full px-16">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-9xl font-bold text-black mb-8"
            >
              MASTER VOORSTEL
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
              className="text-[14rem] font-bold mb-10 leading-none"
              style={{ color: '#FFC107' }}
            >
              11-11
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-6"
            >
              <p className="text-4xl font-semibold text-black mb-4">Partners: Viesa Automations × HelloTV</p>
              <div className="flex items-center justify-center gap-6">
                <Calendar className="w-12 h-12 text-black" />
                <p className="text-4xl text-black font-medium">Datum: 4 mei 2026</p>
              </div>
              <p className="text-3xl text-gray-700 max-w-4xl mt-6">
                Betreft: Implementatie en overdracht geautomatiseerd retail-platform
              </p>
            </motion.div>
          </div>
        );

      case 'pitch':
        return (
          <div className="h-full px-16 py-10 overflow-y-auto">
            <h2 className="text-7xl font-bold text-black mb-6">DE PITCH</h2>
            <h3 className="text-5xl mb-10 font-semibold" style={{ color: '#FFC107' }}>In Heldere Taal</h3>

            <div className="space-y-6 text-black max-w-7xl mx-auto">
              <motion.p
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl border-l-8 pl-8 py-4"
                style={{ borderColor: '#FFC107' }}
              >
                Beste Maurice, Maick en Nick,
              </motion.p>

              <motion.p
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold border-l-8 pl-8 py-6 bg-gray-50 rounded-r-2xl"
                style={{ borderColor: '#FFC107' }}
              >
                We hebben de motor van jullie bedrijf vervangen terwijl jullie 130 km/u op de snelweg reden.
              </motion.p>

              <motion.p
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl leading-relaxed px-4"
              >
                Voorheen werkten jullie met losse systemen die niet met elkaar praatten. Dat kostte tijd, geld en handwerk. Wij hebben alles - van de webshop tot het magazijn, en van de reparatieafdeling tot de marketing - aan elkaar geknoopt tot <strong style={{ color: '#FFC107' }}>het beste retail-platform van Nederland.</strong>
              </motion.p>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-12 rounded-3xl text-center mt-8 shadow-2xl"
                style={{ backgroundColor: '#FFC107' }}
              >
                <p className="text-4xl text-black mb-4 font-bold">Het resultaat?</p>
                <p className="text-8xl font-bold text-black mb-4 leading-tight">Minimaal 30 FTE</p>
                <p className="text-3xl text-black mb-3 font-semibold">capaciteit vrijgespeeld per jaar</p>
                <p className="text-xl text-gray-700 italic mb-4">* Schatting op basis van harde analyses - kan ook meer zijn</p>
                <p className="text-2xl text-gray-800 mt-6 leading-relaxed">Die mensen kunnen nu ingezet worden om écht te groeien, in plaats van gaten te dichten in de administratie.</p>
              </motion.div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="h-full px-16 py-10 overflow-y-auto">
            <h2 className="text-6xl font-bold text-black mb-10">HET TEAM ACHTER VIESA AUTOMATIONS</h2>

            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="border-6 rounded-3xl p-10 hover:shadow-2xl transition-all"
                style={{ borderColor: '#FFC107', borderWidth: '6px' }}
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg" style={{ backgroundColor: '#FFC107' }}>
                    J
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-black">Joep Hellemons</h3>
                    <p className="text-2xl font-semibold" style={{ color: '#FFC107' }}>Technische Drijvende Kracht</p>
                  </div>
                </div>
                <ul className="space-y-4 text-xl text-black">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Ruim 10 jaar ervaring als developer</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Meerdere keren uitgeroepen tot Most Valuable Employee bij Incentro</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Grootschalige, complexe projecten geleid voor Achmea en Nationale Politie</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Expertise in web development op extreem grote schaal en robuuste systeemarchitectuur</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-6 rounded-3xl p-10 hover:shadow-2xl transition-all"
                style={{ borderColor: '#FFC107', borderWidth: '6px' }}
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg" style={{ backgroundColor: '#000' }}>
                    T
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-black">Tom van Biene</h3>
                    <p className="text-2xl font-semibold" style={{ color: '#FFC107' }}>Commerciële Expert</p>
                  </div>
                </div>
                <ul className="space-y-4 text-xl text-black">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Bekend gezicht bij HelloTV</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Jarenlang een van de absolute topverkopers van filiaal Breda</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Filosofie om altijd goed te zijn voor de mens - heeft filiaal Breda in alle opzichten laten groeien</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#FFC107' }} />
                    <span>Begrijpt commerciële behoeften van de vloer als geen ander en vertaalt dit naar succesvolle technologische oplossingen</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="flex flex-col items-center justify-center h-full px-12 py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-8xl font-bold mb-8"
              style={{ color: '#FFC107' }}
            >
              11:11
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl text-center bg-gray-50 rounded-3xl p-12 border-4"
              style={{ borderColor: '#FFC107' }}
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6" style={{ color: '#FFC107' }} />
              <h2 className="text-5xl font-bold text-black mb-6">EEN PERSOONLIJK WOORD: 11-11</h2>
              <div className="space-y-4 text-xl text-black leading-relaxed text-left">
                <p>
                  Vertrouwen staat bij ons in het allerhoogste vaandel. Dit perfect werkende platform is onze manier om HelloTV naar de volgende fase te tillen.
                </p>
                <p>
                  Jullie zullen de getallenreeks <strong style={{ color: '#FFC107' }}>11:11</strong> overal in dit voorstel terugzien. Voor ons is dit een <strong style={{ color: '#FFC107' }}>roeping</strong>; het staat symbool voor het feit dat we elkaar gigantisch gaan helpen.
                </p>
                <p className="text-2xl font-bold text-center mt-6" style={{ color: '#FFC107' }}>
                  Jullie krijgen een systeem van onschatbare waarde, en voor ons is dit de ideale start.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'project':
        return (
          <div className="h-full px-12 py-8 overflow-y-auto">
            <h2 className="text-5xl font-bold text-black mb-3">1. PROJECTOMVANG & OPLOSSING</h2>
            <p className="text-2xl mb-6" style={{ color: '#FFC107' }}>Transformatie van het volledige digitale landschap van HelloTV</p>

            <div className="bg-gray-50 rounded-3xl p-8 mb-6 max-w-6xl">
              <p className="text-xl text-black mb-4 font-semibold">Viesa Automations heeft het volledige digitale landschap van HelloTV getransformeerd:</p>
              <div className="grid grid-cols-2 gap-6 text-2xl text-black">
                <div className="flex items-center gap-4">
                  <Euro className="w-10 h-10" style={{ color: '#FFC107' }} />
                  <span><strong>Omzet:</strong> € 50 miljoen+ per jaar</span>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-10 h-10" style={{ color: '#FFC107' }} />
                  <span><strong>Personeel:</strong> 250 medewerkers</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
              {[
                { title: 'Back-end & CMS', desc: 'Volledig beheer van hellotv.nl, inclusief voorraad- en contentbeheer', icon: Zap },
                { title: 'CRM & ERP', desc: 'Gecentraliseerd klant- en resourcebeheer voor optimale orderverwerking', icon: Users },
                { title: 'Logistiek & Inklokken', desc: 'Automatisering van magazijnstromen en urenregistratie voor 250 medewerkers', icon: Clock },
                { title: 'Marketing & Repair', desc: 'Geautomatiseerde funnels en een efficiënt proces voor de reparatieafdeling', icon: Rocket }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-4 rounded-2xl p-6"
                    style={{ borderColor: '#FFC107' }}
                  >
                    <Icon className="w-14 h-14 mb-3" style={{ color: '#FFC107' }} />
                    <h3 className="text-2xl font-bold text-black mb-2">{item.title}</h3>
                    <p className="text-lg text-gray-700">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="h-full px-12 py-8 overflow-y-auto">
            <h2 className="text-5xl font-bold text-black mb-8">2. BEDRIJFSIMPACT & ROI</h2>

            <div className="space-y-6 max-w-6xl">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl p-8"
                style={{ backgroundColor: '#FFC107' }}
              >
                <div className="flex items-center gap-6">
                  <Users className="w-20 h-20 text-black" />
                  <div>
                    <h3 className="text-4xl font-bold text-black mb-2">Capaciteitswinst</h3>
                    <p className="text-7xl font-bold text-black">€ 1.800.000,-</p>
                    <p className="text-2xl text-gray-800 mt-2">per jaar besparing (minimaal)</p>
                    <p className="text-lg text-gray-700 mt-2 italic">* Op basis van harde analyses: minimaal 30 FTE × € 60.000</p>
                    <p className="text-base text-gray-700 font-semibold mt-1">Dit kan ook meer zijn - de capaciteitswinst vrijspelen jullie op basis van onze harde analyses jaarlijks</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black rounded-3xl p-8"
              >
                <div className="flex items-center gap-6">
                  <CheckCircle2 className="w-20 h-20" style={{ color: '#FFC107' }} />
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-2">Foutreductie</h3>
                    <p className="text-7xl font-bold" style={{ color: '#FFC107' }}>95%</p>
                    <p className="text-2xl text-gray-300 mt-2">minder administratieve fouten door naadloze koppeling tussen CMS en ERP</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 rounded-3xl p-8"
              >
                <div className="flex items-center gap-6">
                  <TrendingUp className="w-20 h-20" style={{ color: '#FFC107' }} />
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-2">Schaalbaarheid</h3>
                    <p className="text-2xl text-gray-300">Ingericht op groei naar <span className="text-5xl font-bold" style={{ color: '#FFC107' }}>€100M+</span> omzet</p>
                    <p className="text-xl text-gray-400 mt-2">zonder lineaire stijging van personeelskosten</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 rounded-3xl p-8 text-center"
              >
                <Rocket className="w-20 h-20 mx-auto mb-4" style={{ color: '#FFC107' }} />
                <h3 className="text-5xl font-bold text-white mb-3">ROI</h3>
                <p className="text-3xl text-white">De investering is binnen <span className="text-6xl font-bold" style={{ color: '#FFC107' }}>2 maanden</span> volledig terugverdiend</p>
                <p className="text-4xl font-bold mt-4" style={{ color: '#FFC107' }}>Vanaf maand 3 is dit PURE WINST</p>
              </motion.div>
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="flex items-center justify-center h-full px-12 py-8">
            <div className="max-w-7xl w-full">
              <h2 className="text-5xl font-bold text-black mb-8 text-center">3. MARKTVERGELIJKING</h2>

              <div className="grid md:grid-cols-2 gap-10">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-red-100 border-4 border-red-500 rounded-3xl p-8"
                >
                  <h3 className="text-4xl font-bold text-red-600 mb-6">Traditionele IT-bureaus</h3>
                  <div className="space-y-4 text-2xl text-black">
                    <p>💸 Minimaal <span className="text-5xl font-bold text-red-600">€ 500.000,-</span></p>
                    <p>🐌 Lange doorlooptijden</p>
                    <p>📊 Onnodige managementlagen</p>
                    <p>⏰ Eindeloze vergaderingen</p>
                    <p>🤝 Complexe contracten</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="border-4 rounded-3xl p-8 relative"
                  style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
                >
                  <Sparkles className="absolute top-6 right-6 w-16 h-16 text-black animate-pulse" />
                  <h3 className="text-4xl font-bold text-black mb-6">Viesa Automations</h3>
                  <div className="space-y-4 text-2xl text-black">
                    <p>⚡ <strong>Razendsnel</strong></p>
                    <p>🎯 Direct resultaat</p>
                    <p>✨ Pure perfectie</p>
                    <p>🚀 Wat écht nodig is</p>
                    <p>💡 Geen bureaucratie!</p>
                  </div>
                  <p className="text-xl font-bold mt-6 text-gray-800">
                    Viesa Automations schakelt direct en bouwt razendsnel wat écht nodig is, zonder onnodige managementlagen.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="h-full px-12 py-8 overflow-y-auto">
            <h2 className="text-5xl font-bold text-black mb-8">4. FINANCIËLE INVESTERING & VOORWAARDEN</h2>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-3xl p-12 mb-8 text-center max-w-5xl mx-auto"
              style={{ backgroundColor: '#FFC107' }}
            >
              <Euro className="w-24 h-24 text-black mx-auto mb-6" />
              <h3 className="text-4xl font-bold text-black mb-3">Eenmalige Investering</h3>
              <p className="text-2xl text-gray-800 mb-6">(Intellectueel Eigendom & Overdracht)</p>
              <p className="text-8xl font-bold text-black mb-6">€ 111.111,-</p>
              <div className="bg-black/80 rounded-2xl p-6 mt-6">
                <Calendar className="w-14 h-14 text-white mx-auto mb-3" />
                <p className="text-3xl font-bold text-white">Te voldoen uiterlijk op:</p>
                <p className="text-5xl font-bold text-white mt-3">Maandag 11 mei 2026</p>
                <p className="text-6xl font-bold mt-2" style={{ color: '#FFC107' }}>om 11:11 uur</p>
              </div>
            </motion.div>

            <div className="bg-gray-50 border-l-8 rounded-2xl p-6 mb-6 max-w-5xl mx-auto" style={{ borderColor: '#FFC107' }}>
              <h3 className="text-2xl font-bold text-black mb-3">⚠️ Voorschot (Harde Eis)</h3>
              <div className="space-y-2 text-base text-black">
                <p>Dit bedrag dient te worden voldaan als <strong>voorschot</strong>.</p>
                <p>Dit is <strong>géén</strong> constructie voor snel geld, maar dient <strong style={{ color: '#FFC107' }}>the bigger picture</strong>.</p>
                <p className="font-semibold mt-3">Het stelt ons in staat om:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Direct verder te groeien</li>
                  <li>Lopende projecten te financieren</li>
                  <li>De enorme kansen op de lange termijn voor HelloTV te benutten</li>
                </ul>
                <p className="text-xl font-bold mt-3" style={{ color: '#FFC107' }}>
                  Dit langetermijnproject gaat ontzettend veel besparen!
                </p>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-6 max-w-5xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-3">Betaalopties (fiscaal en administratief soepel):</h3>
              <div className="space-y-2 text-base text-white">
                <p>✓ Zakelijke rekening van Joep</p>
                <p>✓ Interne bonus via het loon van Tom (aangezien hij nog steeds in dienst is bij HelloTV)</p>
              </div>
              <p className="text-sm text-gray-400 mt-4 italic">
                Om dit voorschot fiscaal en administratief soepel te laten verlopen, kan de betaling naar keuze worden overgemaakt op de zakelijke rekening van Joep, óf worden uitgekeerd als een interne bonus via het loon van Tom.
              </p>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="flex items-center justify-center h-full px-12 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-5xl w-full bg-black rounded-3xl p-16 text-center"
            >
              <h2 className="text-5xl font-bold text-white mb-8">5. ONDERHOUDSVOORSTEL & LICENTIES (SLA)</h2>
              <Shield className="w-28 h-28 mx-auto mb-8" style={{ color: '#FFC107' }} />
              <h3 className="text-3xl text-white mb-6">Voor de continuïteit van alle automatiseringen en directe support:</h3>
              <p className="text-8xl font-bold mb-6" style={{ color: '#FFC107' }}>€ 11.111,-</p>
              <p className="text-4xl text-white mb-8">per maand</p>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Zap, text: 'Directe Support' },
                  { icon: Shield, text: 'Continue Updates' },
                  { icon: CheckCircle2, text: 'SLA Garantie' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-gray-900 rounded-2xl p-6">
                      <Icon className="w-14 h-14 mx-auto mb-3" style={{ color: '#FFC107' }} />
                      <p className="text-xl text-white font-bold">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-900 rounded-2xl p-6 mt-8 text-left">
                <p className="text-lg text-gray-300">
                  Dit maandelijkse bedrag dekt alle technische ondersteuning, updates, bug fixes, en doorontwikkeling van het platform. Het garandeert dat jullie systeem altijd up-to-date blijft en optimaal blijft functioneren.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'nda':
        return (
          <div className="flex items-center justify-center h-full px-12 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-5xl w-full rounded-3xl p-10"
              style={{ backgroundColor: '#FFC107' }}
            >
              <h2 className="text-4xl font-bold text-black mb-6 text-center">6. STRIKTE GEHEIMHOUDING & NDA</h2>
              <Shield className="w-16 h-16 text-black mx-auto mb-6" />

              <div className="space-y-4 text-lg text-black">
                <p className="bg-black/80 text-white rounded-2xl p-5">
                  Vanwege ons <strong style={{ color: '#FFC107' }}>beroepsgeheim</strong> maken wij de back-end en de exacte technische werking van dit platform onder <strong style={{ color: '#FFC107' }}>geen enkele voorwaarde</strong> inzichtelijk.
                </p>

                <p className="bg-black/80 text-white rounded-2xl p-5">
                  Bovendien is alles wat is gedemonstreerd en besproken <strong style={{ color: '#FFC107' }}>strikt vertrouwelijk</strong>; dit mag uitsluitend binnen de muren van de directie blijven:
                </p>

                <div className="bg-black rounded-2xl p-6 text-center">
                  <Users className="w-14 h-14 mx-auto mb-3" style={{ color: '#FFC107' }} />
                  <p className="text-3xl font-bold text-white mb-2">Maurice • Maick • Nick • Tom • Joep</p>
                  <p className="text-base text-gray-300 mt-3">Alleen deze 5 personen mogen kennis hebben van de inhoud van dit voorstel</p>
                </div>

                <div className="bg-red-900 text-white rounded-2xl p-5 border-4 border-red-700">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#FFC107' }}>⚠️ Speciale geheimhoudingsplicht Tom van Biene</h3>
                  <p className="text-base mb-3">
                    Tom van Biene heeft een strikte <strong>geheimhoudingsplicht</strong> ten opzichte van zijn collega's en andere teamleden van HelloTV Nederland.
                  </p>
                  <div className="bg-black/40 rounded-xl p-4 mt-3">
                    <p className="text-base font-semibold mb-2">Bij vragen mag Tom ALLEEN zeggen:</p>
                    <p className="text-lg italic" style={{ color: '#FFC107' }}>
                      "Er is een goede/logische deal uitgekomen voor beide partijen."
                    </p>
                  </div>
                  <p className="text-sm mt-3 text-gray-300">
                    Meer mag Tom van Biene NIET zeggen. Geen details, geen cijfers, geen specifieke informatie over de samenwerking.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'warning':
        return (
          <div className="flex items-center justify-center h-full px-12 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-6xl w-full"
            >
              <div className="bg-red-600 border-8 border-red-800 rounded-3xl p-12 text-center mb-8">
                <AlertTriangle className="w-28 h-28 text-white mx-auto mb-6 animate-pulse" />
                <h2 className="text-6xl font-bold text-white mb-4">⚠️ WAARSCHUWINGSBLOK ⚠️</h2>
                <h3 className="text-5xl font-bold text-white">HARDE TEKENVOORWAARDE</h3>
              </div>

              <div className="bg-black rounded-3xl p-12 text-white">
                <p className="text-3xl text-center mb-6">
                  Zonder een <strong style={{ color: '#FFC107' }}>expliciet akkoord</strong> op deze specifieke voorwaarden:
                </p>

                <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-2xl">
                  <p className="mb-3">✓ De geheimhoudingsclausule in sectie 6</p>
                  <p>✓ Het besproken voorschot in sectie 4</p>
                </div>

                <div className="bg-red-900 border-4 border-red-500 rounded-2xl p-10 text-center">
                  <p className="text-5xl font-bold mb-3">GEEN DEAL</p>
                  <p className="text-3xl mb-3">en zal er</p>
                  <p className="text-5xl font-bold mb-3" style={{ color: '#FFC107' }}>ABSOLUUT GÉÉN OVERDRACHT</p>
                  <p className="text-3xl">van het platform plaatsvinden</p>
                </div>

                <p className="text-xl text-center mt-6 text-gray-300 italic">
                  Deze voorwaarden zijn niet onderhandelbaar en vormen de basis voor elke samenwerking.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'signature':
        return (
          <div className="flex items-center justify-center h-full px-12 py-8">
            <div className="max-w-6xl w-full">
              <h2 className="text-6xl font-bold text-black mb-12 text-center">HANDTEKENINGEN</h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="border-4 rounded-3xl p-10" style={{ borderColor: '#FFC107' }}>
                  <h3 className="text-3xl font-bold text-black mb-8 text-center">Namens HelloTV</h3>
                  <div className="space-y-6">
                    {['Maurice Arnts', 'Maick', 'Nick'].map((name, idx) => (
                      <div key={idx} className="border-b-4 pb-4" style={{ borderColor: '#FFC107' }}>
                        <p className="text-gray-500 text-lg mb-2">Handtekening:</p>
                        <div className="h-20"></div>
                        <p className="text-2xl text-black font-bold">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-4 rounded-3xl p-10" style={{ borderColor: '#FFC107' }}>
                  <h3 className="text-3xl font-bold text-black mb-8 text-center">Namens Viesa Automations</h3>
                  <div className="space-y-6">
                    {['Tom van Biene', 'Joep Hellemons'].map((name, idx) => (
                      <div key={idx} className="border-b-4 pb-4" style={{ borderColor: '#FFC107' }}>
                        <p className="text-gray-500 text-lg mb-2">Handtekening:</p>
                        <div className="h-20"></div>
                        <p className="text-2xl text-black font-bold">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Calendar className="w-14 h-14 mx-auto mb-4" style={{ color: '#FFC107' }} />
                <p className="text-2xl text-gray-600">Gegenereerd voor de deadline van:</p>
                <p className="text-5xl font-bold text-black mt-3">11-05-2026 om 11:11</p>
                <p className="text-lg text-gray-500 mt-4 italic">
                  Dit voorstel is alleen geldig bij ondertekening voor bovenstaande datum en tijd
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentSection = sections[currentSlide];

  return (
    <div className="size-full relative overflow-hidden bg-white">
      {/* Logo header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between px-10"
      >
        <div className="bg-white rounded-xl p-3 shadow-xl border-2 border-gray-200">
          <img src={hellotvLogo} alt="HelloTV" className="h-14 object-contain" />
        </div>
        <div className="bg-black rounded-xl p-3 shadow-xl border-2" style={{ borderColor: '#FFC107' }}>
          <img src={viesaLogo} alt="Viesa Automations" className="h-14 object-contain" />
        </div>
      </motion.div>

      {/* Clock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2 rounded-xl border-2"
        style={{
          backgroundColor: currentSection.color,
          borderColor: currentSection.color === '#FFC107' ? '#000' : '#FFC107'
        }}
      >
        <div className={`text-3xl font-bold tracking-wider font-mono ${currentSection.color === '#FFC107' ? 'text-black' : 'text-white'}`}>
          {time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 size-full flex flex-col pt-32 pb-40">
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0"
            >
              {renderSlideContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="fixed bottom-0 left-64 right-0 z-40 bg-black border-t-8 transition-all duration-300" style={{ borderColor: '#FFC107' }}>
        <div className="px-10 py-5">
          <div className="flex items-center justify-between gap-8 max-w-[96%] mx-auto">
            <button
              onClick={prevSlide}
              className="p-5 rounded-full border-4 transition-all hover:scale-110 shadow-lg shrink-0"
              style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
            >
              <ChevronLeft className="w-10 h-10 text-black" />
            </button>

            <div className="flex-1 flex items-center justify-center gap-3 overflow-x-auto custom-scrollbar pb-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative transition-all duration-300 px-5 py-4 rounded-xl shrink-0 ${
                    index === currentSlide ? 'scale-110 md:scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: index === currentSlide ? '#FFC107' : '#333',
                    border: index === currentSlide ? '3px solid #000' : '2px solid #555'
                  }}
                >
                  <div className="text-lg font-bold" style={{ color: index === currentSlide ? '#000' : '#FFC107' }}>
                    {index + 1}
                  </div>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    <div className="bg-black text-white text-base px-5 py-3 rounded-xl border-3 shadow-xl" style={{ borderColor: '#FFC107' }}>
                      {section.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-5 rounded-full border-4 transition-all hover:scale-110 shadow-lg shrink-0"
              style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
            >
              <ChevronRight className="w-10 h-10 text-black" />
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="text-2xl font-bold" style={{ color: '#FFC107' }}>
              {currentSlide + 1} / {sections.length} - {currentSection.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
