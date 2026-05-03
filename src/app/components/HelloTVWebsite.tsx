import React, { useState } from 'react';
import { ShieldCheck, Tv, Headphones, PenTool as Tool, Search, User, ShoppingCart, CheckCircle, ChevronRight, Star, Plus, Upload, X, Menu } from 'lucide-react';

export function HelloTVWebsite() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sander Visser', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
    { id: 2, name: 'Lisa van Dijk', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' }
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhoto, setNewMemberPhoto] = useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberPhoto) return;
    setTeamMembers([...teamMembers, { id: Date.now(), name: newMemberName, photoUrl: newMemberPhoto }]);
    setNewMemberName('');
    setNewMemberPhoto('');
  };

  const removeMember = (id: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-y-auto">
      
      {/* CMS Admin Toggle */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-[60] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="font-bold">Website Beheeromgeving (CMS)</div>
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`px-4 py-2 rounded font-bold text-sm transition-colors ${isAdminMode ? 'bg-[#FDCB2C] text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          {isAdminMode ? 'Sluit Beheer' : 'Open Website Beheer'}
        </button>
      </div>

      {isAdminMode && (
        <div className="bg-gray-100 p-8 border-b border-gray-300 shadow-inner z-[55] relative">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-black mb-6">Teamleden Beheer (Achterkant)</h2>
            <form onSubmit={handleAddMember} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end mb-8">
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Naam Teamlid</label>
                <input 
                  type="text" 
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Bijv. Tom van Biene"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                  required
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Foto URL</label>
                <input 
                  type="url" 
                  value={newMemberPhoto}
                  onChange={(e) => setNewMemberPhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 md:h-[42px]">
                <Upload size={18} /> Toevoegen
              </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 relative group">
                  <button 
                    onClick={() => removeMember(member.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X size={14} />
                  </button>
                  <img src={member.photoUrl} alt={member.name} className="w-full h-32 object-cover" />
                  <div className="p-3 text-center">
                    <p className="font-bold text-sm text-gray-900">{member.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      
      {/* Top Bar */}
      <div className="bg-[#FDCB2C] text-black text-xs font-bold py-2 px-4 flex justify-between items-center hidden md:flex">
        <div className="flex gap-6 max-w-7xl mx-auto w-full px-4">
          <span className="flex items-center gap-1"><CheckCircle size={14} /> Voor 23:59 besteld, morgen in huis</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} /> Gratis bezorgd vanaf €50,-</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} /> 18 filialen in Nederland</span>
          <span className="flex items-center gap-1"><CheckCircle size={14} /> Klanten geven ons een 9.2</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-700 hover:text-black transition-colors">
              <Menu size={24} />
            </button>
            <span className="font-black text-2xl md:text-3xl tracking-tighter">Hello<span className="text-[#FDCB2C]">TV</span></span>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Waar ben je naar op zoek?" 
              className="w-full bg-gray-100 border-none rounded-full py-3 pl-6 pr-12 outline-none focus:ring-2 focus:ring-[#FDCB2C]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <div className="flex items-center gap-6">
            <div className="md:hidden cursor-pointer hover:text-[#FDCB2C] transition-colors">
              <Search size={24} />
            </div>
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#FDCB2C] transition-colors">
              <User size={24} />
              <span className="text-xs font-bold mt-1">Inloggen</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-[#FDCB2C] transition-colors relative">
              <ShoppingCart size={24} />
              <span className="hidden md:block text-xs font-bold mt-1">Winkelwagen</span>
              <span className="absolute -top-1 -right-2 md:-top-2 md:-right-2 bg-[#FDCB2C] text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
        
        {/* Menu Categories */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-8 flex gap-8">
            {['Televisies', 'Audio', 'Accessoires', 'Aanbiedingen', 'Advies', 'Winkels'].map((item) => (
              <a key={item} href="#" className="py-4 text-sm font-bold text-gray-700 hover:text-[#FDCB2C] transition-colors border-b-2 border-transparent hover:border-[#FDCB2C]">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#FDCB2C] hover:bg-yellow-400 text-black font-bold rounded-xl transition-all">
                Bekijk alle OLED TV's
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all">
                Vind een winkel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Erkende Dealer Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <ShieldCheck className="mx-auto text-[#FDCB2C] mb-6" size={48} />
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

      {/* Actuele Aanbiedingen */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-black mb-2">Actuele Aanbiedingen</h2>
              <p className="text-gray-600">De beste prijzen voor televisies en audioaccessoires.</p>
            </div>
            <button className="font-bold text-black border-b-2 border-[#FDCB2C] pb-1 hover:text-[#FDCB2C] transition-colors w-max">
              Bekijk alle aanbiedingen
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { merk: 'Samsung', model: 'QE65S95D', type: 'QD-OLED', oud: 2999, nieuw: 2499, label: 'Kassakorting' },
              { merk: 'LG', model: 'OLED55G5', type: 'OLED evo', oud: 2299, nieuw: 1899, label: 'Cashback' },
              { merk: 'Sony', model: 'Bravia 9 (65")', type: 'MiniLED', oud: 3499, nieuw: 2999, label: 'Kassakorting' },
              { merk: 'Samsung', model: 'HW-Q990D', type: 'Soundbar', oud: 1499, nieuw: 1199, label: 'Actie' }
            ].map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer relative group">
                <div className="absolute top-4 left-4 bg-[#FDCB2C] text-black text-xs font-black px-3 py-1 rounded-full z-10">
                  {p.label}
                </div>
                <div className="h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
                  <Tv size={48} className="text-gray-300" />
                </div>
                <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">{p.merk} | {p.type}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">{p.model}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">€{p.oud}</span>
                  <span className="text-xl font-black text-red-600">€{p.nieuw}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18 Filialen Sectie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-6">Ontdek onze 18 filialen</h2>
            <p className="text-lg text-gray-600">
              Met 18 winkels door heel Nederland is er altijd een HelloTV bij jou in de buurt. Kom langs voor persoonlijk advies, ervaar de beeld- en geluidskwaliteit zelf, en laat je inspireren door onze experts. Wat we allemaal doen? Van aankoopadvies tot professionele installatie bij je thuis, we regelen het van A tot Z!
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            {[
              'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Bergen op Zoom', 'Breda',
              'Cruquius', 'Den Bosch', 'Doetinchem', 'Duiven', 'Eindhoven', 'Groningen',
              'Leeuwarden', 'Naarden', 'Nijmegen', 'Rotterdam', 'Tilburg', 'Zoeterwoude'
            ].map(stad => (
              <div key={stad} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#FDCB2C] hover:border-[#FDCB2C] transition-colors cursor-pointer group flex items-center justify-center">
                <span className="font-bold text-gray-700 group-hover:text-black">{stad}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Sectie (Voorkant) */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-6">Ontmoet ons Team</h2>
            <p className="text-lg text-gray-600">
              Onze gepassioneerde experts staan elke dag klaar om jou het beste advies te geven.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 w-64 hover:shadow-xl transition-all group cursor-pointer">
                <div className="h-64 overflow-hidden relative">
                  <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom HelloTV? */}
      <section className="bg-[#1A1A1A] text-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-[#FDCB2C]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-[#FDCB2C]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Erkend Dealer</h3>
              <p className="text-gray-400 text-sm">Volledige garantie en 100% originele Benelux-modellen van alle A-merken.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#FDCB2C]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Tv className="text-[#FDCB2C]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">18 Echte Winkels</h3>
              <p className="text-gray-400 text-sm">Beleef beeld en geluid zelf. Kom langs in één van onze 18 uitgebreide showrooms.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#FDCB2C]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Headphones className="text-[#FDCB2C]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Persoonlijk Advies</h3>
              <p className="text-gray-400 text-sm">Onze experts helpen je 7 dagen per week via chat, telefoon of in de winkel.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-[#FDCB2C]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Tool className="text-[#FDCB2C]" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Installatie Service</h3>
              <p className="text-gray-400 text-sm">Van simpel ophangen tot volledige kalibratie. Onze monteurs regelen het.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <div className="text-center lg:text-left">© {new Date().getFullYear()} HelloTV. Alle rechten voorbehouden.</div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center">
            <a href="#" className="hover:text-[#FDCB2C]">Klantenservice</a>
            <a href="#" className="hover:text-[#FDCB2C]">Algemene Voorwaarden</a>
            <a href="#" className="hover:text-[#FDCB2C]">Privacy Policy</a>
            <a href="#" className="hover:text-[#FDCB2C]">Erkende Dealer Pagina</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
