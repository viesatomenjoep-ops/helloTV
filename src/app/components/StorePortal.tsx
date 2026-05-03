import React, { useState } from 'react';
import { Store, Package, Users, Star, Box, MessageCircle, Truck } from 'lucide-react';

const STORES = [
  'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Bergen op Zoom', 'Breda',
  'Cruquius', 'Den Bosch', 'Doetinchem', 'Duiven', 'Eindhoven', 'Groningen',
  'Leeuwarden', 'Naarden', 'Nijmegen', 'Rotterdam', 'Tilburg', 'Zoeterwoude'
];

export function StorePortal() {
  const [selectedStore, setSelectedStore] = useState('Amsterdam');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-[#1D6F42] text-white p-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Store size={36} className="text-[#FDCB2C]" />
              Filiaal Mini-Portaal
            </h1>
            <p className="text-green-100 font-medium">Lokaal management voor bestellingen, voorraad en targets</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Huidig Filiaal:</span>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold"
            >
              {STORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Package size={24} />
              </div>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">RESERVERINGEN</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">12</h3>
            <p className="text-gray-500 font-medium mt-1">Openstaande orders (Transport)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <Box size={24} />
              </div>
              <span className="text-xs font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded">VOORRAAD</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">3</h3>
            <p className="text-gray-500 font-medium mt-1">Lage voorraad (ODM/Geel)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Star size={24} />
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">SCORE</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">4.8</h3>
            <p className="text-gray-500 font-medium mt-1">Gemiddelde Review Rating</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded">TEAM</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">8</h3>
            <p className="text-gray-500 font-medium mt-1">Actieve Medewerkers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Truck className="text-[#1D6F42]" /> Transport Reserveringen (Hessey)
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border border-gray-200 rounded-xl flex justify-between items-center bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-900">Order TR-100{item + 44}</p>
                    <p className="text-sm text-gray-500">1x Samsung 65" QD-OLED, 1x Beugel</p>
                  </div>
                  <button className="px-4 py-2 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-lg text-sm transition-colors">
                    Paklijst Printen
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-400 text-center mt-2 italic">Data realtime gesynchroniseerd via SQL-koppeling Transport Portaal.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <MessageCircle className="text-blue-500" /> Lokale Klant Vragen & Updates
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <p className="font-bold text-orange-800 mb-1">Reparatie status check: Klant Jansen</p>
                <p className="text-sm text-orange-700">Wacht op onderdeel, stuur bericht via WhatsApp portaal.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="font-bold text-blue-800 mb-1">Afhaalverzoek: Klant de Vries</p>
                <p className="text-sm text-blue-700">Wil bestelling TR-10042 ophalen in de winkel i.p.v. bezorgen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
