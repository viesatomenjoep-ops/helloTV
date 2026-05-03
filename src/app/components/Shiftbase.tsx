import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Coffee, Calendar, Search, CheckCircle, Home, FileText, User as UserIcon, Plus, Bell, Key, Briefcase } from 'lucide-react';
import { HelloTVLogo } from './ui/HelloTVLogo';

import { getMedewerkerByCode } from '../../utils/employees';

type ShiftState = 'UITGEKLOKT' | 'INGEKLOKT' | 'PAUZE';
type HelloBaseTab = 'home' | 'rooster' | 'urenregistratie' | 'afwezigheid' | 'meer';

export function Shiftbase() {
  const [medewerkerCode, setMedewerkerCode] = useState('');
  const [botWarning, setBotWarning] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('Niet geselecteerd');
  const [shiftState, setShiftState] = useState<ShiftState>('UITGEKLOKT');
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Hello Base App State
  const [activeTab, setActiveTab] = useState<HelloBaseTab>('urenregistratie');
  const [vakantieType, setVakantieType] = useState('Vakantie');
  const [vakantieSuccess, setVakantieSuccess] = useState(false);



  // Meer Tab State
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const naam = getMedewerkerByCode(medewerkerCode);
    if (naam) {
      setSelectedEmployee(naam);
      setShiftState('UITGEKLOKT');
      setClockInTime(null);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleClockIn = () => {
    setShiftState('INGEKLOKT');
    setClockInTime(new Date());
  };

  const handlePause = () => {
    setShiftState(shiftState === 'PAUZE' ? 'INGEKLOKT' : 'PAUZE');
  };

  const handleClockOut = () => {
    setShiftState('UITGEKLOKT');
    setClockInTime(null);
  };

  const simulateAutoClockOut = () => {
    if (shiftState !== 'UITGEKLOKT') {
      setShiftState('UITGEKLOKT');
      setClockInTime(null);
      setBotWarning(true);
      setTimeout(() => setBotWarning(false), 8000);
    }
  };

  return (
    <div className="flex justify-center md:bg-gray-100 min-h-[100dvh] md:pt-8 md:pb-24 bg-gray-50">
      {/* Mobile App Container Simulation (Native on mobile, Mockup on desktop) */}
      <div className="w-full md:max-w-[400px] bg-gray-50 h-[100dvh] md:h-[800px] md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 relative overflow-hidden flex flex-col">
        
        {/* Status Bar Mock (Hidden on real mobile) */}
        <div className="hidden md:flex h-7 w-full bg-blue-500 justify-between items-center px-6 text-white text-[10px] font-bold z-20 shrink-0">
          <span>{formatTime(currentTime).substring(0,5)}</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-3 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-blue-500 pt-4 pb-6 px-6 text-white relative z-10 rounded-b-3xl shadow-md">
          <h1 className="text-xl font-bold text-center capitalize">{activeTab}</h1>
          <div className="absolute right-6 top-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 pb-20 relative z-0">
          
          {botWarning && (
            <div className="m-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-800">Call Me Bot Alert</h3>
                <p className="text-xs text-red-700 mt-1">Automatisch uitgeklokt om 18:15.</p>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="p-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Welkom {selectedEmployee !== 'Niet geselecteerd' ? selectedEmployee : 'bij Hello Base'}</h2>
                <p className="text-sm text-gray-500">Je bent momenteel {shiftState.toLowerCase()}.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setActiveTab('urenregistratie')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Clock className="text-blue-500 mb-2" size={24} />
                  <span className="text-sm font-bold">Klokken</span>
                </div>
                <div onClick={() => setActiveTab('afwezigheid')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Briefcase className="text-[#1D6F42] mb-2" size={24} />
                  <span className="text-sm font-bold">Vakantie</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'urenregistratie' && (
            <div className="p-6 space-y-6">
              {/* Login Block if not logged in */}
              {selectedEmployee === 'Niet geselecteerd' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Search className="text-blue-500" size={18} />
                    Login met Code
                  </h2>
                  <form onSubmit={handleCodeSubmit}>
                    <input
                      type="text"
                      placeholder="Code (bijv. 921)"
                      value={medewerkerCode}
                      onChange={(e) => setMedewerkerCode(e.target.value)}
                      maxLength={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold text-gray-800 text-center text-lg tracking-widest mb-3"
                    />
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
                      Inloggen
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <p className="text-xs text-gray-500 font-bold">{selectedEmployee}</p>
                    <button 
                      onClick={() => {
                        setSelectedEmployee('Niet geselecteerd');
                        setMedewerkerCode('');
                        setShiftState('UITGEKLOKT');
                        setClockInTime(null);
                      }}
                      className="text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Uitloggen
                    </button>
                  </div>

                  <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${
                    shiftState === 'INGEKLOKT' ? 'bg-green-500' :
                    shiftState === 'PAUZE' ? 'bg-[#FDCB2C]' : 'bg-gray-400'
                  }`} />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest mb-4 uppercase" style={{
                      backgroundColor: shiftState === 'INGEKLOKT' ? '#dcfce7' : shiftState === 'PAUZE' ? '#fef3c7' : '#f3f4f6',
                      color: shiftState === 'INGEKLOKT' ? '#166534' : shiftState === 'PAUZE' ? '#92400e' : '#4b5563'
                    }}>
                      {shiftState === 'INGEKLOKT' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                      STATUS: {shiftState}
                    </div>

                    <div className="font-mono text-5xl font-black text-gray-900 tracking-tighter mb-6">
                      {formatTime(currentTime)}
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                      {shiftState === 'UITGEKLOKT' ? (
                        <button onClick={handleClockIn} className="w-full py-3 bg-[#1D6F42] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg">
                          <Play size={16} fill="currentColor" /> INKLOKKEN
                        </button>
                      ) : (
                        <>
                          <button onClick={handlePause} className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md ${shiftState === 'PAUZE' ? 'bg-blue-600 text-white' : 'bg-[#FDCB2C] text-black'}`}>
                            <Coffee size={16} /> {shiftState === 'PAUZE' ? 'HERVATTEN' : 'PAUZE'}
                          </button>
                          <button onClick={handleClockOut} className="w-full py-3 bg-red-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md">
                            <Square size={16} fill="currentColor" /> UITKLOKKEN
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Developer Trigger */}
              <div className="flex justify-between items-center opacity-50 px-2">
                <HelloTVLogo className="h-4" theme="light" />
                <button onClick={simulateAutoClockOut} className="text-[10px] text-gray-500 underline">Simuleer 18:15</button>
              </div>
            </div>
          )}

          {activeTab === 'afwezigheid' && (
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-md font-bold text-gray-800 mb-4">Nieuwe Aanvraag</h2>
                
                {vakantieSuccess ? (
                  <div className="text-center py-6">
                    <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                    <p className="font-bold text-gray-900">Aanvraag Verzonden!</p>
                    <p className="text-xs text-gray-500 mt-1">Je hoort z.s.m. van HR.</p>
                    <button onClick={() => setVakantieSuccess(false)} className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold">Nieuwe aanvraag</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setVakantieSuccess(true); }}>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
                      <select value={vakantieType} onChange={(e) => setVakantieType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Vakantie</option>
                        <option>Ziekte</option>
                        <option>Bijzonder Verlof</option>
                        <option>Zorgverlof</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Van</label>
                        <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Tot</label>
                        <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Opmerking</label>
                      <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none h-20" placeholder="Optioneel..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700">
                      Aanvraag Indienen
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'meer' && (
            <div className="p-0">
              {/* Profile Card (from screenshot) */}
              <div className="bg-white rounded-xl shadow-md mx-6 -mt-4 relative z-20 p-4 flex items-center gap-4 border border-gray-100">
                <img src="https://ui-avatars.com/api/?name=Tom+van+Biene&background=random" alt="Profile" className="w-16 h-16 rounded-full shadow-sm" />
                <div>
                  <h2 className="font-bold text-lg text-gray-900">{selectedEmployee !== 'Niet geselecteerd' ? selectedEmployee : 'Tom van Biene'}</h2>
                  <p className="text-xs text-gray-500">tomvanbiene@gmail.com</p>
                </div>
                <div className="ml-auto text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>

              {/* Menu List */}
              {!activeSubTab ? (
                <div className="bg-white mt-6 border-y border-gray-100">
                  {[
                    { id: 'feedback', icon: <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>, label: 'Feedback geven' },
                    { id: 'beschikbaarheid', icon: <UserIcon className="w-5 h-5 text-blue-400" />, label: 'Beschikbaarheid' },
                    { id: 'plusmin', icon: <Calendar className="w-5 h-5 text-blue-400" />, label: 'Plus min uren' },
                    { id: 'nieuws', icon: <FileText className="w-5 h-5 text-blue-400" />, label: 'Nieuws' },
                    { id: 'bestanden', icon: <FileText className="w-5 h-5 text-blue-400" />, label: 'Bestanden' },
                    { id: 'kioskcode', icon: <Key className="w-5 h-5 text-blue-400" />, label: 'Kioskcode & Verkoopnummers' },
                  ].map((item, idx) => (
                    <div key={idx} onClick={() => setActiveSubTab(item.id)} className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                      <div className="ml-auto text-gray-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white mt-6 border-y border-gray-100 min-h-[400px]">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2 cursor-pointer text-blue-500 font-bold" onClick={() => setActiveSubTab(null)}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Terug
                  </div>
                  
                  <div className="p-6">
                    {activeSubTab === 'kioskcode' && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 mb-4">Mijn Kioskcodes & Verkoopnummers</h3>
                        <p className="text-xs text-gray-500 mb-4">Deze nummers zijn gekoppeld aan de database. Wijzigingen worden direct actief in de kassa en online systemen.</p>
                        
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Inlogcode (Kiosk)</label>
                          <input type="text" defaultValue="921" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Online Upsell Nummer</label>
                          <input type="text" defaultValue="ONL-921" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-blue-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Chatnummer</label>
                          <input type="text" defaultValue="CHT-921" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-green-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Winkelmedewerker (WM) Nummer</label>
                          <input type="text" defaultValue="WM-921" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-purple-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Barbecue (BBQ) Nummer</label>
                          <input type="text" defaultValue="BBQ-921" className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-orange-600" />
                        </div>
                        
                        <button className="w-full py-3 bg-[#FDCB2C] text-black font-bold rounded-xl text-sm shadow mt-4">
                          Opslaan
                        </button>
                      </div>
                    )}
                    
                    {activeSubTab === 'feedback' && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 mb-2">Feedback Geven</h3>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none h-32" placeholder="Wat wil je delen met je manager?"></textarea>
                        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm shadow">Verstuur Feedback</button>
                      </div>
                    )}

                    {['beschikbaarheid', 'plusmin', 'nieuws', 'bestanden'].includes(activeSubTab) && (
                      <div className="text-center py-8">
                        <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                        <h3 className="font-bold text-gray-900 capitalize">{activeSubTab}</h3>
                        <p className="text-xs text-gray-500 mt-2">API Module actief en gekoppeld.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-between items-center px-6 py-4 pb-8 z-20">
          <div onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}>
            <Home size={20} />
            <span className="text-[10px] font-bold">Home</span>
          </div>
          <div onClick={() => setActiveTab('rooster')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'rooster' ? 'text-blue-500' : 'text-gray-400'}`}>
            <Calendar size={20} />
            <span className="text-[10px] font-bold">Rooster</span>
          </div>
          <div onClick={() => setActiveTab('urenregistratie')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'urenregistratie' ? 'text-blue-500' : 'text-gray-400'}`}>
            <Clock size={20} />
            <span className="text-[10px] font-bold">Urenregistr...</span>
          </div>
          <div onClick={() => setActiveTab('afwezigheid')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'afwezigheid' ? 'text-blue-500' : 'text-gray-400'}`}>
            <Briefcase size={20} />
            <span className="text-[10px] font-bold">Afwezigheid</span>
          </div>
          <div onClick={() => setActiveTab('meer')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${activeTab === 'meer' ? 'text-blue-500' : 'text-gray-400'}`}>
            <div className="flex gap-[2px]">
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            </div>
            <span className="text-[10px] font-bold mt-1">Meer</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper to generate consistent mock IDs
declare global {
  interface String {
    hashCode(): number;
  }
}
String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
