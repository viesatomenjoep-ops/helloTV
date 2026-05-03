import React, { useState } from 'react';
import { Star, MapPin, TrendingUp, Download, MessageCircle, ShoppingCart, ShoppingBag, Search, Database } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const REVIEW_DATA = [
  { filiaal: 'Amsterdam', week: 45, maand: 180, jaar: 2150, rating: 4.8, transacties: 890, online: 300, winkel: 450, tickets: 140 },
  { filiaal: 'Breda', week: 38, maand: 145, jaar: 1820, rating: 4.7, transacties: 750, online: 200, winkel: 450, tickets: 100 },
  { filiaal: 'Eindhoven', week: 52, maand: 210, jaar: 2400, rating: 4.9, transacties: 1100, online: 400, winkel: 600, tickets: 100 },
  { filiaal: 'Duiven', week: 41, maand: 160, jaar: 1950, rating: 4.6, transacties: 820, online: 250, winkel: 470, tickets: 100 },
  { filiaal: 'Rotterdam', week: 48, maand: 195, jaar: 2300, rating: 4.8, transacties: 980, online: 350, winkel: 500, tickets: 130 },
  { filiaal: 'Utrecht', week: 44, maand: 175, jaar: 2100, rating: 4.7, transacties: 880, online: 280, winkel: 500, tickets: 100 },
];

const TREND_DATA = [
  { week: 'Wk 10', reviews: 240, transacties: 4500 },
  { week: 'Wk 11', reviews: 255, transacties: 4700 },
  { week: 'Wk 12', reviews: 268, transacties: 4850 },
  { week: 'Wk 13', reviews: 280, transacties: 5100 },
  { week: 'Wk 14', reviews: 295, transacties: 5350 },
  { week: 'Wk 15', reviews: 310, transacties: 5600 },
];

export function GoogleReviews() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Live Export voltooid: PDF en SQL Dump zijn succesvol gedownload!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Star className="text-yellow-500" size={36} fill="currentColor" />
              Google Maps Live Reviews
            </h1>
            <p className="text-gray-600">
              Live SQL koppeling met Google API: Reviews gekoppeld aan transacties per kanaal.
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Download size={20} />
            {isExporting ? 'Exporteren...' : 'Maak Live Export'}
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <Star size={24} fill="currentColor" />
              </div>
              <span className="text-green-500 font-bold text-sm">+12% vs Wk 14</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">4.8</h3>
            <p className="text-gray-500 font-medium mt-1">Gemiddelde Rating (Landelijk)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <MessageCircle size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">+54 deze week</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">310</h3>
            <p className="text-gray-500 font-medium mt-1">Reviews deze week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <ShoppingCart size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">Target gehaald</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">5.600</h3>
            <p className="text-gray-500 font-medium mt-1">Transacties deze week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Database size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">Live SQL</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">5.4%</h3>
            <p className="text-gray-500 font-medium mt-1">Conversie (Review / Transactie)</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart: Reviews per filiaal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-500" /> Reviews per Filiaal (Deze Week vs Maand)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVIEW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="filiaal" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="week" name="Reviews (Week)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maand" name="Reviews (Maand)" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart: Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Correlatie: Reviews vs Transacties
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="reviews" name="Reviews" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="transacties" name="Transacties" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Datatable: Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Database className="text-gray-500" /> SQL Transactie Splitsing per Kanaal
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Zoek filiaal..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Filiaal</th>
                  <th className="px-6 py-4 text-center">Totaal Transacties</th>
                  <th className="px-6 py-4 text-center">Winkel Orders</th>
                  <th className="px-6 py-4 text-center">Online / Webshop</th>
                  <th className="px-6 py-4 text-center">Tickets / Order Desk</th>
                  <th className="px-6 py-4 text-center">Totaal Reviews (Jaar)</th>
                  <th className="px-6 py-4 text-center">Gem. Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {REVIEW_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{row.filiaal}</td>
                    <td className="px-6 py-4 text-center font-bold">{row.transacties}</td>
                    <td className="px-6 py-4 text-center text-blue-600">{row.winkel}</td>
                    <td className="px-6 py-4 text-center text-purple-600">{row.online}</td>
                    <td className="px-6 py-4 text-center text-orange-600">{row.tickets}</td>
                    <td className="px-6 py-4 text-center font-medium">{row.jaar}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg w-16 mx-auto">
                        <Star size={12} fill="currentColor" /> {row.rating}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
