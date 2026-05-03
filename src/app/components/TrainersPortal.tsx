import React from 'react';
import { Target, Monitor, BarChart2, TrendingUp, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';

const OLED_DATA = [
  { name: 'Amsterdam', value: 40.52 },
  { name: 'Breda', value: 39.20 },
  { name: 'Cruquius', value: 56.14 },
  { name: 'Den Bosch', value: 47.47 },
  { name: 'Doetinchem', value: 48.21 },
  { name: 'Duiven', value: 48.08 },
  { name: 'Eindhoven', value: 64.41 },
  { name: 'Groningen', value: 44.19 },
  { name: 'Naarden', value: 40.38 },
  { name: 'Nijmegen', value: 53.13 },
  { name: 'Rotterdam', value: 56.20 },
  { name: 'Tilburg', value: 43.66 },
  { name: 'Utrecht', value: 50.00 },
  { name: 'Zoeterwoude', value: 39.81 },
  { name: 'Mail', value: 46.11 },
  { name: 'Chat', value: 44.14 },
  { name: 'Target', value: 50.00, isTarget: true }
];

const getColor = (value: number, isTarget?: boolean) => {
  if (isTarget) return '#FFFF00'; // Yellow for target
  if (value >= 50) return '#4ade80'; // Green (>= 50%)
  if (value >= 40) return '#fbbf24'; // Orange (40-49.99%)
  return '#ef4444'; // Red (< 40%)
};

export function TrainersPortal() {
  return (
    <div className="min-h-screen bg-[#2D2D2D] p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
            <Users className="text-[#FDCB2C]" size={32} />
            Trainers & Salestrainers Portaal
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Monitor targets, merk-TV's, bijverkoop en conversie per filiaal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#3D3D3D] rounded-xl p-6 border border-gray-600 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1 uppercase tracking-wider">Huidige Target (Wk 14/15)</p>
                <h3 className="text-2xl font-black text-white">1 op de 2 TV's = OLED</h3>
              </div>
              <Target className="text-[#FDCB2C]" size={24} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <span className="text-green-400 font-bold">Doel: 50.00%</span>
            </div>
          </div>
          
          <div className="bg-[#3D3D3D] rounded-xl p-6 border border-gray-600 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1 uppercase tracking-wider">Beste Filiaal</p>
                <h3 className="text-2xl font-black text-white">Eindhoven</h3>
              </div>
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <span className="text-green-400 font-bold">Score: 64.41%</span>
            </div>
          </div>

          <div className="bg-[#3D3D3D] rounded-xl p-6 border border-gray-600 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1 uppercase tracking-wider">Actie Vereist</p>
                <h3 className="text-2xl font-black text-white">Breda & Zoeterwoude</h3>
              </div>
              <Monitor className="text-red-400" size={24} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <span className="text-red-400 font-bold">Score: &lt; 40.00%</span>
            </div>
          </div>
        </div>

        {/* The Scraped Chart */}
        <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Week 14/15 target, 1 op de 2 TV's moet OLED zijn
          </h2>
          
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={OLED_DATA}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{ fill: '#ddd', fontSize: 12 }} 
                  axisLine={{ stroke: '#666' }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  domain={[0, 70]} 
                  tick={{ fill: '#ddd' }} 
                  axisLine={{ stroke: '#666' }}
                />
                <Tooltip 
                  cursor={{ fill: '#444' }}
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'OLED Aandeel']}
                />
                <Bar dataKey="value" name="OLED Aandeel">
                  {OLED_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.value, entry.isTarget)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
}
