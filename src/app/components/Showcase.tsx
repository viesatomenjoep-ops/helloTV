import React from 'react';
import { HelloTVLogo } from './ui/HelloTVLogo';
import { Rocket, Target, Globe, Cpu, ChevronRight, PlayCircle, Star, Zap } from 'lucide-react';

export function Showcase() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FDCB2C] animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide uppercase text-gray-300">Viesa Automations x HelloTV</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight">
            De Weg Naar <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDCB2C] via-yellow-200 to-[#FDCB2C]">
              Nummer Één
            </span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Een exclusieve blik op de visie, strategie en de technologische revolutie die HelloTV de onbetwiste marktleider van Nederland maakt.
          </p>

          <button className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(253,203,44,0.3)]">
            <PlayCircle size={24} /> Start Presentatie
          </button>
        </div>

        {/* Floating UI Elements Mockup */}
        <div className="relative w-full max-w-5xl mx-auto mt-20 z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/50 backdrop-blur-xl aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2000" 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <HelloTVLogo theme="dark" className="h-12 mb-4" />
              <h2 className="text-3xl font-bold">HelloTV OS (Intergravity)</h2>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VISIE & STRATEGIE */}
      <div className="py-32 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Onze Visie & Strategie</h2>
            <div className="h-1 w-24 bg-[#FDCB2C] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ultieme Klantreis</h3>
              <p className="text-gray-400 leading-relaxed">
                We verkopen geen TV's, we verkopen kijkervaringen. Door alle online en offline touchpoints naadloos samen te smelten, creëren we een retail-ervaring die niemand in Nederland kan evenaren.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-[#FDCB2C]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="text-[#FDCB2C]" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Focus op Marge & OLED</h3>
              <p className="text-gray-400 leading-relaxed">
                Volume is belangrijk, marge is cruciaal. Door gerichte sturing op OLED (1 op de 2 TV's) en krachtige cross-selling via de Sales Trainers, bouwen we aan een onverslaanbaar en gezond businessmodel.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-purple-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digitaal Fundament</h3>
              <p className="text-gray-400 leading-relaxed">
                Een verouderde backend houdt groei tegen. Met het nieuwe HelloTV OS (Intergravity) hebben we een onverwoestbaar fundament gelegd voor de 18 filialen en het hoofdkantoor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WAT WE IN PETTO HEBBEN (FUTURE ROADMAP) */}
      <div className="py-32 bg-white/5 relative z-10 px-4 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Wat we in petto hebben</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Het huidige dashboard is slechts het begin. Om de concurrentie definitief achter ons te laten, rollen we in de komende fases grensverleggende technologie uit.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 bg-gradient-to-br from-[#FDCB2C] to-orange-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">VMS & Magento API Sync</h4>
                  <p className="text-gray-400">Volledige real-time synchronisatie van winkelvoorraad (VMS) met e-commerce (Magento) zonder handmatige interventie.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-gradient-to-br from-[#FDCB2C] to-orange-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">AI-Gedreven Dagstart</h4>
                  <p className="text-gray-400">Elke ochtend een automatisch gegenereerde video of briefing van de filiaalmanager via AI, gebaseerd op de live target-data van gisteren.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-gradient-to-br from-[#FDCB2C] to-orange-500 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">WhatsApp Ticket Systeem</h4>
                  <p className="text-gray-400">Directe klantcommunicatie via WhatsApp, naadloos geïntegreerd in het CRM voor support, offertes en cross-sell campagnes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-2xl rounded-[3rem]"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
              alt="Data Analysis" 
              className="relative rounded-[2rem] border border-white/20 shadow-2xl"
            />
            
            {/* Overlay floating badge */}
            <div className="absolute -bottom-8 -left-8 bg-gray-900 border border-white/10 p-6 rounded-2xl shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Cpu className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase">Systeem Status</p>
                <p className="text-xl font-black text-white">Klaar voor schaalbaarheid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER CTA */}
      <div className="py-32 text-center px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-8">
          Klaar om de markt <br/> te domineren?
        </h2>
        <button className="px-10 py-5 bg-[#FDCB2C] text-black rounded-full font-black text-xl hover:bg-yellow-400 transition-colors shadow-[0_0_50px_rgba(253,203,44,0.4)]">
          Lanceer HelloTV OS
        </button>
        
        <p className="mt-16 text-gray-500 text-sm flex items-center justify-center gap-2">
          Designed & Developed by <span className="text-white font-bold tracking-wider">VIESA AUTOMATIONS</span> <Zap size={14} className="text-[#FDCB2C]"/>
        </p>
      </div>

    </div>
  );
}
