import React, { useState } from 'react';
import { Tv, Filter, Search, TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, merk: 'Samsung', model: 'Neo QLED 8K QN900D (65")', prijs: 4999, inkoop: 3200 },
  { id: 2, merk: 'Samsung', model: 'OLED S95D (55")', prijs: 2499, inkoop: 1950 },
  { id: 3, merk: 'Samsung', model: 'QLED Q60C (43")', prijs: 649, inkoop: 560 },
  { id: 4, merk: 'LG', model: 'OLED evo G4 (65")', prijs: 3299, inkoop: 2100 },
  { id: 5, merk: 'LG', model: 'OLED C4 (55")', prijs: 1899, inkoop: 1350 },
  { id: 6, merk: 'LG', model: 'QNED81 (75")', prijs: 1499, inkoop: 1200 },
  { id: 7, merk: 'Sony', model: 'BRAVIA XR A95L (65")', prijs: 3999, inkoop: 2700 },
  { id: 8, merk: 'Sony', model: 'BRAVIA 8 OLED (55")', prijs: 2199, inkoop: 1550 },
  { id: 9, merk: 'Sony', model: 'X85L Full Array LED (50")', prijs: 999, inkoop: 820 },
  { id: 10, merk: 'Philips', model: 'OLED+908 (65")', prijs: 2999, inkoop: 1750 },
  { id: 11, merk: 'Philips', model: 'The One 8808 (55")', prijs: 899, inkoop: 710 },
  { id: 12, merk: 'Philips', model: 'OLED808 (48")', prijs: 1399, inkoop: 950 },
  { id: 13, merk: 'TCL', model: '98X955 Mini LED (98")', prijs: 4999, inkoop: 2500 },
  { id: 14, merk: 'TCL', model: '65C845 Mini LED (65")', prijs: 1199, inkoop: 950 },
  { id: 15, merk: 'TCL', model: '55C745 QLED (55")', prijs: 699, inkoop: 580 },
  { id: 16, merk: 'Samsung', model: 'The Frame LS03D (65")', prijs: 1999, inkoop: 1100 },
  { id: 17, merk: 'LG', model: 'StanbyME', prijs: 1199, inkoop: 900 },
  { id: 18, merk: 'Sony', model: 'BRAVIA 3 LED (43")', prijs: 699, inkoop: 590 },
];

export function ProductDashboard() {
  const [filterBrand, setFilterBrand] = useState('Alle Merken');
  const [searchQuery, setSearchQuery] = useState('');

  const BRANDS = ['Alle Merken', 'Samsung', 'LG', 'Sony', 'Philips', 'TCL'];

  const processedProducts = MOCK_PRODUCTS.map(p => {
    const brutowinst = p.prijs - p.inkoop;
    const margePct = (brutowinst / p.prijs) * 100;
    
    let statusColor = 'text-red-600 bg-red-100';
    let barColor = 'bg-red-500';
    let statusText = 'Zorgelijk (< 20%)';

    if (margePct >= 20 && margePct <= 35) {
      statusColor = 'text-orange-600 bg-orange-100';
      barColor = 'bg-orange-500';
      statusText = 'Gemiddeld (20-35%)';
    } else if (margePct > 35) {
      statusColor = 'text-green-600 bg-green-100';
      barColor = 'bg-green-500';
      statusText = 'Gezond (> 35%)';
    }

    return { ...p, brutowinst, margePct, statusColor, barColor, statusText };
  });

  const filteredProducts = processedProducts.filter(p => {
    const matchBrand = filterBrand === 'Alle Merken' || p.merk === filterBrand;
    const matchSearch = p.model.toLowerCase().includes(searchQuery.toLowerCase()) || p.merk.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchSearch;
  });

  // Calculate Averages
  const avgMarginPct = filteredProducts.length > 0 
    ? filteredProducts.reduce((acc, p) => acc + p.margePct, 0) / filteredProducts.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Tv className="text-blue-600" size={36} />
              Productdashboard & Marges
            </h1>
            <p className="text-gray-600">Overzicht van TV assortiment inclusief brutowinst en marge categorieën.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Zoek model..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FDCB2C] outline-none text-sm w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold text-gray-700 appearance-none cursor-pointer text-sm w-full sm:w-48"
              >
                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Tv size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Totaal Modellen</p>
              <p className="text-2xl font-black text-gray-900">{filteredProducts.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Gemiddelde Marge</p>
              <p className="text-2xl font-black text-gray-900">{avgMarginPct.toFixed(1)}%</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FDCB2C]/20 text-[#D4A017] rounded-full flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">Gezonde Modellen (>35%)</p>
              <p className="text-2xl font-black text-gray-900">
                {filteredProducts.filter(p => p.margePct > 35).length}
              </p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider">Merk & Model</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Verkoopprijs</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Inkoop</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Brutowinst</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider w-64">Marge Indicator (tot 50%)</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.sort((a, b) => b.margePct - a.margePct).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{product.model}</div>
                      <div className="text-xs font-semibold text-gray-500 uppercase">{product.merk}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      €{product.prijs.toLocaleString('nl-NL')}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-500">
                      €{product.inkoop.toLocaleString('nl-NL')}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-green-600">
                      €{product.brutowinst.toLocaleString('nl-NL')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold w-12 text-right ${product.statusColor.split(' ')[0]}`}>
                          {product.margePct.toFixed(1)}%
                        </span>
                        <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${product.barColor} rounded-full transition-all`}
                            style={{ width: `${Math.min((product.margePct / 50) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${product.statusColor}`}>
                        {product.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-medium">
                      Geen producten gevonden voor deze filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
