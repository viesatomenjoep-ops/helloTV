import React, { useState } from 'react';
import { Target, Monitor, BarChart2, TrendingUp, Users, Download, Edit2, Save, RefreshCw, CheckCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const INITIAL_OLED_DATA = [
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

const TOP_SELLERS_DATA = [
  { naam: 'Lizzy Wams (TIL)', omzetIncl: '4.012,96', omzetExcl: '3.316,50', margeExcl: '931,85', margePct: '28,10', stuks: 8, transacties: 3 },
  { naam: 'Farshid A (TILBURG)', omzetIncl: '3.856,93', omzetExcl: '3.187,55', margeExcl: '1.013,30', margePct: '31,79', stuks: 12, transacties: 3 },
  { naam: 'Max D Online (NRD)', omzetIncl: '1.469,00', omzetExcl: '1.214,05', margeExcl: '206,42', margePct: '17,00', stuks: 1, transacties: 1 },
  { naam: 'Nicky van Raamsdonk (TIL)', omzetIncl: '1.327,95', omzetExcl: '1.097,48', margeExcl: '393,04', margePct: '35,81', stuks: 7, transacties: 4 },
  { naam: 'Kim A (TIL)', omzetIncl: '190,99', omzetExcl: '157,84', margeExcl: '45,82', margePct: '29,03', stuks: 2, transacties: 2 }
];

const getColor = (value: number, isTarget?: boolean) => {
  if (isTarget) return '#FFFF00'; 
  if (value >= 50) return '#4ade80'; 
  if (value >= 40) return '#fbbf24'; 
  return '#ef4444'; 
};

export function TrainersPortal() {
  const [oledData, setOledData] = useState(INITIAL_OLED_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleEditChange = (index: number, newValue: string) => {
    const num = parseFloat(newValue.replace(',', '.'));
    if (isNaN(num)) return;
    const newData = [...oledData];
    newData[index].value = num;
    setOledData(newData);
  };

  const handleVMSImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#2D2D2D] p-8 text-white overflow-y-auto">
      <div className="max-w-7xl mx-auto pb-24">
        <div className="mb-8 border-b border-gray-700 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
              <Users className="text-[#FDCB2C]" size={32} />
              Trainers & Salestrainers Portaal
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Monitor targets, merk-TV's, bijverkoop en conversie per filiaal (inclusief VMS koppeling).
            </p>
          </div>
          <button
            onClick={handleVMSImport}
            disabled={isImporting}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
              importSuccess 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {importSuccess ? (
              <><CheckCircle size={20} /> VMS Sync Voltooid</>
            ) : isImporting ? (
              <><RefreshCw size={20} className="animate-spin" /> Importeren uit VMS...</>
            ) : (
              <><Download size={20} /> Direct Import Live from VMS</>
            )}
          </button>
        </div>

        {/* Dashboard Widgets */}
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

        {/* The Scraped OLED Chart */}
        <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Week 14/15 target, 1 op de 2 TV's moet OLED zijn
            </h2>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
              {isEditing ? <><Save size={16} className="text-green-400" /> Opslaan</> : <><Edit2 size={16} /> Bewerk Data</>}
            </button>
          </div>
          
          <div className="h-[400px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={oledData}
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
                  {oledData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.value, entry.isTarget)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {isEditing && (
            <div className="bg-[#2D2D2D] p-4 rounded-xl border border-gray-600 mt-4 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Pas Prestaties Aan (Live)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {oledData.map((item, idx) => (
                  <div key={item.name} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400">{item.name}</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={item.value}
                      onChange={(e) => handleEditChange(idx, e.target.value)}
                      className="bg-[#1A1A1A] border border-gray-600 rounded px-2 py-1 text-white focus:border-[#FDCB2C] outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Verkopers VMS Scrape Table */}
        <div className="bg-[#333333] rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-[#1D6F42]/20 to-transparent">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart2 className="text-[#1D6F42]" /> Rapport Filter: Top Verkopers (VMS Data)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#2D2D2D] text-gray-400 uppercase text-xs font-bold border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4">Naam</th>
                  <th className="px-6 py-4 text-right">Omzet incl.</th>
                  <th className="px-6 py-4 text-right">Omzet excl.</th>
                  <th className="px-6 py-4 text-right">Marge excl.</th>
                  <th className="px-6 py-4 text-right">Marge (%)</th>
                  <th className="px-6 py-4 text-center">Aantal stuks</th>
                  <th className="px-6 py-4 text-center">Aantal transacties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {TOP_SELLERS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#3D3D3D] transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{row.naam}</td>
                    <td className="px-6 py-4 text-right text-blue-400 font-mono">€ {row.omzetIncl}</td>
                    <td className="px-6 py-4 text-right font-mono">€ {row.omzetExcl}</td>
                    <td className="px-6 py-4 text-right text-green-400 font-mono">€ {row.margeExcl}</td>
                    <td className="px-6 py-4 text-right font-bold font-mono">{row.margePct} %</td>
                    <td className="px-6 py-4 text-center">{row.stuks}</td>
                    <td className="px-6 py-4 text-center">{row.transacties}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#222222] font-bold border-t-2 border-gray-600">
                <tr>
                  <td className="px-6 py-4 text-gray-400 uppercase">Totaal (Aantal: 9)</td>
                  <td className="px-6 py-4 text-right text-blue-400 font-mono">€ 10.857,83</td>
                  <td className="px-6 py-4 text-right font-mono">€ 8.973,41</td>
                  <td className="px-6 py-4 text-right text-green-400 font-mono">€ 2.590,44</td>
                  <td className="px-6 py-4 text-right font-mono">28,87 %</td>
                  <td className="px-6 py-4 text-center font-mono">30,00</td>
                  <td className="px-6 py-4 text-center font-mono">13,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
