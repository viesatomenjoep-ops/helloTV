import React from 'react';
import { ShieldCheck, Tv, Headphones, PenTool as Tool, Search, User, ShoppingCart, CheckCircle, ChevronRight, Star } from 'lucide-react';

export function HelloTVWebsite() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-y-auto">
      
      {/* Top Bar */}
      <div className="bg-[#1D6F42] text-white text-xs py-2 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex gap-6 max-w-7xl mx-auto w-full px-4">
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-[#FDCB2C]" /> Voor 23:59 besteld, morgen in huis</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-[#FDCB2C]" /> Gratis bezorgd vanaf €50,-</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-[#FDCB2C]" /> 13 winkels in Nederland</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-[#FDCB2C]" /> Klanten geven ons een 9.2</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <span className="font-black text-3xl tracking-tighter">Hello<span className="text-[#1D6F42]">TV</span></span>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Waar ben je naar op zoek?" 
              className="w-full bg-gray-100 border-none rounded-full py-3 pl-6 pr-12 outline-none focus:ring-2 focus:ring-[#1D6F42]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#1D6F42] transition-colors">
              <User size={24} />
              <span className="text-xs font-bold mt-1">Inloggen</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-[#1D6F42] transition-colors relative">
              <ShoppingCart size={24} />
              <span className="text-xs font-bold mt-1">Winkelwagen</span>
              <span className="absolute -top-2 -right-2 bg-[#FDCB2C] text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
        
        {/* Menu Categories */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-8 flex gap-8">
            {['Televisies', 'Audio', 'Accessoires', 'Aanbiedingen', 'Advies', 'Winkels'].map((item) => (
              <a key={item} href="#" className="py-4 text-sm font-bold text-gray-700 hover:text-[#1D6F42] transition-colors border-b-2 border-transparent hover:border-[#1D6F42]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Premium TV" 
            className="w-full h-[600px] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-8 py-32 md:py-48 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FDCB2C] text-black font-black text-xs uppercase tracking-widest rounded-full mb-6">
              Nieuwe Collectie 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Kies voor de <br/>Beste Beleving.
            </h1>
            <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed">
              Als dé erkende specialist van Nederland bieden wij je niet alleen de beste prijzen, maar bovenal het allerbeste advies voor jouw ultieme thuisbioscoop.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-[#1D6F42] hover:bg-green-700 text-white font-bold rounded-xl transition-all">
                Bekijk alle OLED TV's
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all">
                Vind een winkel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Erkende Dealer Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <ShieldCheck className="mx-auto text-[#1D6F42] mb-6" size={48} />
          <h2 className="text-3xl font-black mb-4">HelloTV is 100% Erkende Dealer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Wij zijn trots officieel partner en erkend dealer van alle grote A-merken. Dit betekent dat je bij ons gegarandeerd bent van originele Benelux-modellen, volledige fabrieksgarantie en de allerbeste, up-to-date productkennis van onze experts.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['SAMSUNG', 'LG OLED', 'SONY', 'PHILIPS', 'TCL', 'HISENSE'].map(brand => (
              <span key={brand} className="text-2xl md:text-4xl font-black tracking-tighter text-gray-400 hover:text-black transition-colors cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categorieën */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-black mb-10">Ontdek ons assortiment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="OLED TVs" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-2">OLED TV's</h3>
                <span className="text-white flex items-center gap-1 text-sm font-bold group-hover:text-[#FDCB2C] transition-colors">
                  Bekijk assortiment <ChevronRight size={16} />
                </span>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Soundbars" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-2">Soundbars & Audio</h3>
                <span className="text-white flex items-center gap-1 text-sm font-bold group-hover:text-[#FDCB2C] transition-colors">
                  Bekijk assortiment <ChevronRight size={16} />
                </span>
              </div>
            </div>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="QLED TVs" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-2">QD-OLED & Neo QLED</h3>
                <span className="text-white flex items-center gap-1 text-sm font-bold group-hover:text-[#FDCB2C] transition-colors">
                  Bekijk assortiment <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom HelloTV? */}
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-[#1D6F42]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-[#1D6F42]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Erkend Dealer</h3>
              <p className="text-gray-400 text-sm">Volledige garantie en 100% originele Benelux-modellen van alle A-merken.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#1D6F42]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Tv className="text-[#1D6F42]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">13 Echte Winkels</h3>
              <p className="text-gray-400 text-sm">Beleef beeld en geluid zelf. Kom langs in één van onze uitgebreide showrooms.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#1D6F42]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Headphones className="text-[#1D6F42]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Persoonlijk Advies</h3>
              <p className="text-gray-400 text-sm">Onze experts helpen je 7 dagen per week via chat, telefoon of in de winkel.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#1D6F42]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Tool className="text-[#1D6F42]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Installatie Service</h3>
              <p className="text-gray-400 text-sm">Van simpel ophangen tot volledige kalibratie. Onze monteurs regelen het.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <div>© {new Date().getFullYear()} HelloTV. Alle rechten voorbehouden.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1D6F42]">Klantenservice</a>
            <a href="#" className="hover:text-[#1D6F42]">Algemene Voorwaarden</a>
            <a href="#" className="hover:text-[#1D6F42]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D6F42]">Erkende Dealer Pagina</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
