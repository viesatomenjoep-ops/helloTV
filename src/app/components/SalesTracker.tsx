import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, DollarSign, Trophy } from 'lucide-react';
import { api } from '../../utils/api';

export function SalesTracker() {
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformance();
    const interval = setInterval(loadPerformance, 5000); // Update every 5 seconds for live tracking
    return () => clearInterval(interval);
  }, []);

  const loadPerformance = async () => {
    try {
      const result = await api.getSalesPerformance();
      if (result.success) {
        setPerformance(result.performance);
      }
    } catch (error) {
      console.error('Failed to load performance:', error);
    } finally {
      setLoading(false);
    }
  };

  const topPerformer = performance[0];
  const totalRevenue = performance.reduce((sum, p) => sum + (p.totalRevenue || 0), 0);
  const totalSales = performance.reduce((sum, p) => sum + (p.salesCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Live Sales Tracker</h1>
          <p className="text-gray-600">Realtime prestaties van je verkoopteam</p>
          <div className="text-sm text-gray-500 mt-2">
            🔴 LIVE • Update elke 5 seconden
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={32} />
              <span className="text-sm opacity-90">Totale Omzet</span>
            </div>
            <div className="text-4xl font-bold">
              €{totalRevenue.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Target size={32} />
              <span className="text-sm opacity-90">Totaal Verkopen</span>
            </div>
            <div className="text-4xl font-bold">{totalSales}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Award size={32} />
              <span className="text-sm opacity-90">Gemiddelde Deal</span>
            </div>
            <div className="text-4xl font-bold">
              €{totalSales > 0 ? (totalRevenue / totalSales).toLocaleString('nl-NL', { minimumFractionDigits: 0 }) : 0}
            </div>
          </div>
        </div>

        {topPerformer && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Trophy size={48} />
                </div>
                <div>
                  <div className="text-sm opacity-90 mb-1">🏆 TOP VERKOPER</div>
                  <div className="text-4xl font-bold mb-2">{topPerformer.name}</div>
                  <div className="text-xl opacity-90">
                    €{topPerformer.totalRevenue.toLocaleString('nl-NL')} • {topPerformer.salesCount} verkopen
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Vandaag</div>
                <div className="text-3xl font-bold">€{topPerformer.todayRevenue?.toLocaleString('nl-NL') || 0}</div>
                <div className="text-sm opacity-90">{topPerformer.todaySalesCount || 0} verkopen</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Positie</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Naam</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Totale Omzet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verkopen</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gem. Deal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vandaag</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vandaag Verkopen</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((person, idx) => (
                  <tr
                    key={person.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx === 0 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {idx === 0 && <span className="text-xl">🥇</span>}
                        {idx === 1 && <span className="text-xl">🥈</span>}
                        {idx === 2 && <span className="text-xl">🥉</span>}
                        {idx > 2 && <span className="text-gray-500 font-medium">#{idx + 1}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                          {person.name?.charAt(0).toUpperCase() || 'S'}
                        </div>
                        <span className="font-medium text-gray-800">{person.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      €{person.totalRevenue.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{person.salesCount}</td>
                    <td className="px-6 py-4 text-gray-700">
                      €{person.avgSaleValue.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      €{(person.todayRevenue || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{person.todaySalesCount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {performance.length === 0 && !loading && (
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nog geen verkoop data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
