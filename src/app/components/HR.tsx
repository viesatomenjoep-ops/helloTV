import React, { useState } from 'react';
import { MapPin, Send, CheckCircle, Car, AlertCircle, FileText, Lock, Download, Mail, RefreshCw } from 'lucide-react';

const EMPLOYEES = [
  "Tom van Bienen",
  "Joep Morsink",
  "Thijs Meijer",
  "Maick",
  "Wendy",
  "Johan",
  "Sophie de Vries",
  "Daan Bakker",
  "Julia Jansen",
  "Lars Visser"
];

export function HR() {
  const [activeTab, setActiveTab] = useState<'reiskosten' | 'loonstroken_personeel' | 'beheer'>('reiskosten');

  // Reiskosten State
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    medewerker_naam: '',
    postcode: '',
    huisnummer: '',
    plaats: '',
    iban: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mockDistance, setMockDistance] = useState<number | null>(null);

  // Loonstroken Personeel State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Beheer State
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const filteredEmployees = EMPLOYEES.filter(emp => 
    emp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDistance = () => {
    if (formData.postcode && formData.plaats) {
      const dist = Math.floor(Math.random() * 40) + 5; 
      setMockDistance(dist);
    }
  };

  const handleReiskostenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ ...formData, postcode: '', huisnummer: '', plaats: '', iban: '' });
        setMockDistance(null);
      }, 3000);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId && loginPassword) {
      setIsLoggedIn(true);
    }
  };

  const handleExportCredentials = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Create mock CSV
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Medewerker,Uniek ID,Tijdelijk Wachtwoord\n";
      EMPLOYEES.forEach((emp, idx) => {
        csvContent += `"${emp}","HTV-${1000 + idx}","Welkom2026!"\n`;
      });
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `HelloTV_Inloggegevens_Personeel.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR & Administratie</h1>
          <p className="text-gray-600">Beheer reiskosten, loonstroken en inlogportalen voor medewerkers.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('reiskosten')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors ${
              activeTab === 'reiskosten' ? 'bg-[#FDCB2C] text-black' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            Reiskosten
          </button>
          <button
            onClick={() => setActiveTab('loonstroken_personeel')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors ${
              activeTab === 'loonstroken_personeel' ? 'bg-[#FDCB2C] text-black' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            Mijn Loonstroken (Personeel)
          </button>
          <button
            onClick={() => setActiveTab('beheer')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Medewerker Zoeken</label>
                    <input
                      type="text"
                      placeholder="Typ een naam..."
                      value={formData.medewerker_naam || searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setFormData({ ...formData, medewerker_naam: '' });
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none transition-all"
                    />
                    {showDropdown && !formData.medewerker_naam && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 shadow-xl rounded-xl z-50 max-h-48 overflow-y-auto">
                        {filteredEmployees.length > 0 ? (
                          filteredEmployees.map(emp => (
                            <button
                              key={emp}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, medewerker_naam: emp });
                                setSearchTerm(emp);
                                setShowDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 outline-none text-gray-700 transition-colors"
                            >
                              {emp}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500 text-center">Niet gevonden in database.</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Postcode</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 AB"
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        onBlur={calculateDistance}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Huisnummer</label>
                      <input
                        type="text"
                        required
                        placeholder="10"
                        value={formData.huisnummer}
                        onChange={(e) => setFormData({ ...formData, huisnummer: e.target.value })}
                        onBlur={calculateDistance}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Woonplaats</label>
                    <input
                      type="text"
                      required
                      placeholder="Amsterdam"
                      value={formData.plaats}
                      onChange={(e) => setFormData({ ...formData, plaats: e.target.value })}
                      onBlur={calculateDistance}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">IBAN Rekeningnummer</label>
                    <input
                      type="text"
                      required
                      placeholder="NL00 BANK 0123 4567 89"
                      value={formData.iban}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none transition-all font-mono text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !mockDistance || !formData.medewerker_naam}
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
                      <p className="text-sm font-semibold text-gray-600 mb-1">Vergoeding per dag (€0,19/km)</p>
                      <p className="text-3xl font-black text-green-600">€{((mockDistance * 2) * 0.19).toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/5 rounded-xl p-6 text-center border border-black/10 relative z-10">
                    <p className="font-medium">Vul je adres in om de exacte reisafstand via Google Maps te berekenen.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Loonstroken Portaal */}
        {activeTab === 'loonstroken_personeel' && (
          <div className="max-w-xl mx-auto">
            {!isLoggedIn ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Personeelsportaal</h2>
                  <p className="text-gray-500 mt-2">Log in met je unieke HelloTV ID om je loonstroken te bekijken.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Uniek Medewerker ID</label>
                    <input
                      type="text"
                      required
                      placeholder="Bijv. HTV-1024"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Wachtwoord</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mijn Loonstroken</h2>
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
                        <p className="font-bold text-green-600">{strook.amount}</p>
                        <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-[#FDCB2C] hover:text-black hover:border-[#FDCB2C] transition-all">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Beheer (Admin) */}
        {activeTab === 'beheer' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Administratie & Onboarding</h2>
              <p className="text-gray-500 mb-8">Genereer unieke inloggegevens voor alle medewerkers zodat zij toegang krijgen tot het loonstroken portaal.</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 flex gap-4">
                <AlertCircle className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-1">Hoe dit werkt:</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Door op de knop hieronder te klikken, genereert het systeem automatisch 250 unieke ID's en tijdelijke wachtwoorden. 
                    Daarna wordt er direct een welkomstmail gestuurd naar elke medewerker, en downloadt er een Excel-bestand met het master-overzicht voor de administratie.
                  </p>
                </div>
              </div>

              <button
                onClick={handleExportCredentials}
                disabled={isExporting}
                className={`w-full py-4 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${
                  exportSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-900 text-white hover:bg-[#FDCB2C] hover:text-black'
                }`}
              >
                {exportSuccess ? (
                  <><CheckCircle size={24} /> Excel Gedownload & Mails Verzonden!</>
                ) : isExporting ? (
                  <><RefreshCw size={24} className="animate-spin" /> Gegevens genereren...</>
                ) : (
                  <><Mail size={24} /> Exporteer Inloggegevens (250 Medewerkers)</>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
