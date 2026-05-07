import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Coffee, Calendar, Search, CheckCircle, Home, FileText, User as UserIcon, Plus, Bell, Key, Briefcase, Users, Mail, MessageCircle } from 'lucide-react';
import { HelloTVLogo } from './ui/HelloTVLogo';

import { getMedewerkerByCode } from '../../utils/employees';

type ShiftState = 'UITGEKLOKT' | 'INGEKLOKT' | 'PAUZE';
type HelloBaseTab = 'home' | 'rooster' | 'team' | 'urenregistratie' | 'afwezigheid' | 'meer';

const MOCK_TEAM = [
  { name: 'Nick', status: 'INGEKLOKT', role: 'Verkoper', time: '09:00 - 18:00' },
  { name: 'Sanne', status: 'PAUZE', role: 'Klantenservice', time: '10:00 - 19:00' },
  { name: 'Lorenzo', status: 'VRIJ (Vakantie)', role: 'Adviseur', time: '-' },
  { name: 'Steve', status: 'INGEKLOKT', role: 'Store Manager', time: '08:30 - 17:30' },
];

const MOCK_OPEN_DIENSTEN = [
  { date: 'Zaterdag 14 Mei', time: '09:00 - 18:00', role: 'Verkoper', location: 'Amsterdam' },
  { date: 'Zondag 15 Mei', time: '12:00 - 17:00', role: 'Klantenservice', location: 'Amsterdam' },
];

