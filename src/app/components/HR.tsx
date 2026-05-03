import React, { useState } from 'react';
import { MapPin, Send, CheckCircle, Car, FileText, Lock, Download, Mail, RefreshCw, Users, Database, Zap, AlertTriangle } from 'lucide-react';

import { EMPLOYEES, getMedewerkerByCode } from '../../utils/employees';

export function HR() {
  const [activeTab, setActiveTab] = useState<'reiskosten' | 'loonstroken_personeel' | 'beheer'>('reiskosten');

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

  // Admin Paneel State
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

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
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download PDF">
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
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800">
                      Beheer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
