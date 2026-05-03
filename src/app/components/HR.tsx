import React, { useState } from 'react';
import { MapPin, Send, CheckCircle, Car, AlertCircle } from 'lucide-react';

export function HR() {
  const [formData, setFormData] = useState({
    medewerker_naam: 'Beheerder',
    postcode: '',
    huisnummer: '',
    plaats: '',
    iban: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mockDistance, setMockDistance] = useState<number | null>(null);

  const calculateDistance = () => {
    // Simuleer een Google Maps API call
    if (formData.postcode && formData.plaats) {
      const dist = Math.floor(Math.random() * 40) + 5; // Random tussen 5 en 45 km
      setMockDistance(dist);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission and email sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({ ...formData, postcode: '', huisnummer: '', plaats: '', iban: '' });
        setMockDistance(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">HR & Reiskosten</h1>
          <p className="text-gray-600">Registreer je vaste reiskosten (woon-werk) eenmalig op basis van Google Maps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Car className="text-blue-500" />
              Reiskosten Registratie
            </h2>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">Registratie Voltooid!</h3>
                <p className="text-sm">Je reiskosten zijn succesvol geregistreerd. Er is een bevestiging verstuurd naar administratie@hellotv.nl.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Medewerker</label>
                  <input
                    type="text"
                    disabled
                    value={formData.medewerker_naam}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                  />
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
                  disabled={isSubmitting || !mockDistance}
                  className="w-full py-3 mt-4 bg-gray-900 text-white font-bold rounded-lg flex justify-center items-center gap-2 hover:bg-[#FDCB2C] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Gegevens verwerken...'
                  ) : (
                    <>
                      <Send size={18} />
                      Registreer bij Administratie
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side Info Panel */}
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-blue-500" />
                Spelregels Declaraties
              </h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Registratie is eenmalig per vast filiaal.</li>
                <li>De kortste route wordt automatisch geselecteerd.</li>
                <li>Bij meerdere ritten op één dag vult de planner dit aan.</li>
                <li>Uitbetaling geschiedt maandelijks via de salarisronde.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