function ShiftbaseApp({ isTablet = false }: { isTablet?: boolean }) {
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

  const [aanvragen, setAanvragen] = useState([
    { type: 'Vakantie', date: '22-07 t/m 05-08', status: 'Goedgekeurd' },
    { type: 'Ziekte', date: '01-05', status: 'Verwerkt' },
    { type: 'Vakantie', date: '12-09 t/m 15-09', status: 'In Behandeling' }
  ]);

  // Kiosk settings
  const [kioskCode, setKioskCode] = useState('921');
  const [kioskSaved, setKioskSaved] = useState(false);

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

  const handleVakantieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVakantieSuccess(true);
    setAanvragen([{ type: vakantieType, date: 'Nieuwe aanvraag', status: 'In Behandeling' }, ...aanvragen]);
    alert(`Verzoek verzonden!
Roostermaker heeft zojuist een notificatie ontvangen via WhatsApp & E-mail.`);
  };

  const handleKioskSave = () => {
    setKioskSaved(true);
    setTimeout(() => setKioskSaved(false), 3000);
  };

  return (
    <>
      {/* App Container Simulation */}
      <div className={`w-full bg-gray-50 h-[100dvh] md:h-[800px] md:shadow-2xl md:rounded-[3rem] md:border-[8px] md:border-gray-900 relative overflow-hidden flex flex-col shrink-0 ${isTablet ? 'md:w-[800px]' : 'md:w-[400px]'}`}>
        
        {/* Status Bar Mock */}
        <div className="hidden md:flex h-7 w-full bg-[#111111] justify-between items-center px-6 text-white text-[10px] font-bold z-20 shrink-0">
          <span>{formatTime(currentTime).substring(0,5)}</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-3 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-[#111111] pt-4 pb-6 px-6 text-[#FDCB2C] relative z-10 rounded-b-3xl shadow-md border-b-4 border-[#FDCB2C]">
          <h1 className="text-xl font-black text-center capitalize tracking-wide">{activeTab}</h1>
          <div className="absolute right-6 top-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#FDCB2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <h2 className="text-lg font-bold text-gray-800 mb-2">Welkom {selectedEmployee !== 'Niet geselecteerd' ? selectedEmployee : 'bij HelloTV Base'}</h2>
                <p className="text-sm font-bold text-[#FDCB2C] bg-black inline-block px-3 py-1 rounded-full">{shiftState}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setActiveTab('urenregistratie')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#FDCB2C]">
                  <Clock className="text-gray-900 mb-2" size={24} />
                  <span className="text-sm font-bold">Klokken</span>
                </div>
                <div onClick={() => setActiveTab('afwezigheid')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#FDCB2C]">
                  <Briefcase className="text-gray-900 mb-2" size={24} />
                  <span className="text-sm font-bold">Vakantie</span>
                </div>
                <div onClick={() => setActiveTab('team')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#FDCB2C]">
                  <Users className="text-gray-900 mb-2" size={24} />
                  <span className="text-sm font-bold">Mijn Team</span>
                </div>
                <div onClick={() => setActiveTab('rooster')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[#FDCB2C]">
                  <Calendar className="text-gray-900 mb-2" size={24} />
                  <span className="text-sm font-bold">Rooster</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Aanwezigheid Team (Vandaag)</h2>
              <div className="space-y-3">
                {MOCK_TEAM.map((member, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="text-gray-500" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role} • {member.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      member.status === 'INGEKLOKT' ? 'bg-green-100 text-green-800' :
                      member.status === 'PAUZE' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rooster' && (
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Mijn Rooster</h2>
                  <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">Week 20 - 2026</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 uppercase font-bold tracking-wider">11 Mei 2026 t/m 17 Mei 2026</p>
                
                <div className="space-y-3 mb-6">
                  {/* Maandag */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 block">Ma 11 Mei</span>
                      <span className="text-xs text-gray-500">Filiaal Breda</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">10:00 - 18:00</span>
                      <span className="text-xs text-gray-400">Verkoop (8u)</span>
                    </div>
                  </div>

                  {/* Dinsdag */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 block">Di 12 Mei</span>
                      <span className="text-xs text-gray-500">Filiaal Breda</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">10:00 - 18:00</span>
                      <span className="text-xs text-gray-400">Verkoop (8u)</span>
                    </div>
                  </div>

                  {/* Woensdag */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center opacity-60">
                    <div>
                      <span className="font-bold text-gray-500 block">Wo 13 Mei</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-400 block uppercase text-xs tracking-widest">Vrij / Afwezig</span>
                    </div>
                  </div>

                  {/* Donderdag */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 block">Do 14 Mei</span>
                      <span className="text-xs text-gray-500">Filiaal Breda</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">10:00 - 18:00</span>
                      <span className="text-xs text-gray-400">Verkoop (8u)</span>
                    </div>
                  </div>

                  {/* Vrijdag */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 block">Vr 15 Mei</span>
                      <span className="text-xs text-gray-500">Filiaal Breda</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">10:00 - 18:00</span>
                      <span className="text-xs text-gray-400">Verkoop (8u)</span>
                    </div>
                  </div>

                  {/* Zaterdag */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center border-l-4 border-blue-500">
                    <div>
                      <span className="font-bold text-gray-800 block">Za 16 Mei</span>
                      <span className="text-xs text-gray-500">Filiaal Breda</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">10:00 - 18:00</span>
                      <span className="text-xs text-gray-400">Weekend (8u)</span>
                    </div>
                  </div>

                  {/* Zondag */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center opacity-60">
                    <div>
                      <span className="font-bold text-gray-500 block">Zo 17 Mei</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-400 block uppercase text-xs tracking-widest">Vrij / Afwezig</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Bell size={18} className="text-[#FDCB2C]" /> Open Diensten
                </h2>
                {MOCK_OPEN_DIENSTEN.map((dienst, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm text-gray-900">{dienst.date}</p>
                      <p className="text-xs text-gray-500">{dienst.time} • {dienst.role}</p>
                    </div>
                    <button className="px-3 py-1.5 bg-[#FDCB2C] text-black text-xs font-bold rounded hover:opacity-80">Reageren</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'urenregistratie' && (
            <div className="p-6 space-y-6">
              {/* Login Block if not logged in */}
              {selectedEmployee === 'Niet geselecteerd' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Search className="text-[#FDCB2C]" size={18} />
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
                    <button type="submit" className="w-full py-3 bg-[#111111] text-[#FDCB2C] rounded-xl font-bold hover:bg-black">
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
                    shiftState === 'INGEKLOKT' ? 'bg-[#1D6F42]' :
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
                          <button onClick={handlePause} className={`w-full py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md ${shiftState === 'PAUZE' ? 'bg-[#111111] text-[#FDCB2C]' : 'bg-[#FDCB2C] text-black'}`}>
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

              {/* Uren Registratie Overview */}
              {selectedEmployee !== 'Niet geselecteerd' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Recente Registraties</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">Gisteren</span>
                      <span className="text-gray-500">09:00 - 18:00</span>
                      <span className="text-green-600 font-bold">Goedgekeurd</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">Eergisteren</span>
                      <span className="text-gray-500">Vakantie</span>
                      <span className="text-green-600 font-bold">Goedgekeurd</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">3 Dagen Geleden</span>
                      <span className="text-gray-500">09:00 - 18:15</span>
                      <span className="text-orange-500 font-bold">Correctie Nodig</span>
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
            <div className="p-6 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-md font-bold text-gray-800 mb-4">Nieuwe Aanvraag</h2>
                
                {vakantieSuccess ? (
                  <div className="text-center py-6">
                    <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                    <p className="font-bold text-gray-900">Aanvraag Verzonden!</p>
                    <p className="text-xs text-gray-500 mt-1">Roostermaker heeft een WhatsApp & Mail notificatie ontvangen.</p>
                    <button onClick={() => setVakantieSuccess(false)} className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold">Nieuwe aanvraag</button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleVakantieSubmit}>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
                      <select value={vakantieType} onChange={(e) => setVakantieType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-[#FDCB2C]">
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
                    <button type="submit" className="w-full py-3 bg-[#111111] text-[#FDCB2C] rounded-xl font-bold text-sm hover:bg-black">
                      Aanvraag Indienen (Stuur Notificatie)
                    </button>
                  </form>
                )}
              </div>

              {/* History */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Status Aanvragen</h3>
                <div className="space-y-3">
                  {aanvragen.map((aanvraag, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                      <div>
                        <p className="font-bold text-gray-800">{aanvraag.type}</p>
                        <p className="text-xs text-gray-500">{aanvraag.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        aanvraag.status === 'Goedgekeurd' ? 'bg-green-100 text-green-800' :
                        aanvraag.status === 'In Behandeling' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {aanvraag.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meer' && (
            <div className="p-0">
              <div className="bg-white rounded-xl shadow-md mx-6 mt-4 relative z-20 p-4 flex items-center gap-4 border border-gray-100">
                <img src="https://ui-avatars.com/api/?name=Tom+van+Biene&background=random" alt="Profile" className="w-16 h-16 rounded-full shadow-sm" />
                <div>
                  <h2 className="font-bold text-lg text-gray-900">{selectedEmployee !== 'Niet geselecteerd' ? selectedEmployee : 'Tom van Biene'}</h2>
                  <p className="text-xs text-gray-500">tomvanbiene@gmail.com</p>
                </div>
                <div className="ml-auto text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>

              {!activeSubTab ? (
                <div className="bg-white mt-6 border-y border-gray-100">
                  {[
                    { id: 'kioskcode', icon: <Key className="w-5 h-5 text-gray-800" />, label: 'Kioskcode & Verkoopnummers' },
                    { id: 'feedback', icon: <MessageCircle className="w-5 h-5 text-gray-800" />, label: 'Feedback geven' },
                    { id: 'beschikbaarheid', icon: <UserIcon className="w-5 h-5 text-gray-800" />, label: 'Beschikbaarheid' },
                    { id: 'plusmin', icon: <Calendar className="w-5 h-5 text-gray-800" />, label: 'Plus min uren' },
                    { id: 'nieuws', icon: <FileText className="w-5 h-5 text-gray-800" />, label: 'Nieuws' },
                    { id: 'bestanden', icon: <FileText className="w-5 h-5 text-gray-800" />, label: 'Bestanden' },
                  ].map((item, idx) => (
                    <div key={idx} onClick={() => setActiveSubTab(item.id)} className="flex items-center gap-4 p-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
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
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2 cursor-pointer text-gray-800 font-bold hover:bg-gray-50" onClick={() => setActiveSubTab(null)}>
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
                          <input type="text" value={kioskCode} onChange={(e) => setKioskCode(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Online Upsell Nummer</label>
                          <input type="text" value={`ONL-${kioskCode}`} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-blue-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Chatnummer</label>
                          <input type="text" value={`CHT-${kioskCode}`} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-green-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Winkelmedewerker (WM) Nummer</label>
                          <input type="text" value={`WM-${kioskCode}`} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-purple-600" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1">Barbecue (BBQ) Nummer</label>
                          <input type="text" value={`BBQ-${kioskCode}`} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none font-mono font-bold text-orange-600" />
                        </div>
                        
                        <button onClick={handleKioskSave} className="w-full py-3 bg-[#FDCB2C] text-black font-bold rounded-xl text-sm shadow mt-4 transition-all">
                          {kioskSaved ? <span className="flex items-center justify-center gap-2"><CheckCircle size={16}/> Opgeslagen</span> : 'Opslaan'}
                        </button>
                      </div>
                    )}
                    
                    {activeSubTab === 'feedback' && (
                      <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 mb-2">Feedback Geven</h3>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none h-32" placeholder="Wat wil je delen met je manager?"></textarea>
                        <button className="w-full py-3 bg-[#111111] text-[#FDCB2C] font-bold rounded-xl text-sm shadow">Verstuur Feedback</button>
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
        <div className="absolute bottom-0 w-full bg-[#111111] flex justify-between items-center px-4 py-3 pb-8 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-1/5 ${activeTab === 'home' ? 'text-[#FDCB2C]' : 'text-gray-400'}`}>
            <Home size={20} />
            <span className="text-[9px] font-bold">Home</span>
          </div>
          <div onClick={() => setActiveTab('team')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-1/5 ${activeTab === 'team' ? 'text-[#FDCB2C]' : 'text-gray-400'}`}>
            <Users size={20} />
            <span className="text-[9px] font-bold">Team</span>
          </div>
          <div onClick={() => setActiveTab('urenregistratie')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-1/5 ${activeTab === 'urenregistratie' ? 'text-[#FDCB2C]' : 'text-gray-400'}`}>
            <Clock size={20} />
            <span className="text-[9px] font-bold">Klokken</span>
          </div>
          <div onClick={() => setActiveTab('rooster')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-1/5 ${activeTab === 'rooster' ? 'text-[#FDCB2C]' : 'text-gray-400'}`}>
            <Calendar size={20} />
            <span className="text-[9px] font-bold">Rooster</span>
          </div>
          <div onClick={() => setActiveTab('meer')} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors w-1/5 ${activeTab === 'meer' ? 'text-[#FDCB2C]' : 'text-gray-400'}`}>
            <div className="flex gap-[2px]">
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
            </div>
            <span className="text-[9px] font-bold mt-1">Meer</span>
          </div>
        </div>

      </div>
    </>
  );
}

export function Shiftbase() {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 bg-gray-100 min-h-[100dvh] pt-8 pb-24 overflow-x-auto w-full">
      <div>
        <h3 className="text-center font-bold text-gray-500 mb-4">MOBIEL WEERGAVE</h3>
        <ShiftbaseApp isTablet={false} />
      </div>
      <div className="hidden md:block">
        <h3 className="text-center font-bold text-gray-500 mb-4">TABLET WEERGAVE (ZAAK)</h3>
        <ShiftbaseApp isTablet={true} />
      </div>
    </div>
  );
}
