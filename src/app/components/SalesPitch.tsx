import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Calendar, Euro, Users, Shield, AlertTriangle, CheckCircle2, TrendingUp, Zap, Clock, Rocket, Sparkles, X } from 'lucide-react';
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

export function SalesPitch({ onClose }: { onClose?: () => void }) {
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
          <div className="flex flex-col items-center justify-center h-full px-8 md:px-16">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black text-black mb-6 tracking-tight text-center"
            >
              MASTER VOORSTEL
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
              className="text-[8rem] md:text-[12rem] font-black mb-6 leading-none tracking-tighter"
              style={{ color: '#FFC107' }}
            >
              11-11
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-4"
            >
              <p className="text-2xl md:text-3xl font-bold text-black mb-2">Partners: Viesa Automations × HelloTV</p>
              <div className="flex items-center justify-center gap-4">
                <Calendar className="w-8 h-8 text-black" />
                <p className="text-2xl md:text-3xl text-black font-semibold">Datum: 4 mei 2026</p>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mt-4 font-medium">
                Betreft: Implementatie en overdracht geautomatiseerd retail-platform
              </p>
            </motion.div>
          </div>
        );

      case 'pitch':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16 py-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-2">DE PITCH</h2>
              <h3 className="text-3xl md:text-4xl mb-8 font-bold" style={{ color: '#FFC107' }}>In Heldere Taal</h3>

              <div className="space-y-6 text-black">
                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold border-l-8 pl-6 py-2"
                  style={{ borderColor: '#FFC107' }}
                >
                  Beste Maurice, Maick en Nick,
                </motion.p>

                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-black border-l-8 pl-6 py-5 bg-gray-50 rounded-r-2xl"
                  style={{ borderColor: '#FFC107' }}
                >
                  We hebben de motor van jullie bedrijf vervangen terwijl jullie 130 km/u op de snelweg reden.
                </motion.p>

                <motion.p
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl font-medium leading-relaxed px-4"
                >
                  Voorheen werkten jullie met losse systemen die niet met elkaar praatten. Dat kostte tijd, geld en handwerk. Wij hebben alles - van de webshop tot het magazijn, en van de reparatieafdeling tot de marketing - aan elkaar geknoopt tot <strong style={{ color: '#FFC107' }}>het beste retail-platform van Nederland.</strong>
                </motion.p>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-8 md:p-10 rounded-3xl text-center mt-6 shadow-2xl"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <p className="text-2xl text-black mb-2 font-bold">Het resultaat?</p>
                  <p className="text-6xl md:text-7xl font-black text-black mb-2 leading-tight">Minimaal 30 FTE</p>
                  <p className="text-2xl text-black mb-2 font-bold">capaciteit vrijgespeeld per jaar</p>
                  <p className="text-lg text-gray-800 italic mb-4">* Schatting op basis van harde analyses - kan ook meer zijn</p>
                  <p className="text-xl md:text-2xl text-gray-900 mt-4 leading-snug font-medium">Die mensen kunnen nu ingezet worden om écht te groeien, in plaats van gaten te dichten in de administratie.</p>
                </motion.div>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-16 py-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-8 text-center">HET TEAM ACHTER VIESA AUTOMATIONS</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="border-4 rounded-3xl p-8 hover:shadow-xl transition-all"
                  style={{ borderColor: '#FFC107' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-lg" style={{ backgroundColor: '#FFC107' }}>
                      J
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-black">Joep Hellemons</h3>
                      <p className="text-xl font-bold" style={{ color: '#FFC107' }}>Technische Drijvende Kracht</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-lg font-medium text-black">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Ruim 10 jaar ervaring als developer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Meerdere keren uitgeroepen tot Most Valuable Employee bij Incentro</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Grootschalige, complexe projecten geleid voor Achmea en Nationale Politie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Expertise in web development op extreem grote schaal en robuuste systeemarchitectuur</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-4 rounded-3xl p-8 hover:shadow-xl transition-all"
                  style={{ borderColor: '#FFC107' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-lg" style={{ backgroundColor: '#000' }}>
                      T
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-black">Tom van Biene</h3>
                      <p className="text-xl font-bold" style={{ color: '#FFC107' }}>Commerciële Expert</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-lg font-medium text-black">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Bekend gezicht bij HelloTV</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Jarenlang een van de absolute topverkopers van filiaal Breda</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Filosofie om altijd goed te zijn voor de mens - heeft filiaal Breda in alle opzichten laten groeien</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                      <span>Begrijpt commerciële behoeften van de vloer als geen ander en vertaalt dit naar succesvolle technologische oplossingen</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-6xl md:text-8xl font-black mb-6"
              style={{ color: '#FFC107' }}
            >
              11:11
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl text-center bg-gray-50 rounded-3xl p-8 md:p-12 border-4 shadow-sm"
              style={{ borderColor: '#FFC107' }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: '#FFC107' }} />
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">EEN PERSOONLIJK WOORD</h2>
              <div className="space-y-4 text-xl font-medium text-black leading-relaxed text-left">
                <p>
                  Vertrouwen staat bij ons in het allerhoogste vaandel. Dit perfect werkende platform is onze manier om HelloTV naar de volgende fase te tillen.
                </p>
                <p>
                  Jullie zullen de getallenreeks <strong style={{ color: '#FFC107' }}>11:11</strong> overal in dit voorstel terugzien. Voor ons is dit een <strong style={{ color: '#FFC107' }}>roeping</strong>; het staat symbool voor het feit dat we elkaar gigantisch gaan helpen.
                </p>
                <p className="text-2xl font-black text-center mt-6" style={{ color: '#FFC107' }}>
                  Jullie krijgen een systeem van onschatbare waarde, en voor ons is dit de ideale start.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'project':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-12 py-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-2">1. PROJECTOMVANG & OPLOSSING</h2>
              <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#FFC107' }}>Transformatie van het volledige digitale landschap van HelloTV</p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
                <p className="text-lg text-black mb-4 font-bold">Viesa Automations heeft het volledige digitale landschap van HelloTV getransformeerd:</p>
                <div className="grid grid-cols-2 gap-4 text-xl text-black">
                  <div className="flex items-center gap-3">
                    <Euro className="w-8 h-8" style={{ color: '#FFC107' }} />
                    <span className="font-medium"><strong>Omzet:</strong> € 50 miljoen+ per jaar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8" style={{ color: '#FFC107' }} />
                    <span className="font-medium"><strong>Personeel:</strong> 250 medewerkers</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                      className="border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
                      style={{ borderColor: '#FFC107' }}
                    >
                      <Icon className="w-10 h-10 mb-2" style={{ color: '#FFC107' }} />
                      <h3 className="text-xl font-black text-black mb-1">{item.title}</h3>
                      <p className="text-base font-medium text-gray-700">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-12 py-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">2. BEDRIJFSIMPACT & ROI</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-3xl p-6 md:p-8 flex flex-col justify-center"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <Users className="w-12 h-12 text-black mb-4" />
                  <h3 className="text-2xl font-black text-black mb-1">Capaciteitswinst</h3>
                  <p className="text-5xl md:text-6xl font-black text-black tracking-tight">€ 1.800.000,-</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">per jaar besparing (minimaal)</p>
                  <p className="text-sm font-medium text-gray-800 mt-2 italic">* Op basis van harde analyses: minimaal 30 FTE × € 60.000</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">Dit kan ook meer zijn - de capaciteitswinst vrijspelen jullie op basis van onze harde analyses jaarlijks</p>
                </motion.div>

                <div className="space-y-6 flex flex-col">
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black rounded-3xl p-6 flex items-center gap-6"
                  >
                    <CheckCircle2 className="w-16 h-16 shrink-0" style={{ color: '#FFC107' }} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Foutreductie</h3>
                      <p className="text-4xl font-black leading-none" style={{ color: '#FFC107' }}>95%</p>
                      <p className="text-sm font-medium text-gray-300 mt-1">minder administratieve fouten door naadloze koppeling tussen CMS en ERP</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800 rounded-3xl p-6 flex items-center gap-6"
                  >
                    <TrendingUp className="w-16 h-16 shrink-0" style={{ color: '#FFC107' }} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Schaalbaarheid</h3>
                      <p className="text-sm font-medium text-gray-300">Ingericht op groei naar <span className="text-2xl font-black" style={{ color: '#FFC107' }}>€100M+</span> omzet</p>
                      <p className="text-sm font-medium text-gray-400">zonder lineaire stijging van personeelskosten</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 rounded-3xl p-6 md:p-8 text-center mt-6 shadow-xl"
              >
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
                  <Rocket className="w-10 h-10" style={{ color: '#FFC107' }} /> ROI
                </h3>
                <p className="text-xl md:text-2xl font-medium text-white">De investering is binnen <span className="text-3xl font-black" style={{ color: '#FFC107' }}>2 maanden</span> volledig terugverdiend</p>
                <p className="text-2xl md:text-3xl font-black mt-2" style={{ color: '#FFC107' }}>Vanaf maand 3 is dit PURE WINST</p>
              </motion.div>
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 py-6">
            <div className="max-w-5xl w-full">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-8 text-center">3. MARKTVERGELIJKING</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-red-50 border-4 border-red-500 rounded-3xl p-8"
                >
                  <h3 className="text-3xl font-black text-red-600 mb-6 text-center">Traditionele IT-bureaus</h3>
                  <div className="space-y-4 text-xl font-bold text-red-950">
                    <p className="flex items-center gap-2">💸 Minimaal <span className="text-3xl font-black text-red-600">€ 500.000,-</span></p>
                    <p>🐌 Lange doorlooptijden</p>
                    <p>📊 Onnodige managementlagen</p>
                    <p>⏰ Eindeloze vergaderingen</p>
                    <p>🤝 Complexe contracten</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="border-4 rounded-3xl p-8 relative shadow-xl"
                  style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
                >
                  <Sparkles className="absolute top-6 right-6 w-10 h-10 text-black animate-pulse" />
                  <h3 className="text-3xl font-black text-black mb-6 text-center">Viesa Automations</h3>
                  <div className="space-y-4 text-xl font-black text-black">
                    <p>⚡ Razendsnel</p>
                    <p>🎯 Direct resultaat</p>
                    <p>✨ Pure perfectie</p>
                    <p>🚀 Wat écht nodig is</p>
                    <p>💡 Geen bureaucratie!</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8 text-center px-4">
                <p className="text-xl font-bold text-gray-800 bg-gray-50 py-4 px-6 rounded-xl border border-gray-200 inline-block">
                  Viesa Automations schakelt direct en bouwt razendsnel wat écht nodig is, zonder onnodige managementlagen.
                </p>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="flex flex-col justify-center h-full px-8 md:px-12 py-6 overflow-y-auto">
            <div className="max-w-4xl w-full mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center">4. FINANCIËLE INVESTERING & VOORWAARDEN</h2>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-3xl p-8 md:p-10 mb-6 text-center shadow-xl border-2 border-black"
                style={{ backgroundColor: '#FFC107' }}
              >
                <Euro className="w-16 h-16 text-black mx-auto mb-4" />
                <h3 className="text-3xl font-black text-black mb-1">Eenmalige Investering</h3>
                <p className="text-lg font-bold text-gray-800 mb-4">(Intellectueel Eigendom & Overdracht)</p>
                <p className="text-6xl md:text-8xl font-black text-black mb-6 tracking-tighter">€ 111.111,-</p>
                
                <div className="bg-black rounded-2xl p-6 mt-4 inline-block mx-auto border-2 border-gray-800">
                  <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">Te voldoen uiterlijk op:</p>
                  <p className="text-3xl md:text-4xl font-black text-white mt-1">Maandag 11 mei 2026</p>
                  <p className="text-3xl font-black mt-1" style={{ color: '#FFC107' }}>om 11:11 uur</p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border-l-8 rounded-2xl p-6 shadow-sm" style={{ borderColor: '#FFC107' }}>
                  <h3 className="text-xl font-black text-black mb-2">⚠️ Voorschot (Harde Eis)</h3>
                  <div className="space-y-1 text-sm font-medium text-black">
                    <p>Dit bedrag dient te worden voldaan als <strong>voorschot</strong>.</p>
                    <p>Dit is <strong>géén</strong> constructie voor snel geld, maar dient <strong style={{ color: '#FFC107' }}>the bigger picture</strong>.</p>
                    <p className="font-bold mt-2">Het stelt ons in staat om:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2 text-gray-800">
                      <li>Direct verder te groeien</li>
                      <li>Lopende projecten te financieren</li>
                      <li>Enorme kansen voor HelloTV te benutten</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-black rounded-2xl p-6 shadow-xl flex flex-col justify-center">
                  <h3 className="text-lg font-black text-white mb-3">Betaalopties (soepel):</h3>
                  <div className="space-y-2 text-base font-bold text-white mb-4">
                    <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC107]"/> Zakelijke rekening Joep</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#FFC107]"/> Interne bonus via loon Tom</p>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    Naar keuze over te maken op de zakelijke rekening van Joep, óf uit te keren als een interne bonus via het loon van Tom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="flex items-center justify-center h-full px-8 md:px-12 py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full bg-black rounded-3xl p-10 md:p-12 text-center shadow-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">5. ONDERHOUDSVOORSTEL (SLA)</h2>
              <Shield className="w-16 h-16 mx-auto mb-6" style={{ color: '#FFC107' }} />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Voor continuïteit en directe support:</h3>
              <p className="text-6xl md:text-7xl font-black mb-2 tracking-tighter" style={{ color: '#FFC107' }}>€ 11.111,-</p>
              <p className="text-2xl font-bold text-gray-400 mb-8">per maand</p>

              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
                {[
                  { icon: Zap, text: 'Directe Support' },
                  { icon: Shield, text: 'Updates' },
                  { icon: CheckCircle2, text: 'Garantie' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-800">
                      <Icon className="w-10 h-10 mx-auto mb-2" style={{ color: '#FFC107' }} />
                      <p className="text-sm md:text-lg text-white font-bold">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-900 rounded-2xl p-5 mt-8 border border-gray-800 text-left">
                <p className="text-sm md:text-base font-medium text-gray-300">
                  Dit maandelijkse bedrag dekt alle technische ondersteuning, updates, bug fixes, en doorontwikkeling van het platform. Het garandeert dat jullie systeem altijd up-to-date blijft en optimaal blijft functioneren.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'nda':
        return (
          <div className="flex items-center justify-center h-full px-8 md:px-12 py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-black"
              style={{ backgroundColor: '#FFC107' }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6 text-center">6. STRIKTE GEHEIMHOUDING & NDA</h2>
              <Shield className="w-12 h-12 text-black mx-auto mb-6" />

              <div className="space-y-4 text-base md:text-lg font-medium text-black">
                <p className="bg-black text-white rounded-2xl p-4 md:p-5">
                  Vanwege ons <strong style={{ color: '#FFC107' }}>beroepsgeheim</strong> maken wij de back-end en de exacte technische werking van dit platform onder <strong style={{ color: '#FFC107' }}>geen enkele voorwaarde</strong> inzichtelijk.
                </p>

                <div className="bg-black rounded-2xl p-5 text-center">
                  <p className="text-xl font-bold text-white mb-3">Alles is strikt vertrouwelijk en alleen voor:</p>
                  <Users className="w-10 h-10 mx-auto mb-2" style={{ color: '#FFC107' }} />
                  <p className="text-2xl md:text-3xl font-black text-white mb-2">Maurice • Maick • Nick • Tom • Joep</p>
                </div>

                <div className="bg-red-900 text-white rounded-2xl p-5 border-4 border-red-700">
                  <h3 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#FFC107' }}>⚠️ Speciale geheimhoudingsplicht Tom van Biene</h3>
                  <p className="text-sm md:text-base mb-3">
                    Tom van Biene heeft een strikte <strong>geheimhoudingsplicht</strong> ten opzichte van zijn collega's en teamleden van HelloTV Nederland. Bij vragen mag Tom ALLEEN zeggen:
                  </p>
                  <div className="bg-black/50 rounded-xl p-3 md:p-4 text-center">
                    <p className="text-lg md:text-xl font-bold italic" style={{ color: '#FFC107' }}>
                      "Er is een goede/logische deal uitgekomen voor beide partijen."
                    </p>
                  </div>
                  <p className="text-xs md:text-sm mt-3 text-red-200">
                    Meer mag Tom NIET zeggen. Geen details, geen cijfers, geen info over de samenwerking.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'warning':
        return (
          <div className="flex items-center justify-center h-full px-8 md:px-12 py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full"
            >
              <div className="bg-red-600 border-4 border-red-800 rounded-3xl p-8 md:p-10 text-center mb-6 shadow-2xl">
                <AlertTriangle className="w-20 h-20 text-white mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-black text-white mb-2">⚠️ WAARSCHUWING ⚠️</h2>
                <h3 className="text-2xl md:text-4xl font-bold text-white">HARDE TEKENVOORWAARDE</h3>
              </div>

              <div className="bg-black rounded-3xl p-8 md:p-10 text-white shadow-2xl">
                <p className="text-xl md:text-2xl text-center mb-6 font-bold">
                  Zonder een <strong style={{ color: '#FFC107' }}>expliciet akkoord</strong> op de voorwaarden:
                </p>

                <div className="bg-gray-900 rounded-2xl p-5 mb-6 text-lg md:text-xl font-medium flex flex-col md:flex-row justify-center gap-4 md:gap-10">
                  <p className="flex items-center justify-center gap-2"><CheckCircle2 className="text-[#FFC107]" /> NDA (Sectie 6)</p>
                  <p className="flex items-center justify-center gap-2"><CheckCircle2 className="text-[#FFC107]" /> Voorschot (Sectie 4)</p>
                </div>

                <div className="bg-red-950 border-4 border-red-600 rounded-2xl p-8 text-center">
                  <p className="text-4xl md:text-5xl font-black mb-2">GEEN DEAL</p>
                  <p className="text-xl md:text-2xl font-bold mb-2">en is er</p>
                  <p className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#FFC107' }}>ABSOLUUT GÉÉN OVERDRACHT</p>
                  <p className="text-xl md:text-2xl font-bold">van het platform.</p>
                </div>

                <p className="text-sm text-center mt-6 text-gray-400 font-medium italic">
                  Deze voorwaarden zijn niet onderhandelbaar.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'signature':
        return (
          <div className="flex items-center justify-center h-full px-8 md:px-12 py-6">
            <div className="max-w-5xl w-full">
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8 text-center">HANDTEKENINGEN</h2>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="border-4 rounded-3xl p-8 bg-gray-50 shadow-sm" style={{ borderColor: '#FFC107' }}>
                  <h3 className="text-2xl font-black text-black mb-6 text-center">Namens HelloTV</h3>
                  <div className="space-y-4">
                    {['Maurice Arnts', 'Maick', 'Nick'].map((name, idx) => (
                      <div key={idx} className="border-b-2 pb-2" style={{ borderColor: '#FFC107' }}>
                        <p className="text-gray-400 text-sm font-bold mb-1">Handtekening:</p>
                        <div className="h-12 md:h-16"></div>
                        <p className="text-xl text-black font-black">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-4 rounded-3xl p-8 bg-gray-50 shadow-sm" style={{ borderColor: '#FFC107' }}>
                  <h3 className="text-2xl font-black text-black mb-6 text-center">Namens Viesa Automations</h3>
                  <div className="space-y-4">
                    {['Tom van Biene', 'Joep Hellemons'].map((name, idx) => (
                      <div key={idx} className="border-b-2 pb-2" style={{ borderColor: '#FFC107' }}>
                        <p className="text-gray-400 text-sm font-bold mb-1">Handtekening:</p>
                        <div className="h-12 md:h-16"></div>
                        <p className="text-xl text-black font-black">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 bg-black rounded-3xl p-6 text-white inline-block w-full shadow-2xl">
                <Calendar className="w-10 h-10 mx-auto mb-2" style={{ color: '#FFC107' }} />
                <p className="text-lg font-bold">Gegenereerd voor de deadline van:</p>
                <p className="text-3xl md:text-4xl font-black mt-2 tracking-tight" style={{ color: '#FFC107' }}>11-05-2026 om 11:11</p>
                <p className="text-sm text-gray-400 mt-2 font-medium">
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
    <div className="w-screen h-screen fixed inset-0 z-50 overflow-hidden bg-white">
      {/* Logo header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 md:top-6 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10"
      >
        <div className="flex gap-3 md:gap-4">
          <div className="bg-white rounded-xl p-2 md:p-3 shadow-xl border-2 border-gray-200 flex items-center justify-center">
            <img src={hellotvLogo} alt="HelloTV" className="h-8 md:h-12 object-contain" />
          </div>
          <div className="bg-black rounded-xl p-2 md:p-3 shadow-xl border-2 flex items-center justify-center" style={{ borderColor: '#FFC107' }}>
            <img src={viesaLogo} alt="Viesa Automations" className="h-8 md:h-12 object-contain" />
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="bg-gray-900 hover:bg-black text-white rounded-xl px-4 py-3 md:py-4 shadow-xl flex items-center gap-2 font-black transition-all hover:scale-105 border-2 border-transparent hover:border-[#FFC107]"
          >
            <X size={20} className="text-[#FFC107]" /> 
            <span className="hidden md:inline">Terug naar Portaal</span>
          </button>
        )}
      </motion.div>

      {/* Clock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-xl border-2 shadow-xl hidden md:block"
        style={{
          backgroundColor: currentSection.color,
          borderColor: currentSection.color === '#FFC107' ? '#000' : '#FFC107'
        }}
      >
        <div className={`text-2xl font-black tracking-wider font-mono ${currentSection.color === '#FFC107' ? 'text-black' : 'text-white'}`}>
          {time.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 w-full h-full flex flex-col pt-24 pb-32">
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
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-black border-t-8 transition-all duration-300" style={{ borderColor: '#FFC107' }}>
        <div className="px-4 md:px-10 py-4">
          <div className="flex items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
            <button
              onClick={prevSlide}
              className="p-3 md:p-4 rounded-full border-4 transition-all hover:scale-110 shadow-lg shrink-0"
              style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </button>

            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 overflow-x-auto custom-scrollbar pb-1">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSlide(index)}
                  className={`group relative transition-all duration-300 px-3 py-2 md:px-4 md:py-3 rounded-xl shrink-0 ${
                    index === currentSlide ? 'scale-110 md:scale-125' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: index === currentSlide ? '#FFC107' : '#333',
                    border: index === currentSlide ? '3px solid #000' : '2px solid #555'
                  }}
                >
                  <div className="text-base md:text-lg font-black" style={{ color: index === currentSlide ? '#000' : '#FFC107' }}>
                    {index + 1}
                  </div>
                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    <div className="bg-black text-white text-sm md:text-base font-bold px-4 py-2 rounded-xl border-2 shadow-xl" style={{ borderColor: '#FFC107' }}>
                      {section.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 md:p-4 rounded-full border-4 transition-all hover:scale-110 shadow-lg shrink-0"
              style={{ backgroundColor: '#FFC107', borderColor: '#000' }}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black" />
            </button>
          </div>

          <div className="text-center mt-2 hidden md:block">
            <p className="text-lg font-black tracking-wide" style={{ color: '#FFC107' }}>
              {currentSlide + 1} / {sections.length} - {currentSection.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
