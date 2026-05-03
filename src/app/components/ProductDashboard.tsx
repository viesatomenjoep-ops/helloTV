import React, { useState } from 'react';
import { Tv, TrendingUp, AlertTriangle, ArrowRightCircle, CreditCard, Link as LinkIcon, ShoppingCart, RefreshCw, CheckCircle } from 'lucide-react';

// Gesimuleerde data van Samsung, LG, TCL, Sony, Philips (2024-2026)
const MOCK_PRODUCTS = [
  { id: 'OLED65G6', merk: 'LG', model: 'OLED65G66LA (2026)', categorie: 'OLED', prijs: 2499, inkoop: 1624, marge: 35, voorraad: 14 },
  { id: 'OLED55C5', merk: 'LG', model: 'OLED55C54LA (2025)', categorie: 'OLED', prijs: 1399, inkoop: 1161, marge: 17, voorraad: 42 },
  { id: 'OLED55C4', merk: 'LG', model: 'OLED55C44LA (2024)', categorie: 'OLED', prijs: 1099, inkoop: 989, marge: 10, voorraad: 8 },
  { id: 'QE65S95D', merk: 'Samsung', model: 'QE65S95D (2026)', categorie: 'QD-OLED', prijs: 2799, inkoop: 1819, marge: 35, voorraad: 21 },
  { id: 'QE55S90C', merk: 'Samsung', model: 'QE55S90C (2024)', categorie: 'QD-OLED', prijs: 1199, inkoop: 1055, marge: 12, voorraad: 3 },
  { id: 'XR65A95L', merk: 'Sony', model: 'XR-65A95L (2025)', categorie: 'QD-OLED', prijs: 3499, inkoop: 2624, marge: 25, voorraad: 5 },
  { id: '55PUS8809', merk: 'Philips', model: '55PUS8809 (2024)', categorie: 'LED', prijs: 699, inkoop: 601, marge: 14, voorraad: 15 },
  { id: '65PUS8900', merk: 'Philips', model: '65PUS8900 (2026)', categorie: 'MiniLED', prijs: 1299, inkoop: 1039, marge: 20, voorraad: 19 },
  { id: '65C805', merk: 'TCL', model: '65C805 (2025)', categorie: 'MiniLED', prijs: 899, inkoop: 629, marge: 30, voorraad: 33 },
];

export function ProductDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Upsell state
  const [upsellModelId, setUpsellModelId] = useState('');
  const [bijbetaling, setBijbetaling] = useState(50);
  const [idealLink, setIdealLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getMargeColor = (marge: number) => {
    if (marge >= 24) return 'bg-green-100 text-green-800 border-green-200';
    if (marge >= 15) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.merk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    if(!upsellModelId) return alert('Selecteer een upsell model.');
    setIsProcessing(true);
    setIdealLink('');
    
    // Simulate complex order + ideal link generation
    setTimeout(() => {
      setIsProcessing(false);
      setIdealLink(`https://pay.hellotv.nl/ideal/req_8f9${Math.floor(Math.random() * 1000)}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Tv className="text-blue-600" size={36} />
            Product & Marge Dashboard
          </h1>
          <p className="text-gray-600">
            Live overzicht van TV modellen (2024-2026). Controleer marges (Rood 1-14%, Oranje 15-23%, Groen 24%+) en genereer directe upsell iDEAL-links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Product Lijst */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <input
                type="text"
                placeholder="Zoek model of merk (bijv. LG, 2026)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Merk & Model</th>
                    <th className="px-6 py-4 text-right">Inkoop</th>
                    <th className="px-6 py-4 text-right">Verkoop</th>
                    <th className="px-6 py-4 text-center">Marge (%)</th>
                    <th className="px-6 py-4 text-center">Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{product.model}</div>
                        <div className="text-xs text-gray-500">{product.merk} • {product.categorie}</div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-500">€{product.inkoop}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold">€{product.prijs}</td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-block px-3 py-1 rounded-full font-bold border ${getMargeColor(product.marge)}`}>
                          {product.marge}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-blue-600 font-bold rounded transition-colors text-xs flex items-center gap-1 mx-auto"
                        >
                          <ArrowRightCircle size={14} /> Kies voor Upsell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upsell Widget */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col h-fit sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <TrendingUp className="text-[#1D6F42]" /> Directe Upsell Order
            </h2>

            {selectedProduct ? (
              <form onSubmit={handleCreateUpsell} className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">Huidig Model (Klant bestelling)</p>
                  <p className="font-bold text-gray-900">{selectedProduct.model}</p>
                  <p className="text-sm font-mono text-gray-500">Verkocht voor: €{selectedProduct.prijs}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Selecteer Upsell Model</label>
                  <select 
                    required
                    value={upsellModelId}
                    onChange={(e) => setUpsellModelId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  >
                    <option value="">-- Kies een nieuwer/beter model --</option>
                    {MOCK_PRODUCTS.filter(p => p.prijs > selectedProduct.prijs).map(p => (
                      <option key={p.id} value={p.id}>
                        {p.model} (Marge: {p.marge}%) - €{p.prijs}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bijbetalingsbedrag (Klant)</label>
                  <div className="flex gap-2 mb-3">
                    {[20, 50, 100, 200, 300].map(bedrag => (
                      <button
                        type="button"
                        key={bedrag}
                        onClick={() => setBijbetaling(bedrag)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg border ${
                          bijbetaling === bedrag 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        +€{bedrag}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">€</span>
                    <input 
                      type="number"
                      value={bijbetaling}
                      onChange={(e) => setBijbetaling(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <><RefreshCw className="animate-spin" size={20} /> Order & Link genereren...</>
                  ) : (
                    <><ShoppingCart size={20} /> Maak Order & iDEAL Link</>
                  )}
                </button>

                {idealLink && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                      <CheckCircle size={18} /> iDEAL Link Klaar!
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-green-100 p-2 rounded-lg">
                      <CreditCard size={16} className="text-gray-400" />
                      <input 
                        type="text" 
                        readOnly 
                        value={idealLink} 
                        className="w-full text-xs font-mono outline-none bg-transparent"
                      />
                      <button 
                        type="button" 
                        onClick={() => navigator.clipboard.writeText(idealLink)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-bold whitespace-nowrap"
                      >
                        Kopieer
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <AlertTriangle className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-sm font-bold text-gray-500">
                  Selecteer een product uit de lijst om een upsell-order te starten.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
