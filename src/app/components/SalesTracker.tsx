import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Award, Target, Euro, Trophy, Tv, Cable, Store, Filter, Download, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { api } from '../../utils/api';

const STORES = [
  'Alle Filialen',
  'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Bergen op Zoom', 
  'Breda', 'Cruquius', 'Den Bosch', 'Doetinchem', 
  'Duiven', 'Eindhoven', 'Groningen', 'Leeuwarden', 
  'Nijmegen', 'Naarden', 'Rotterdam', 'Tilburg', 
  'Utrecht', 'Zoeterwoude'
];

const TV_MODELS = [
  'Sony BRAVIA XR-65A95L', 'LG OLED65G45LW', 'Samsung Neo QLED 8K QN900D', 
  'Philips 55OLED908', 'TCL 85X955', 'LG OLED77C44LA', 'Sony KD-85X85L'
];

const FIRST_NAMES = ['Sander', 'Lisa', 'Mark', 'Tom', 'Daan', 'Kevin', 'Lotte', 'Maikel', 'Johan', 'Peter', 'Anne', 'Tim', 'Max', 'Ruben', 'Jeroen', 'Martijn', 'Jasper', 'Bas', 'Dennis', 'Niels', 'Rik', 'Luuk', 'Bram', 'Joris', 'Thijs', 'Stan', 'Milan', 'Sem', 'Lars', 'Jesper'];
const LAST_NAMES = ['de Vries', 'Jansen', 'Peters', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder', 'de Groot', 'Bos', 'Vos', 'van Dijk', 'van der Berg', 'Dekker', 'Hendriks', 'van Dongen', 'Kuipers', 'Veenstra', 'Jonker', 'Hoekstra', 'Dijkstra', 'Scholten', 'Timmermans', 'Kramer'];

export function SalesTracker() {
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState('Alle Filialen');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [exportPeriod, setExportPeriod] = useState<string>('Maand');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Generate mock specific sales data for a seller
  const generateRecentSales = (salesCount: number) => {
    const recent = [];
    const numToShow = Math.min(salesCount, 5); // show last 5 sales
    for (let i = 0; i < numToShow; i++) {
      const isToday = i === 0;
      const date = new Date();
      if (!isToday) {
        date.setDate(date.getDate() - Math.floor(Math.random() * 14));
      }
      
      const price = Math.floor(Math.random() * 3000) + 500;
      const margin = Math.floor(price * (0.2 + (Math.random() * 0.2)));

      recent.push({
        id: `ORD-${Math.floor(Math.random() * 10000) + 10000}`,
        date: date,
        product: TV_MODELS[Math.floor(Math.random() * TV_MODELS.length)],
        price: price,
        margin: margin,
        customer: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`
      });
    }
    return recent.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  // Generate Top 80 sellers mock data
  const generateMockSalesData = () => {
    const data = [];
    for (let i = 1; i <= 80; i++) {
      const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const store = STORES[Math.floor(Math.random() * (STORES.length - 1)) + 1]; 
      
      const isTop = i <= 5;
      const salesCount = isTop ? Math.floor(Math.random() * 50) + 150 : Math.floor(Math.random() * 100) + 20;
      const tvSold = Math.floor(salesCount * 0.7);
      const accessoriesSold = Math.floor(salesCount * 1.5);

      const tvMargin = tvSold * (Math.floor(Math.random() * 200) + 150); 
      const accessoriesMargin = accessoriesSold * 35; 
      const totalRevenue = (tvSold * 1800) + (accessoriesSold * 50); 
      
      const todaySalesCount = Math.floor(Math.random() * 5);
      const todayRevenue = todaySalesCount * 1800;

      data.push({
        id: `EMP-${i}`,
        name: `${firstName} ${lastName}`,
        store: store,
        totalRevenue,
        salesCount,
        todayRevenue,
        todaySalesCount,
        tvSold,
        tvMargin,
        accessoriesSold,
        accessoriesMargin,
        recentSales: generateRecentSales(salesCount)
      });
    }

    return data.sort((a, b) => b.totalRevenue - a.totalRevenue);
  };

  useEffect(() => {
    setPerformance(generateMockSalesData());
    setLoading(false);
  }, []);

  const filteredPerformance = useMemo(() => {
    if (selectedStore === 'Alle Filialen') return performance;
    return performance.filter(p => p.store === selectedStore);
  }, [performance, selectedStore]);

  const handleExportToExcel = (period: string) => {
    setShowExportMenu(false);
    
    // CSV Header
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Verkoper,Filiaal,Periode,Verkocht Product,Klant,Datum,Prijs (Euro),Marge (Euro)\n`;

    filteredPerformance.forEach(person => {
      person.recentSales.forEach((sale: any) => {
        const row = [
          `"${person.name}"`,
          `"${person.store}"`,
          `"${period}"`,
          `"${sale.product}"`,
          `"${sale.customer}"`,
          `"${sale.date.toLocaleDateString('nl-NL')}"`,
          `"${sale.price}"`,
          `"${sale.margin}"`
        ];
        csvContent += row.join(",") + "\n";
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HelloTV_Sales_Export_${period}_${selectedStore.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topPerformer = filteredPerformance[0];
  const totalRevenue = filteredPerformance.reduce((sum, p) => sum + (p.totalRevenue || 0), 0);
  const totalSales = filteredPerformance.reduce((sum, p) => sum + (p.salesCount || 0), 0);
  const totalTvs = filteredPerformance.reduce((sum, p) => sum + (p.tvSold || 0), 0);
  const totalAccessories = filteredPerformance.reduce((sum, p) => sum + (p.accessoriesSold || 0), 0);
  const totalTvMargin = filteredPerformance.reduce((sum, p) => sum + (p.tvMargin || 0), 0);
  const totalAccMargin = filteredPerformance.reduce((sum, p) => sum + (p.accessoriesMargin || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Verkoop Tracker</h1>
            <p className="text-gray-600">Gedetailleerde Verkoopstatistieken per Medewerker</p>
            <div className="text-sm font-semibold text-red-500 mt-2 flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              LIVE • Update elke 4 seconden
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Store size={18} className="text-gray-400" />
              </div>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FDCB2C] outline-none font-bold text-gray-700 appearance-none cursor-pointer"
              >
                {STORES.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            {/* Excel Export Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-6 py-3 bg-[#1D6F42] text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Export naar Excel
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                    Selecteer Periode
                  </div>
                  {['Dag', 'Week', 'Maand', 'Jaar'].map((period) => (
                    <button
                      key={period}
                      onClick={() => handleExportToExcel(period)}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-[#1D6F42] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Calendar size={14} /> Per {period}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Euro size={24} />
              <span className="text-sm opacity-90">Totale Omzet ({selectedStore})</span>
            </div>
            <div className="text-3xl font-bold">
              €{totalRevenue.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target size={24} />
              <span className="text-sm opacity-90">Totaal Verkopen</span>
            </div>
            <div className="text-3xl font-bold">{totalSales}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Tv size={24} />
              <span className="text-sm opacity-90">TV's Verkocht</span>
            </div>
            <div className="text-3xl font-bold">{totalTvs}</div>
            <div className="text-sm mt-1 font-semibold text-purple-100">+ €{totalTvMargin.toLocaleString('nl-NL')} marge</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Cable size={24} />
              <span className="text-sm opacity-90">Accessoires (Cross-sell)</span>
            </div>
            <div className="text-3xl font-bold">{totalAccessories}</div>
            <div className="text-sm mt-1 font-semibold text-orange-100">+ €{totalAccMargin.toLocaleString('nl-NL')} marge</div>
          </div>
        </div>

        {/* Detailed Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider w-16">#</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Verkoper</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Filiaal</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Omzet</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">TV's (Marge)</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Acties</th>
                </tr>
              </thead>
              <tbody>
                {filteredPerformance.map((person, idx) => (
                  <React.Fragment key={person.id}>
                    <tr
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                        expandedRow === person.id ? 'bg-blue-50/30' : ''
                      } ${idx === 0 && !expandedRow ? 'bg-yellow-50/50' : ''}`}
                      onClick={() => setExpandedRow(expandedRow === person.id ? null : person.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {idx === 0 && <span className="text-2xl">🥇</span>}
                          {idx === 1 && <span className="text-2xl">🥈</span>}
                          {idx === 2 && <span className="text-2xl">🥉</span>}
                          {idx > 2 && <span className="text-gray-400 font-black text-lg">{idx + 1}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-900 text-[#FDCB2C] w-10 h-10 rounded-full flex items-center justify-center font-black shadow-inner text-sm">
                            {person.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-bold text-gray-900">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-600">
                          <Store size={14} />
                          {person.store}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-gray-900 text-lg">
                          €{person.totalRevenue.toLocaleString('nl-NL')}
                        </div>
                        <div className="text-xs font-medium text-gray-500">{person.salesCount} totaal orders</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{person.tvSold} stuks</div>
                        <div className="text-xs text-green-600 font-bold">
                          + €{person.tvMargin.toLocaleString('nl-NL')} marge
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                          {expandedRow === person.id ? (
                            <><ChevronUp size={16} /> Sluiten</>
                          ) : (
                            <><ChevronDown size={16} /> Bekijk Verkopen</>
                          )}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expandable Row Content: Recent Sales Deep Dive */}
                    {expandedRow === person.id && (
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <td colSpan={6} className="px-8 py-6">
                          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <TrendingUp size={20} className="text-blue-600" />
                                Laatste verkopen van {person.name}
                              </h3>
                              <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Exporteert mee in Excel
                              </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                <thead className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                                  <tr>
                                    <th className="pb-3 pr-4">Order Nr.</th>
                                    <th className="pb-3 pr-4">Datum</th>
                                    <th className="pb-3 pr-4">Klantnaam</th>
                                    <th className="pb-3 pr-4">Gekochte TV</th>
                                    <th className="pb-3 pr-4 text-right">Verkoopprijs</th>
                                    <th className="pb-3 text-right">Marge</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                  {person.recentSales.map((sale: any) => (
                                    <tr key={sale.id} className="hover:bg-gray-50/50">
                                      <td className="py-3 pr-4 font-semibold text-blue-600">{sale.id}</td>
                                      <td className="py-3 pr-4 text-gray-600 font-medium">
                                        {sale.date.toLocaleDateString('nl-NL')}
                                      </td>
                                      <td className="py-3 pr-4 text-gray-800 font-medium">{sale.customer}</td>
                                      <td className="py-3 pr-4 text-gray-800 font-bold">{sale.product}</td>
                                      <td className="py-3 pr-4 text-right font-black text-gray-900">
                                        €{sale.price.toLocaleString('nl-NL')}
                                      </td>
                                      <td className="py-3 text-right font-black text-green-600">
                                        + €{sale.margin.toLocaleString('nl-NL')}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPerformance.length === 0 && !loading && (
            <div className="text-center py-16">
              <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Geen verkoop data gevonden voor {selectedStore}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
