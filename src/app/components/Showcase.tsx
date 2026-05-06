import React, { useState, useEffect } from 'react';
import { Star, Monitor, Target, Map, ArrowDown, Award, Tv, Users } from 'lucide-react';

export function Showcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.floor(scrollPosition / windowHeight);
      setActiveSlide(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#FDCB2C] selection:text-black">
      
      {/* Slide 1: Hero / Magie van 11-11 */}
      <section className="min-h-[100dvh] relative flex items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FDCB2C]/20 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4">
            <Star className="text-[#FDCB2C]" size={16} fill="currentColor" />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-300">De Magie van The Show</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-8">
            Visie & Strategie <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDCB2C] to-yellow-600">HelloTV 2026</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-12" style={{ animationDelay: '200ms' }}>
            Niet zomaar een visie. Dit is het hart, de ziel en de zaligheid van HelloTV. 
            Ontworpen om de markt te domineren en de ultieme klantreis te creëren.
          </p>

          <p className="text-lg md:text-2xl font-bold text-white mb-12 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12" style={{ animationDelay: '400ms' }}>
            "Wij veroveren niet alleen Nederland. Wij zetten de nieuwe wereldwijde standaard voor retail."
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16" style={{ animationDelay: '600ms' }}>
            <button className="px-10 py-5 bg-[#FDCB2C] text-black rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
              Ontdek de Geschiedenis <ArrowDown />
            </button>
          </div>
        </div>
      </section>

      {/* Slide 2: De Geschiedenis van Platte TV */}
      <section className="min-h-[100dvh] relative flex items-center py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-bold uppercase tracking-wider">
                Onze Reis
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Hoe Het Allemaal Begon: De Revolutie van de <span className="text-[#FDCB2C]">Platte TV</span>.
              </h2>
              <div className="space-y-6 text-xl text-gray-400 leading-relaxed font-light">
                <p>
                  We gaan even terug in de tijd. Naar het moment waarop de logge beeldbuizen plaatsmaakten voor het slanke, revolutionaire design van de platte TV. Op dat exacte omslagpunt zagen wij onze kans. We wisten: dit gaat alles veranderen. En wij wilden de voorhoede zijn.
                </p>
                <p>
                  PlatteTV werd geboren vanuit een ongekende passie voor beeld, geluid en pure emotie. Geen stoffige elektronica-winkel, maar een plek waar weklanten meenamen in een beleving. De allereerste Plasma's en LCD's, we stonden erbij, keken ernaar en verkochten ze alsof ons leven er vanaf hing. En met succes. 
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative group perspective">
              <div className="space-y-6 transform translate-y-8">
                <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <Tv className="text-blue-500 mb-6" size={40} />
                  <h3 className="text-2xl font-bold mb-2">De Pioniers</h3>
                  <p className="text-gray-400">Als eerste in de markt met focus op échte specialisatie in beeld en geluid.</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Vintage Flat TV" 
                  className="rounded-3xl border border-white/10 shadow-2xl opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Home Cinema" 
                  className="rounded-3xl border border-white/10 shadow-2xl"
                />
                <div className="bg-gradient-to-br from-[#FDCB2C] to-yellow-600 p-8 rounded-3xl text-black shadow-2xl">
                  <Award className="mb-6" size={40} />
                  <h3 className="text-2xl font-black mb-2">Expertise First</h3>
                  <p className="font-medium opacity-90">Kennis was macht. En wij wisten alles over refreshrates en resoluties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3: Van 1 naar 18 Filialen */}
      <section className="min-h-[100dvh] relative flex flex-col justify-center py-24 bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5 filter grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">De Vlucht: <br/>Van 1 naar 18 Fysieke Winkels</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Het bleef niet bij dat ene filiaal. Waar anderen krimpten, zagen wij expansie. Waar concurrenten zich terugtrokken achter een webshop, openden wij juist fysieke belevingswerelden door het hele land.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors group">
              <Map className="text-gray-500 group-hover:text-[#FDCB2C] transition-colors mb-8" size={48} />
              <h3 className="text-3xl font-black mb-4">Landelijke Dekking</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Van Breda tot Groningen, van Amsterdam tot Doetinchem. Met 18 winkels staan we altijd in direct contact met onze klanten. Een netwerk dat ongekend is.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors group">
              <Users className="text-gray-500 group-hover:text-blue-500 transition-colors mb-8" size={48} />
              <h3 className="text-3xl font-black mb-4">250+ Specialisten</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Onze winkels zijn gevuld met gepassioneerde kenners. Geen vakkenvullers, maar experts die ademen in pixels en hertz. Een dedicated team van 250 helden.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors group">
              <Target className="text-gray-500 group-hover:text-purple-500 transition-colors mb-8" size={48} />
              <h3 className="text-3xl font-black mb-4">Rebranding HelloTV</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                PlatteTV werd HelloTV. Een nieuwe identiteit, een nog sterkere belofte. We zijn de autoriteit, de nummer 1. En die positie stralen we elke dag uit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Ziel & Zaligheid & De Wereld Veroveren */}
      <section className="min-h-[100dvh] relative flex items-center py-24 bg-[#111]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDCB2C]/10 rounded-full filter blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px]"></div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-tight">
              Met <span className="text-[#FDCB2C]">Ziel & Zaligheid</span><br/> De Wereld Veroveren.
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-8 text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              <p>
                Vandaag de dag staan we aan de vooravond van een nieuw tijdperk. De televisies van 2026—zoals MicroLED en onzichtbare OLED-panelen—veranderen de manier waarop mensen leven. Wij zijn niet zomaar verkopers; wij zijn curatoren van emotie.
              </p>
              <p>
                Het is deze mentaliteit, deze bloed-zweet-en-tranen toewijding, die ons de absolute marktleider heeft gemaakt. We hebben gebouwd op vertrouwen, op service en op de ontembare wens om altijd een stap voor te blijven.
              </p>
              <p className="font-black text-white text-3xl md:text-4xl pt-8 leading-tight">
                De Wereld is Klaar voor de Magie van HelloTV. En Wij Zijn Dat Ook.
              </p>
            </div>
            
            <div className="mt-20">
              <div className="inline-block px-12 py-6 rounded-full border border-[#FDCB2C]/30 bg-[#FDCB2C]/10 text-[#FDCB2C] font-bold tracking-widest text-lg">
                Premium Quality
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
