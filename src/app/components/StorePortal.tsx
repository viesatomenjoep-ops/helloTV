import React, { useState } from 'react';
import { Store, Package, Users, Star, Box, MessageCircle, Truck } from 'lucide-react';

const STORES = [
  'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Bergen op Zoom', 'Breda',
  'Cruquius', 'Den Bosch', 'Doetinchem', 'Duiven', 'Eindhoven', 'Groningen',
  'Leeuwarden', 'Naarden', 'Nijmegen', 'Rotterdam', 'Tilburg', 'Zoeterwoude'
];

const MOCK_STAFF: Record<string, {name: string, role: string, photo: string}[]> = {
  'Amsterdam': [
    { name: 'Nick', role: 'Verkoper', photo: '/images/nick.png' },
    { name: 'Sanne', role: 'Verkoper', photo: '/images/sanne.png' },
    { name: 'Lorenzo', role: 'Verkoper', photo: '/images/lorenzo.png' },
    { name: 'Steve', role: 'Verkoper', photo: '/images/steve.png' },
  ],
  'Breda': [
    { name: 'Martijn Hendriks', role: 'Store Manager', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Sophie de Groot', role: 'Audio Specialist', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Daan Meijer', role: 'Verkoper', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  ],
  // Fallback for others
  'default': [
    { name: 'Maick Admin', role: 'Store Manager', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Lotte Veenstra', role: 'Verkoper', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' }
  ]
};

export function StorePortal() {
  const [selectedStore, setSelectedStore] = useState('Amsterdam');
  const [printingOrder, setPrintingOrder] = useState<any>(null);
  const currentStaff = MOCK_STAFF[selectedStore] || MOCK_STAFF['default'];

  const handleOpenPrintPreview = (orderInfo: any) => {
    setPrintingOrder(orderInfo);
  };

  const handleExecutePrint = () => {
    window.print();
  };

  const closePrintPreview = () => {
    setPrintingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3 text-gray-900">
              <Store size={40} className="text-[#FDCB2C]" />
              Mini-Filiaal Portal
            </h1>
            <p className="text-gray-500 font-medium">Lokaal management voor bestellingen, voorraad en targets</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">Huidig Filiaal:</span>
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

      <div className="max-w-7xl mx-auto px-8">
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
                  <button 
                    onClick={() => handleOpenPrintPreview({ id: `TR-100${item + 44}`, details: '1x Samsung 65" QD-OLED, 1x Beugel', items: [{qty: '1x', desc: 'Samsung 65" QD-OLED'}, {qty: '1x', desc: "Muurbeugel Vogel's (Thin)"}] })}
                    className="px-4 py-2 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-lg text-sm transition-colors print:hidden"
                  >
                    Paklijst Printen
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-400 text-center mt-2 italic">Data realtime gesynchroniseerd via de API-koppeling Transport Portaal.</p>
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

        {/* Personeel overzicht */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Users className="text-purple-600" /> Personeel & Medewerkers ({selectedStore})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentStaff.map((staff, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 text-center hover:shadow-md transition-shadow group">
                <div className="h-48 overflow-hidden relative">
                  <img src={staff.photo} alt={staff.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-bold text-gray-900">{staff.name}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{staff.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      {printingOrder && (
        <div className="fixed inset-0 bg-white z-[9999] p-12 text-black text-left overflow-auto">
          <div className="print:hidden flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <h2 className="font-bold text-gray-800">Paklijst Preview & Bewerken</h2>
              <p className="text-sm text-gray-500">Klik op de tekst hieronder om aan te passen voordat je print.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={closePrintPreview} className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg">Annuleren</button>
              <button onClick={handleExecutePrint} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2">
                Definitief Printen
              </button>
            </div>
          </div>

          <div className="flex justify-between items-start border-b-4 border-[#FDCB2C] pb-6 mb-8">
            <div>
              <img src="/HelloTV.png" alt="HelloTV Logo" className="h-16 mb-4 object-contain" />
              <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900" contentEditable suppressContentEditableWarning>Officiële Paklijst</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-500">Filiaal: <span contentEditable suppressContentEditableWarning>{selectedStore}</span></p>
              <p className="text-sm font-bold text-gray-500">Datum: <span contentEditable suppressContentEditableWarning>{new Date().toLocaleDateString('nl-NL')}</span></p>
              <p className="text-xl font-black mt-2" contentEditable suppressContentEditableWarning>{printingOrder.id}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-bold bg-gray-100 px-4 py-2 uppercase tracking-widest mb-4">Verzendgegevens</h2>
            <div className="px-4 text-sm font-medium space-y-1" contentEditable suppressContentEditableWarning>
              <p>HelloTV Logistiek Centrum</p>
              <p>Transport via Hessey Logistics</p>
              <p>Bestemming: Magazijn {selectedStore}</p>
            </div>
          </div>

          <table className="w-full text-left mb-12">
            <thead className="bg-gray-100 border-y-2 border-gray-900">
              <tr>
                <th className="py-3 px-4 font-bold uppercase text-sm">Aantal</th>
                <th className="py-3 px-4 font-bold uppercase text-sm">Omschrijving</th>
                <th className="py-3 px-4 font-bold uppercase text-sm text-right">Controle</th>
              </tr>
            </thead>
            <tbody>
              {printingOrder.items?.map((item: any, i: number) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4 px-4 font-black text-lg outline-none focus:bg-yellow-50" contentEditable suppressContentEditableWarning>{item.qty}</td>
                  <td className="py-4 px-4 font-bold outline-none focus:bg-yellow-50" contentEditable suppressContentEditableWarning>{item.desc}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="inline-block w-6 h-6 border-2 border-gray-900 rounded-sm"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-24 flex justify-between border-t-2 border-gray-200 pt-8">
            <div className="text-center w-64">
              <div className="border-b-2 border-gray-400 h-12 mb-2"></div>
              <p className="text-sm font-bold text-gray-500">Handtekening Chauffeur (Hessey)</p>
            </div>
            <div className="text-center w-64">
              <div className="border-b-2 border-gray-400 h-12 mb-2"></div>
              <p className="text-sm font-bold text-gray-500">Handtekening Filiaal ({selectedStore})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
