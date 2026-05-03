import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Award, Target, Euro, Trophy, Tv, Cable, Store, Filter } from 'lucide-react';
import { api } from '../../utils/api';

const STORES = [
  'Alle Filialen',
  'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Bergen op Zoom', 
  'Breda', 'Cruquius', 'Den Bosch', 'Doetinchem', 
  'Duiven', 'Eindhoven', 'Groningen', 'Leeuwarden', 
  'Nijmegen', 'Naarden', 'Rotterdam', 'Tilburg', 
  'Utrecht', 'Zoeterwoude'
];

const FIRST_NAMES = ['Sander', 'Lisa', 'Mark', 'Tom', 'Daan', 'Kevin', 'Lotte', 'Maikel', 'Johan', 'Peter', 'Anne', 'Tim', 'Max', 'Ruben', 'Jeroen', 'Martijn', 'Jasper', 'Bas', 'Dennis', 'Niels', 'Rik', 'Luuk', 'Bram', 'Joris', 'Thijs', 'Stan', 'Milan', 'Sem', 'Lars', 'Jesper'];
const LAST_NAMES = ['de Vries', 'Jansen', 'Peters', 'Bakker', 'Visser', 'Smit', 'Meijer', 'de Boer', 'Mulder', 'de Groot', 'Bos', 'Vos', 'van Dijk', 'van der Berg', 'Dekker', 'Hendriks', 'van Dongen', 'Kuipers', 'Veenstra', 'Jonker', 'Hoekstra', 'Dijkstra', 'Scholten', 'Timmermans', 'Kramer'];

export function SalesTracker() {
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState('Alle Filialen');

  // Generate Top 80 sellers mock data
  const generateMockSalesData = () => {
    const data = [];
    for (let i = 1; i <= 80; i++) {
      const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const store = STORES[Math.floor(Math.random() * (STORES.length - 1)) + 1]; // pick random store except 'Alle Filialen'
      
      const isTop = i <= 5;
      const salesCount = isTop ? Math.floor(Math.random() * 50) + 150 : Math.floor(Math.random() * 100) + 20;
      const tvSold = Math.floor(salesCount * 0.7);
      const accessoriesSold = Math.floor(salesCount * 1.5);

      const tvMargin = tvSold * (Math.floor(Math.random() * 200) + 150); // average margin per TV
      const accessoriesMargin = accessoriesSold * 35; // average margin per accessory
      const totalRevenue = (tvSold * 1800) + (accessoriesSold * 50); // mock revenue
      
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
        accessoriesMargin
      });
    }

    // Sort by total revenue descending
    return data.sort((a, b) => b.totalRevenue - a.totalRevenue);
  };

  useEffect(() => {
    setPerformance(generateMockSalesData());
    setLoading(false);
    
    const interval = setInterval(() => {
      // Simulate live random updates
      setPerformance(prev => {
        const newData = [...prev];
        const randomIdx = Math.floor(Math.random() * newData.length);
        const bump = Math.floor(Math.random() * 2000) + 500;
        newData[randomIdx] = {
          ...newData[randomIdx],
          totalRevenue: newData[randomIdx].totalRevenue + bump,
          todayRevenue: newData[randomIdx].todayRevenue + bump,
          salesCount: newData[randomIdx].salesCount + 1,
          todaySalesCount: newData[randomIdx].todaySalesCount + 1,
          tvSold: newData[randomIdx].tvSold + 1,
          tvMargin: newData[randomIdx].tvMargin + 250
        };
        return newData.sort((a, b) => b.totalRevenue - a.totalRevenue);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredPerformance = useMemo(() => {
    if (selectedStore === 'Alle Filialen') return performance;
    return performance.filter(p => p.store === selectedStore);
  }, [performance, selectedStore]);

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
            <p className="text-gray-600">Top 80 Verkopers van Nederland</p>
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
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
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

        {/* Top Performer Banner */}
        {topPerformer && (
          <div className="bg-gradient-to-r from-[#FDCB2C] via-yellow-400 to-orange-400 text-black rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Trophy size={200} />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="bg-black/5 backdrop-blur-sm rounded-full p-6">
                  <Trophy size={48} className="text-black" />
                </div>
                <div>
                  <div className="text-sm font-black tracking-wider uppercase mb-1">MVP van HelloTV</div>
                  <div className="text-4xl font-black mb-1">{topPerformer.name}</div>
                  <div className="text-lg font-bold opacity-80 flex items-center gap-2">
                    <Store size={18} /> {topPerformer.store}
                  </div>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm font-black uppercase mb-1">Totale Omzet</div>
                <div className="text-4xl font-black">€{topPerformer.totalRevenue.toLocaleString('nl-NL')}</div>
                <div className="text-sm font-bold mt-1 opacity-80">{topPerformer.salesCount} verkopen gesloten</div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Verkoper</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Filiaal</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Omzet</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">TV's (Marge)</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Bijverkoop (Marge)</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Vandaag</th>
                </tr>
              </thead>
              <tbody>
                {filteredPerformance.map((person, idx) => (
                  <tr
                    key={person.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      idx === 0 ? 'bg-yellow-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {idx === 0 && <span className="text-2xl" title="Nummer 1">🥇</span>}
                        {idx === 1 && <span className="text-2xl" title="Nummer 2">🥈</span>}
                        {idx === 2 && <span className="text-2xl" title="Nummer 3">🥉</span>}
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
                        + €{person.tvMargin.toLocaleString('nl-NL')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{person.accessoriesSold} items</div>
                      <div className="text-xs text-green-600 font-bold">
                        + €{person.accessoriesMargin.toLocaleString('nl-NL')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-green-600">
                        €{(person.todayRevenue || 0).toLocaleString('nl-NL')}
                      </div>
                      <div className="text-xs font-medium text-gray-500">{person.todaySalesCount} orders</div>
                    </td>
                  </tr>
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
