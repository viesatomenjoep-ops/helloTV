import React, { useState } from 'react';
import { MapPin, Send, CheckCircle, Car, FileText, Lock, Download, Mail, RefreshCw, Users, Database, Zap, AlertTriangle } from 'lucide-react';

import { EMPLOYEES, getMedewerkerByCode } from '../../utils/employees';

export function HR() {
  const [activeTab, setActiveTab] = useState<'reiskosten' | 'loonstroken_personeel' | 'beheer' | 'contracten' | 'ziek_melden'>('reiskosten');

  // Reiskosten State
  const [medewerkerCode, setMedewerkerCode] = useState('');
  const [formData, setFormData] = useState({
    postcode: '',
    huisnummer: '',
    plaats: '',
    iban: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mockDistance, setMockDistance] = useState<number | null>(null);

  // Loonstroken Personeel Portal State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ medewerkerId: '', password: '' });
  const [printingLoonstrook, setPrintingLoonstrook] = useState<any>(null);

  // Admin Paneel State
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const calculateDistance = () => {
    if (formData.postcode && formData.huisnummer) {
      setMockDistance(Math.floor(Math.random() * 40) + 5);
    }
  };

  const handleReiskostenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const naam = getMedewerkerByCode(medewerkerCode);
    if (!naam) {
      alert("Ongeldige medewerkerscode");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ postcode: '', huisnummer: '', plaats: '', iban: '' });
        setMedewerkerCode('');
        setMockDistance(null);
      }, 5000);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const naam = getMedewerkerByCode(loginData.medewerkerId);
    if (!naam) {
      alert("Ongeldige code");
      return;
    }
    // Simulate login success
    setIsLoggedIn(true);
  };

  const handleGenerateCredentials = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR & Administratie Portaal</h1>
          <p className="text-gray-600">Reiskosten, loonstroken en beheer inloggegevens personeel.</p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('reiskosten')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'reiskosten' ? 'bg-[#1D6F42] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            Reiskosten
          </button>
          <button
            onClick={() => setActiveTab('loonstroken_personeel')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors whitespace-nowrap ${
              activeTab === 'loonstroken_personeel' ? 'bg-[#FDCB2C] text-black' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            Mijn Loonstroken (Personeel)
          </button>
          <button
            onClick={() => setActiveTab('beheer')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'beheer' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Lock size={16} /> Administratie Beheer
          </button>
          <button
            onClick={() => setActiveTab('contracten')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'contracten' ? 'bg-[#1D6F42] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <FileText size={16} /> MijnKvK & Contracten
          </button>
          <button
            onClick={() => setActiveTab('ziek_melden')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'ziek_melden' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <AlertTriangle size={16} /> Ziek Melden
          </button>
        </div>

        {/* Tab 1: Reiskosten */}
        {activeTab === 'reiskosten' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Car className="text-blue-500" />
                Reiskosten Registratie
              </h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                  <CheckCircle size={48} className="text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Registratie Voltooid!</h3>
                  <p className="text-sm">Je reiskosten zijn succesvol geregistreerd. Er is een bevestiging verstuurd naar maick@hellotv.nl.</p>
                </div>
              ) : (
                <form onSubmit={handleReiskostenSubmit} className="space-y-5">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Medewerkerscode (bijv. 921)</label>
                    <input
                      type="text"
                      placeholder="Voer je 3-cijferige code in..."
                      value={medewerkerCode}
                      onChange={(e) => setMedewerkerCode(e.target.value)}
                      maxLength={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold"
                    />
                    {getMedewerkerByCode(medewerkerCode) && (
                      <p className="text-sm font-bold text-green-600 mt-2">
                        Gevonden: {getMedewerkerByCode(medewerkerCode)}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Postcode</label>
                      <input
                        type="text"
                        required
                        placeholder="1234AB"
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        onBlur={calculateDistance}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Huisnr</label>
                      <input
                        type="text"
                        required
                        placeholder="12A"
                        value={formData.huisnummer}
                        onChange={(e) => setFormData({ ...formData, huisnummer: e.target.value })}
                        onBlur={calculateDistance}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Woonplaats</label>
                    <input
                      type="text"
                      required
                      placeholder="Bijv. Amsterdam"
                      value={formData.plaats}
                      onChange={(e) => setFormData({ ...formData, plaats: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">IBAN Rekeningnummer (Uitbetaling)</label>
                    <input
                      type="text"
                      required
                      placeholder="NL99 BANK 0123 4567 89"
                      value={formData.iban}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !mockDistance || !medewerkerCode}
                    className="w-full py-3 mt-4 bg-gray-900 text-white font-bold rounded-lg flex justify-center items-center gap-2 hover:bg-[#FDCB2C] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Gegevens verwerken...'
                    ) : (
                      <>
                        <Send size={18} />
                        Registreer bij Maick (Administratie)
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#FDCB2C] to-yellow-400 rounded-2xl shadow-sm p-8 text-black relative overflow-hidden">
                <MapPin size={120} className="absolute -right-6 -bottom-6 opacity-10" />
                <h2 className="text-xl font-bold mb-4 relative z-10">Google Maps Calculatie</h2>
                
                {mockDistance ? (
                  <div className="space-y-4 relative z-10">
                    <div className="bg-white/90 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Enkele reis (kortste route)</p>
                      <p className="text-3xl font-black">{mockDistance} km</p>
                    </div>
                    <div className="bg-white/90 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Vergoeding per dag (retour x €0,19)</p>
                      <p className="text-3xl font-black text-[#1D6F42]">
                        € {((mockDistance * 2) * 0.19).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/50 rounded-xl p-6 text-center border border-white/40 relative z-10">
                    <MapPin size={32} className="mx-auto text-yellow-800 mb-2 opacity-50" />
                    <p className="text-yellow-900 font-medium">Vul postcode en huisnummer in om de afstand tot de vestiging automatisch te berekenen.</p>
                  </div>
                )}
              </div>

              {/* Automated HelloBase Sync */}
              <div className="bg-gray-900 rounded-2xl shadow-sm p-8 text-white relative overflow-hidden mt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <RefreshCw className="text-[#FDCB2C]" /> HelloBase Auto-Sync
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Automatische reiskostenberekening o.b.v. filiaalrooster</p>
                  </div>
                  <span className="bg-[#FDCB2C] text-black text-xs font-black px-2 py-1 rounded">EINDE MAAND RUN</span>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  Het systeem berekent automatisch de reisafstand (huisadres ➔ filiaal ➔ huisadres) voor alle gewerkte dagen en genereert de uitbetalingslijst.
                </p>
                <button
                  onClick={() => {
                    const subject = encodeURIComponent("Jouw Reiskostenvergoeding - HelloTV");
                    const body = encodeURIComponent(
                      "Hoi Tom,\n\n" +
                      "Hierbij het overzicht van jouw reiskosten voor de afgelopen maand o.b.v. je rooster in Amsterdam:\n\n" +
                      "- Gewerkte dagen: 21\n" +
                      "- Afstand (retour): 42 km per dag\n" +
                      "- Vergoeding per km: € 0,19\n" +
                      "---------------------------------------\n" +
                      "Totaal uit te betalen: € 167,58\n\n" +
                      "Dit bedrag wordt samen met je salaris uitbetaald.\n\n" +
                      "Groeten,\nHR HelloTV"
                    );
                    window.location.href = `mailto:tomvanbienen@gmail.com?subject=${subject}&body=${body}`;
                  }}
                  className="w-full py-3 bg-[#FDCB2C] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  <Mail size={18} /> Test Automatische Mail (tomvanbienen@gmail.com)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Loonstroken Personeel Portaal */}
        {activeTab === 'loonstroken_personeel' && (
          <div className="max-w-md mx-auto">
            {!isLoggedIn ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#FDCB2C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-[#FDCB2C]" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Medewerker Login</h2>
                  <p className="text-gray-500 mt-2">Log in om je loonstroken en jaaropgaves in te zien.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Medewerkerscode</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Users className="text-gray-400" size={18} />
                      </div>
                      <input 
                        type="text" 
                        required
                        maxLength={4}
                        placeholder="bijv. 921"
                        value={loginData.medewerkerId}
                        onChange={(e) => setLoginData({...loginData, medewerkerId: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold text-gray-800 tracking-wider"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Wachtwoord</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
                  >
                    Inloggen
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full md:w-[600px] -ml-0 md:-ml-[80px]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Mijn Loonstroken <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">({getMedewerkerByCode(loginData.medewerkerId)})</span>
                  </h2>
                  <button onClick={() => setIsLoggedIn(false)} className="text-sm text-gray-500 hover:text-black">Uitloggen</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { month: 'Maart 2026', amount: '€ 2.450,12', id: 'LS-2026-03' },
                    { month: 'Februari 2026', amount: '€ 2.650,00', id: 'LS-2026-02' },
                    { month: 'Januari 2026', amount: '€ 2.450,12', id: 'LS-2026-01' }
                  ].map((strook) => (
                    <div key={strook.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{strook.month}</p>
                          <p className="text-xs text-gray-500">ID: {strook.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-green-600 font-bold">{strook.amount}</span>
                        <button 
                          onClick={() => {
                            setPrintingLoonstrook(strook);
                            setTimeout(() => {
                              window.print();
                              setTimeout(() => setPrintingLoonstrook(null), 100);
                            }, 100);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors print:hidden" 
                          title="Download PDF"
                        >
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Admin Beheer */}
        {activeTab === 'beheer' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Administratie Beheer paneel</h2>
            <p className="text-gray-500 mb-8">Genereer unieke medewerkerscodes (ID's) en wachtwoorden voor de 250+ medewerkers en distribueer deze via geautomatiseerde mails.</p>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Users size={20} className="text-blue-600"/> 
                    Medewerker Onboarding Sync
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Deze actie genereert voor 250 medewerkers een unieke code en een tijdelijk wachtwoord. Het genereert een CSV-export voor de administratie (Maick) en triggert een automatische welkomstmail naar het personeel.
                  </p>
                  
                  {exportSuccess ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 p-3 rounded-lg border border-green-200">
                      <CheckCircle size={20} />
                      <span>250 Inloggegevens gegenereerd, Excel geëxporteerd & mails verzonden!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateCredentials}
                      disabled={isExporting}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors disabled:opacity-70"
                    >
                      {isExporting ? (
                        <><RefreshCw size={18} className="animate-spin" /> Gegevens genereren...</>
                      ) : (
                        <><Mail size={18} /> Exporteer Inloggegevens (250 Medewerkers)</>
                      )}
                    </button>
                  )}
                </div>
                <div className="w-full md:w-64 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Voorbeeld Export (.csv)</p>
                  <div className="text-xs font-mono text-gray-600 space-y-1">
                    <p>Naam, ID, Code, Wachtwoord</p>
                    <p>T. van Bienen, HTV-1, 921, X9k2Lp</p>
                    <p>J. Morsink, HTV-2, 811, P2m9Xq</p>
                    <p>M. Jansen, HTV-3, 711, A7b4Yz</p>
                    <p>...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Innovative HR Functions */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="text-indigo-600" />
                Geavanceerde HR AI & Database Portalen
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 border border-indigo-100 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap size={24} className="text-indigo-600 group-hover:text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-indigo-900 mb-2">Live Rooster Matchmaker</h4>
                  <p className="text-sm text-indigo-800/80 mb-4">
                    Koppelt live weersverwachtingen aan historische verkoopdata per filiaal om automatisch het personeelsrooster van Hello Base realtime te optimaliseren.
                  </p>
                  <button className="text-xs font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:text-indigo-800">
                    Run AI Query <RefreshCw size={12} />
                  </button>
                </div>

                <div className="bg-red-50 border border-red-200 p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 border border-red-100 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <AlertTriangle size={24} className="text-red-600 group-hover:text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-red-900 mb-2">Fraude & Tijdregistratie</h4>
                  <p className="text-sm text-red-800/80 mb-4">
                    Voert een zware controle uit over 2.5 miljoen pin-transacties en inklok-logs om afwijkingen (zoals ghost-klokken) op te sporen in het HR-systeem.
                  </p>
                  <button className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-1 group-hover:text-red-800">
                    Start Database Scan <RefreshCw size={12} />
                  </button>
                </div>

                <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 border border-green-100 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Database size={24} className="text-green-600 group-hover:text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-green-900 mb-2">Bonus & Promotie Engine</h4>
                  <p className="text-sm text-green-800/80 mb-4">
                    Real-time database trigger die CRM-verkoopmarges direct kruist met HR-loonschalen. Berekent volautomatisch wie er deze maand promotie maakt of bonus ontvangt.
                  </p>
                  <button className="text-xs font-black text-green-600 uppercase tracking-wider flex items-center gap-1 group-hover:text-green-800">
                    Update HR Tables <RefreshCw size={12} />
                  </button>
                </div>

              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-blue-600" />
                Medewerker Database ({EMPLOYEES.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EMPLOYEES.map((medewerker) => (
                  <div key={medewerker.code} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">{medewerker.name}</p>
                      <p className="text-xs text-gray-500">Code: {medewerker.code} • {medewerker.isSeller ? 'Verkoper' : 'Anders'}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedEmployee(medewerker)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Beheer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Employee Modal */}
            {selectedEmployee && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
                  <button 
                    onClick={() => setSelectedEmployee(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                  >
                    Sluiten
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="text-blue-600" />
                    Medewerker Bewerken
                  </h3>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Gegevens van ${selectedEmployee.name} succesvol opgeslagen in de database.`);
                    setSelectedEmployee(null);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Voornaam</label>
                        <input type="text" defaultValue={selectedEmployee.name.split(' ')[0]} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Achternaam</label>
                        <input type="text" defaultValue={selectedEmployee.name.split(' ').slice(1).join(' ')} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Volledig Adres (Straat, Huisnr, Postcode, Plaats)</label>
                      <input type="text" placeholder="Bijv. Kalverstraat 1, 1012NX Amsterdam" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Burgerservicenummer (BSN)</label>
                        <input type="text" placeholder="123456789" maxLength={9} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Interne Positie / Rol</label>
                        <select required defaultValue={selectedEmployee.isSeller ? 'spits' : 'verdediger'} className="w-full px-3 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold text-gray-700">
                          <option value="spits">Spits (Topverkoper)</option>
                          <option value="aanvaller">Aanvaller (Verkoper)</option>
                          <option value="middenvelder">Middenvelder (Service & Support)</option>
                          <option value="verdediger">Verdediger (Magazijn & Logistiek)</option>
                          <option value="trainer">Coach / Trainer</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">Upload ID / Paspoort (PDF of Image)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                        <FileText size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500 font-bold">Klik om bestand te kiezen of sleep hierheen</p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t mt-6">
                      <button type="button" onClick={() => setSelectedEmployee(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-black">Annuleren</button>
                      <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                        Opslaan in Database
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}        {/* Tab 4: MijnKvK & Contracten */}
        {activeTab === 'contracten' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">MijnKvK: Contracten & Onderhandelingen</h2>
            <p className="text-gray-500 mb-8">Upload documenten, stel contracten op, en beheer salarisonderhandelingen en afspraken.</p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Aanvraag succesvol verwerkt. Een 2-weken reminder is automatisch ingesteld in de agenda van de HR Manager!');
              }} 
              className="space-y-6 max-w-2xl"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type Document / Aanvraag (Kies uit 5 opties)</label>
                <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold">
                  <option value="">Selecteer een type...</option>
                  <option value="upload">Bestaand Contract Uploaden</option>
                  <option value="nieuw">Nieuw Contract Opstellen</option>
                  <option value="salaris">Salarisonderhandeling Starten</option>
                  <option value="afspraken">Vaste Afspraken & Bonussen Vastleggen</option>
                  <option value="beoordeling">Jaarlijkse Beoordeling & Promotie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Medewerker</label>
                <input 
                  type="text" 
                  placeholder="Naam van medewerker (bijv. Tom van Bienen)" 
                  required 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Details & Opmerkingen</label>
                <textarea 
                  rows={4}
                  placeholder="Typ hier de inhoud van de onderhandeling of contractdetails..." 
                  required 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] outline-none resize-none"
                ></textarea>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle size={24} className="text-orange-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-orange-900">Automatische 2-weken Reminder</p>
                  <p className="text-sm text-orange-800/80">
                    Als je deze aanvraag indient, krijgt de manager direct een melding. Er wordt automatisch een ping gestuurd met: 
                    <br/><br/>
                    <span className="italic">"Oké Tom, [Medewerker] heeft een aanvraag gedaan. Je moet uiterlijk over 2 weken een formele reactie geven of een gesprek inplannen."</span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1D6F42] text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-green-800 transition-all shadow-md"
              >
                <FileText size={20} /> Formulier Indienen & Reminder Instellen
              </button>
            </form>
          </div>
        )}
        {/* Tab 5: Ziek Melden */}
        {activeTab === 'ziek_melden' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Ziek Melden</h2>
              <p className="text-gray-500 mt-2">Meld je direct ziek. Je manager en filiaal worden direct op de hoogte gesteld.</p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Je ziekmelding is geregistreerd. Beterschap! Je manager zal indien nodig contact opnemen.');
                setActiveTab('reiskosten');
              }} 
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Jouw Medewerkerscode</label>
                <input 
                  type="text" 
                  maxLength={4}
                  placeholder="Bijv. 921" 
                  required 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Filiaal</label>
                <select required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none">
                  <option value="">Selecteer je filiaal...</option>
                  <option value="amsterdam">Amsterdam</option>
                  <option value="breda">Breda</option>
                  <option value="eindhoven">Eindhoven</option>
                  <option value="hoofdkantoor">Hoofdkantoor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Datum ingang</label>
                <input 
                  type="date" 
                  required 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Korte toelichting (Optioneel)</label>
                <textarea 
                  rows={3}
                  placeholder="Bijv. Griep, buikpijn, etc." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-red-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-red-700 transition-all shadow-md"
              >
                Ziekmelding Definitief Maken
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Print Only Layout (Real PDF Loonstrook) */}
      {printingLoonstrook && (
        <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-12 text-black text-left text-sm font-mono">
          <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
            <div>
              <img src="/HelloTV.png" alt="HelloTV Logo" className="h-12 mb-4 filter brightness-0" />
              <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">Salarisspecificatie</h1>
              <p className="text-gray-600">Periode: {printingLoonstrook.month}</p>
              <p className="text-gray-600">Referentie: {printingLoonstrook.id}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Werkgever:</p>
              <p>HelloTV B.V.</p>
              <p>Kalverstraat 1</p>
              <p>1012 NX Amsterdam</p>
              <p>KvK: 12345678</p>
            </div>
          </div>

          <div className="mb-8 p-4 border border-gray-300 bg-gray-50 flex justify-between">
            <div>
              <p className="font-bold text-gray-900">Werknemer:</p>
              <p>{getMedewerkerByCode(loginData.medewerkerId) || 'Onbekend'}</p>
              <p>Personeelsnummer: {loginData.medewerkerId}</p>
              <p>Functie: Verkoper / Specialist</p>
            </div>
            <div className="text-right">
              <p><span className="text-gray-500">BSN:</span> 123456789</p>
              <p><span className="text-gray-500">Geboortedatum:</span> 01-01-1990</p>
              <p><span className="text-gray-500">Datum in dienst:</span> 01-09-2022</p>
            </div>
          </div>

          <table className="w-full text-left mb-8 border-collapse">
            <thead className="bg-gray-100 border-y border-black">
              <tr>
                <th className="py-2 px-2 font-bold">Omschrijving</th>
                <th className="py-2 px-2 font-bold text-right">Aantal/Uren</th>
                <th className="py-2 px-2 font-bold text-right">Tarief</th>
                <th className="py-2 px-2 font-bold text-right">Bedrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2">Basis Salaris (Fulltime)</td>
                <td className="py-2 px-2 text-right">160,00</td>
                <td className="py-2 px-2 text-right">14,25</td>
                <td className="py-2 px-2 text-right">2.280,00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2">Overuren (150%)</td>
                <td className="py-2 px-2 text-right">6,50</td>
                <td className="py-2 px-2 text-right">21,38</td>
                <td className="py-2 px-2 text-right">138,97</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2">Zondag Toeslag (200%)</td>
                <td className="py-2 px-2 text-right">8,00</td>
                <td className="py-2 px-2 text-right">14,25</td>
                <td className="py-2 px-2 text-right">114,00</td>
              </tr>
              <tr className="border-b border-gray-100 text-green-700 font-bold bg-green-50/50">
                <td className="py-2 px-2">Performance Bonus (Marge Target)</td>
                <td className="py-2 px-2 text-right">-</td>
                <td className="py-2 px-2 text-right">-</td>
                <td className="py-2 px-2 text-right">450,00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2">Vakantiegeld (Opbouw)</td>
                <td className="py-2 px-2 text-right">-</td>
                <td className="py-2 px-2 text-right">8%</td>
                <td className="py-2 px-2 text-right">182,40</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2">Reiskostenvergoeding (Onbelast)</td>
                <td className="py-2 px-2 text-right">21 dgn</td>
                <td className="py-2 px-2 text-right">€ 0,23/km</td>
                <td className="py-2 px-2 text-right">167,58</td>
              </tr>
              <tr className="border-b border-gray-400">
                <td className="py-2 px-2 font-bold" colSpan={3}>Bruto Loon</td>
                <td className="py-2 px-2 font-bold text-right">3.150,55</td>
              </tr>
              <tr className="border-b border-gray-100 text-red-700">
                <td className="py-2 px-2">Loonheffing</td>
                <td className="py-2 px-2 text-right" colSpan={2}>-</td>
                <td className="py-2 px-2 text-right">- 650,43</td>
              </tr>
              <tr className="border-b border-gray-100 text-red-700">
                <td className="py-2 px-2">Pensioenpremie (Werknemer)</td>
                <td className="py-2 px-2 text-right" colSpan={2}>-</td>
                <td className="py-2 px-2 text-right">- 50,00</td>
              </tr>
              <tr className="border-t-2 border-black bg-gray-100">
                <td className="py-3 px-2 font-black text-lg" colSpan={3}>Netto Uit te Betalen</td>
                <td className="py-3 px-2 font-black text-lg text-right">{printingLoonstrook.amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex gap-16 mt-8">
            <div className="w-1/2">
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">Vakantie Dagen (Uren)</h3>
              <div className="flex justify-between text-gray-700"><span>Saldo Vorig Jaar:</span> <span>16,00</span></div>
              <div className="flex justify-between text-gray-700"><span>Opgebouwd dit Jaar:</span> <span>40,00</span></div>
              <div className="flex justify-between text-gray-700"><span>Opgenomen:</span> <span>- 8,00</span></div>
              <div className="flex justify-between font-bold mt-1 pt-1 border-t border-gray-200"><span>Actueel Saldo:</span> <span>48,00</span></div>
            </div>
            <div className="w-1/2">
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">Betalingsgegevens</h3>
              <div className="flex justify-between text-gray-700"><span>IBAN:</span> <span>NL99 BANK 0123 4567 89</span></div>
              <div className="flex justify-between text-gray-700"><span>Betaaldatum:</span> <span>24 {printingLoonstrook.month.split(' ')[0]} 2026</span></div>
            </div>
          </div>
          
          <div className="mt-16 text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
            <p>Dit is een digitaal gegenereerd document en is geldig zonder handtekening.</p>
            <p>HelloTV Management System (Powered by Viesa)</p>
          </div>
        </div>
      )}
    </div>
  );
}
