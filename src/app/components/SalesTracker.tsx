import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, DollarSign, Trophy, Tv, Cable } from 'lucide-react';
import { api } from '../../utils/api';
import { mockInventory } from '../../utils/mockInventory';

export function SalesTracker() {
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulatie van live data die elke 5 seconden ververst
    const generateMockSalesData = () => {
      // Simuleer verkopers
      return [
        {
          id: '1', name: 'Sander de Vries',
          totalRevenue: 125400, salesCount: 84,
          todayRevenue: 4500, todaySalesCount: 3,
          tvSold: 65, tvMargin: 18500,
          accessoriesSold: 120, accessoriesMargin: 4500
        },
        {
          id: '2', name: 'Lisa Jansen',
          totalRevenue: 98000, salesCount: 72,
          todayRevenue: 2800, todaySalesCount: 2,
          tvSold: 55, tvMargin: 14200,
          accessoriesSold: 95, accessoriesMargin: 3800
        },
        {
          id: '3', name: 'Mark Peters',
          totalRevenue: 85500, salesCount: 65,
          todayRevenue: 0, todaySalesCount: 0,
          tvSold: 48, tvMargin: 12800,
          accessoriesSold: 88, accessoriesMargin: 3100
        }
      ];
    };

    setPerformance(generateMockSalesData());
    setLoading(false);
    
    const interval = setInterval(() => {
      // Kleine random updates om live-effect te simuleren
      setPerformance(prev => [...prev]); 
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const topPerformer = performance[0];
  const totalRevenue = performance.reduce((sum, p) => sum + (p.totalRevenue || 0), 0);
  const totalSales = performance.reduce((sum, p) => sum + (p.salesCount || 0), 0);
  const totalTvs = performance.reduce((sum, p) => sum + (p.tvSold || 0), 0);
  const totalAccessories = performance.reduce((sum, p) => sum + (p.accessoriesSold || 0), 0);
  const totalTvMargin = performance.reduce((sum, p) => sum + (p.tvMargin || 0), 0);
  const totalAccMargin = performance.reduce((sum, p) => sum + (p.accessoriesMargin || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Verkoop Tracker</h1>
            <p className="text-gray-600">Realtime prestaties en marges van je verkoopteam</p>
            <div className="text-sm font-semibold text-red-500 mt-2 flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              LIVE • Update elke 5 seconden
            </div>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm font-medium">NL (Euro)</span>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={24} />
              <span className="text-sm opacity-90">Totale Omzet</span>
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
            <div className="text-sm mt-1 opacity-80">+ €{totalTvMargin.toLocaleString('nl-NL')} marge</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Cable size={24} />
              <span className="text-sm opacity-90">Accessoires (Kabels/Cleaners)</span>
            </div>
            <div className="text-3xl font-bold">{totalAccessories}</div>
            <div className="text-sm mt-1 opacity-80">+ €{totalAccMargin.toLocaleString('nl-NL')} marge</div>
          </div>
        </div>

        {/* Top Performer Banner */}
        {topPerformer && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Trophy size={48} />
                </div>
                <div>
                  <div className="text-sm opacity-90 mb-1 font-bold">🏆 TOP VERKOPER</div>
                  <div className="text-4xl font-bold mb-2">{topPerformer.name}</div>
                  <div className="text-xl opacity-90">
                    €{topPerformer.totalRevenue.toLocaleString('nl-NL')} • {topPerformer.salesCount} verkopen
                  </div>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm opacity-90 mb-1">Vandaag Gescoord</div>
                <div className="text-4xl font-bold">€{topPerformer.todayRevenue?.toLocaleString('nl-NL') || 0}</div>
                <div className="text-sm opacity-90 mt-1">{topPerformer.todaySalesCount || 0} verkopen vandaag</div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Positie</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verkoper</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Omzet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">TV's (Marge)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bijverkoop (Marge)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vandaag</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((person, idx) => (
                  <tr
                    key={person.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      idx === 0 ? 'bg-yellow-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {idx === 0 && <span className="text-2xl">🥇</span>}
                        {idx === 1 && <span className="text-2xl">🥈</span>}
                        {idx === 2 && <span className="text-2xl">🥉</span>}
                        {idx > 2 && <span className="text-gray-500 font-bold">#{idx + 1}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-inner">
                          {person.name?.charAt(0).toUpperCase() || 'S'}
                        </div>
                        <span className="font-bold text-gray-800">{person.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">
                        €{person.totalRevenue.toLocaleString('nl-NL')}
                      </div>
                      <div className="text-xs text-gray-500">{person.salesCount} totaal orders</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{person.tvSold} stuks</div>
                      <div className="text-xs text-green-600 font-medium">
                        + €{person.tvMargin.toLocaleString('nl-NL')} marge
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{person.accessoriesSold} kabels/cleaners</div>
                      <div className="text-xs text-green-600 font-medium">
                        + €{person.accessoriesMargin.toLocaleString('nl-NL')} marge
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-600">
                        €{(person.todayRevenue || 0).toLocaleString('nl-NL')}
                      </div>
                      <div className="text-xs text-gray-500">{person.todaySalesCount} orders</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {performance.length === 0 && !loading && (
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Nog geen verkoop data beschikbaar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
