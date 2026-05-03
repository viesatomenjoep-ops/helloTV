import React, { useState } from 'react';
import { Target, Monitor, BarChart2, TrendingUp, Users, Download, Edit2, Save, RefreshCw, CheckCircle, Activity } from 'lucide-react';
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

const CLEANERS_DATA = [
  { name: 'Amsterdam', value: 40.18 },
  { name: 'Breda', value: 39.84 },
  { name: 'Cruquius', value: 41.82 },
  { name: 'Den Bosch', value: 37.76 },
  { name: 'Doetinchem', value: 69.09 },
  { name: 'Duiven', value: 45.26 },
  { name: 'Eindhoven', value: 57.66 },
  { name: 'Groningen', value: 45.78 },
  { name: 'Naarden', value: 49.04 },
  { name: 'Nijmegen', value: 46.77 },
  { name: 'Rotterdam', value: 41.13 },
  { name: 'Tilburg', value: 59.42 },
  { name: 'Utrecht', value: 46.72 },
  { name: 'Zoeterwoude', value: 38.10 },
  { name: 'Chat', value: 10.86 },
  { name: 'Mail', value: 15.93 },
  { name: 'Target', value: 35.00, isTarget: true }
];

const KABELS_DATA = [
  { name: 'Amsterdam', value: 58.04 },
  { name: 'Breda', value: 39.02 },
  { name: 'Cruquius', value: 67.27 },
  { name: 'Den Bosch', value: 54.08 },
  { name: 'Doetinchem', value: 61.88 },
  { name: 'Duiven', value: 33.68 },
  { name: 'Eindhoven', value: 51.04 },
  { name: 'Groningen', value: 60.24 },
  { name: 'Naarden', value: 62.50 },
  { name: 'Nijmegen', value: 48.39 },
  { name: 'Rotterdam', value: 45.16 },
  { name: 'Tilburg', value: 65.22 },
  { name: 'Utrecht', value: 32.79 },
  { name: 'Zoeterwoude', value: 57.59 },
  { name: 'Chat', value: 10.11 },
  { name: 'Mail', value: 10.91 },
  { name: 'Target', value: 50.00, isTarget: true }
];

const BEUGELS_DATA = [
  { name: 'Amsterdam', value: 47.32 },
  { name: 'Breda', value: 36.84 },
  { name: 'Cruquius', value: 25.45 },
  { name: 'Den Bosch', value: 36.73 },
  { name: 'Doetinchem', value: 47.27 },
  { name: 'Duiven', value: 50.53 },
  { name: 'Eindhoven', value: 33.33 },
  { name: 'Groningen', value: 31.33 },
  { name: 'Naarden', value: 32.69 },
  { name: 'Nijmegen', value: 32.26 },
  { name: 'Rotterdam', value: 45.97 },
  { name: 'Tilburg', value: 39.13 },
  { name: 'Utrecht', value: 44.26 },
  { name: 'Zoeterwoude', value: 35.24 },
  { name: 'Chat', value: 22.85 },
  { name: 'Mail', value: 14.75 },
  { name: 'Target', value: 36.00, isTarget: true }
];

const SPTV_DATA = [
  { name: 'Utrecht', value: 95.78 },
  { name: 'Amsterdam', value: 90.73 },
  { name: 'Zoeterwoude', value: 88.28 },
  { name: 'Groningen', value: 88.03 },
  { name: 'Den Bosch', value: 87.94 },
  { name: 'Eindhoven', value: 86.75 },
  { name: 'Rotterdam', value: 83.54 },
  { name: 'Breda', value: 83.23 },
  { name: 'Tilburg', value: 80.81 },
  { name: 'Doetinchem', value: 76.92 },
  { name: 'Cruquius', value: 76.62 },
  { name: 'Naarden', value: 75.34 },
  { name: 'Nijmegen', value: 56.10 },
  { name: 'Duiven', value: 51.09 },
  { name: 'Mail', value: 41.67 },
  { name: 'Chat', value: 37.38 },
  { name: 'Target', value: 80.00, isTarget: true }
];

const TOP_SELLERS_DATA = [
  { naam: 'Lizzy Wams (TIL)', omzetIncl: '4.012,96', omzetExcl: '3.316,50', margeExcl: '931,85', margePct: '28,10', stuks: 8, transacties: 3 },
  { naam: 'Farshid A (TILBURG)', omzetIncl: '3.856,93', omzetExcl: '3.187,55', margeExcl: '1.013,30', margePct: '31,79', stuks: 12, transacties: 3 },
  { naam: 'Max D Online (NRD)', omzetIncl: '1.469,00', omzetExcl: '1.214,05', margeExcl: '206,42', margePct: '17,00', stuks: 1, transacties: 1 },
  { naam: 'Nicky van Raamsdonk (TIL)', omzetIncl: '1.327,95', omzetExcl: '1.097,48', margeExcl: '393,04', margePct: '35,81', stuks: 7, transacties: 4 },
  { naam: 'Kim A (TIL)', omzetIncl: '190,99', omzetExcl: '157,84', margeExcl: '45,82', margePct: '29,03', stuks: 2, transacties: 2 }
];

const INITIAL_INKOOP_DATA = [
  { name: 'Amsterdam', value: 85.0 },
  { name: 'Breda', value: 92.5 },
  { name: 'Cruquius', value: 78.0 },
  { name: 'Den Bosch', value: 88.4 },
  { name: 'Doetinchem', value: 95.1 },
  { name: 'Duiven', value: 82.0 },
  { name: 'Eindhoven', value: 96.0 },
  { name: 'Groningen', value: 84.5 },
  { name: 'Naarden', value: 89.0 },
  { name: 'Nijmegen', value: 76.5 },
  { name: 'Rotterdam', value: 81.2 },
  { name: 'Tilburg', value: 93.0 },
  { name: 'Utrecht', value: 86.8 },
  { name: 'Zoeterwoude', value: 79.5 },
  { name: 'Target', value: 85.0, isTarget: true }
];

const getColor = (value: number, isTarget?: boolean, targetValue: number = 50) => {
  if (isTarget) return '#FFFF00'; 
  if (value >= targetValue) return '#4ade80'; 
  if (value >= targetValue - 10) return '#fbbf24'; 
  return '#ef4444'; 
};

export function TrainersPortal() {
  const [oledData, setOledData] = useState(INITIAL_OLED_DATA);
  const [cleanersData, setCleanersData] = useState(CLEANERS_DATA);
  const [kabelsData, setKabelsData] = useState(KABELS_DATA);
  const [beugelsData, setBeugelsData] = useState(BEUGELS_DATA);
  const [sptvData, setSptvData] = useState(SPTV_DATA);
  const [inkoopData, setInkoopData] = useState(INITIAL_INKOOP_DATA);

  const [targets, setTargets] = useState<Record<string, number>>({
    'OLED': 50,
    'Cleaners': 35,
    'Kabels': 50,
    'TV Beugels': 36,
    'SP TV': 80,
    'Inkoop & Voorraad': 85
  });

  const [activeTab, setActiveTab] = useState('OLED');
  const [isEditing, setIsEditing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const getChartData = () => {
    switch (activeTab) {
      case 'Cleaners': return cleanersData;
      case 'Kabels': return kabelsData;
      case 'TV Beugels': return beugelsData;
      case 'SP TV': return sptvData;
      case 'Inkoop & Voorraad': return inkoopData;
      default: return oledData;
    }
  };

  const getChartTarget = () => {
    return targets[activeTab] || 50;
  };

  const handleEditChange = (index: number, newValue: string) => {
    const num = parseFloat(newValue.replace(',', '.'));
    if (isNaN(num)) return;
    
    let currentDataSet;
    let setDataSet;
    
    switch (activeTab) {
      case 'Cleaners': currentDataSet = cleanersData; setDataSet = setCleanersData; break;
      case 'Kabels': currentDataSet = kabelsData; setDataSet = setKabelsData; break;
      case 'TV Beugels': currentDataSet = beugelsData; setDataSet = setBeugelsData; break;
      case 'SP TV': currentDataSet = sptvData; setDataSet = setSptvData; break;
      case 'Inkoop & Voorraad': currentDataSet = inkoopData; setDataSet = setInkoopData; break;
      default: currentDataSet = oledData; setDataSet = setOledData; break;
    }

    const newData = [...currentDataSet];
    newData[index].value = num;
    setDataSet(newData);
  };

  const handleVMSImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 4000);
    }, 2000);
  };

  const handlePdfExport = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      setIsExportingPdf(false);
      window.print();
    }, 500);
  };

  const TABS = ['OLED', 'Cleaners', 'Kabels', 'TV Beugels', 'SP TV', 'Inkoop & Voorraad', 'Trainers Database', 'AI Coaching & Tips', 'Winkeltrainers Toebedeling'];
  const currentData = getChartData();
  const currentTarget = getChartTarget();

  const TRAINERS_DB = [
    { filiaal: 'Amsterdam', trainers: ['Kevin de Ruijter', 'Bram Smeets'] },
    { filiaal: 'Breda', trainers: ['Sander Visser'] },
    { filiaal: 'Eindhoven', trainers: ['Lotte Jansen', 'Tim Hendriks'] },
    { filiaal: 'Rotterdam', trainers: ['Maikel de Groot'] },
    { filiaal: 'Utrecht', trainers: ['Lisa van Dijk', 'Tom Peters'] },
    { filiaal: 'Den Bosch', trainers: ['Johan Bakker'] }
  ];

  return (
    <div className="h-full bg-[#2D2D2D] p-8 text-white overflow-y-auto">
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
                <p className="text-gray-400 text-sm font-bold mb-1 uppercase tracking-wider">Huidige Target ({activeTab})</p>
                <h3 className="text-2xl font-black text-white">{currentTarget}%</h3>
              </div>
              <Target className="text-[#FDCB2C]" size={24} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-600">
              <span className="text-green-400 font-bold">Doel: {currentTarget.toFixed(2)}%</span>
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

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab ? 'bg-[#FDCB2C] text-[#2D2D2D]' : 'bg-[#3D3D3D] text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'Trainers Database' ? <Users size={16} /> : <Activity size={16} />} {tab} {tab !== 'Trainers Database' && 'Overzicht'}
            </button>
          ))}
        </div>

        {activeTab === 'Trainers Database' ? (
          <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="text-[#FDCB2C]" /> Database: Salestrainers per Filiaal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRAINERS_DB.map(store => (
                <div key={store.filiaal} className="bg-[#2D2D2D] p-6 rounded-xl border border-gray-600">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Monitor size={20} className="text-blue-400" /> Filiaal {store.filiaal}
                  </h3>
                  <div className="space-y-3">
                    {store.trainers.map(trainer => (
                      <div key={trainer} className="bg-[#3D3D3D] p-3 rounded-lg flex justify-between items-center border border-gray-600">
                        <span className="font-bold text-gray-200">{trainer}</span>
                        <div className="flex gap-2">
                          <button className="text-[#25D366] hover:text-green-400 transition-colors" title="Stuur WhatsApp">
                            <Activity size={18} />
                          </button>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Stuur Mail">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700 flex justify-end">
              <button className="px-6 py-3 bg-[#1D6F42] hover:bg-green-700 text-white font-bold rounded-xl transition-colors">
                + Nieuwe Trainer Toevoegen
              </button>
            </div>
          </div>
        ) : activeTab === 'AI Coaching & Tips' ? (
          <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-xl">🤖</span> AI Verkooptraining Overzicht (Week 15)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span> Tip van de week: "De Beugel-Vraag"
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  AI Analyse toont aan dat klanten 40% vaker een muurbeugel kopen als je vraagt: 
                  <span className="italic text-white"> "Heeft u al nagedacht over hoe plat u de TV aan de muur wilt hebben?"</span> in plaats van <span className="italic text-white">"Wilt u er een beugel bij?"</span>
                </p>
                <div className="text-xs text-blue-400 font-bold bg-blue-900/50 p-2 rounded inline-block">
                  Aanbevolen focus voor: Utrecht, Groningen & Nijmegen
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <span className="text-xl">📊</span> Focusgroep: Kabels & Cleaners
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Bij de nieuwe OLED-lijn (2026) vergeten verkopers vaak de cleaners aan te bieden. 
                  Geef deze week als trainer extra aandacht aan de <span className="font-bold text-white">HaloTec Sponge</span> bij aankoop van een OLED G6.
                </p>
                <div className="text-xs text-purple-400 font-bold bg-purple-900/50 p-2 rounded inline-block">
                  Verwachte extra marge: € 12.000 per week
                </div>
              </div>
            </div>
            
            <div className="bg-[#2D2D2D] p-6 rounded-xl border border-gray-600">
              <h3 className="text-lg font-bold text-white mb-4">AI Gegenereerd Trainingsschema</h3>
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-gray-500 font-bold uppercase text-xs border-b border-gray-700">
                  <tr>
                    <th className="pb-2">Filiaal</th>
                    <th className="pb-2">Zwakste Punt (Data)</th>
                    <th className="pb-2">Aanbevolen Training</th>
                    <th className="pb-2">Coach Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="py-3 font-bold text-white">Utrecht</td>
                    <td className="py-3 text-red-400">Kabels (32.79%)</td>
                    <td className="py-3">"De Perfecte Aansluiting" (Audio/Video integratie)</td>
                    <td className="py-3"><button className="text-blue-400 text-xs font-bold border border-blue-400 px-2 py-1 rounded">Stuur Trainingsmateriaal</button></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Den Bosch</td>
                    <td className="py-3 text-orange-400">Cleaners (37.76%)</td>
                    <td className="py-3">"Onderhoud = Levensduur" (HaloTec Pitch)</td>
                    <td className="py-3"><button className="text-blue-400 text-xs font-bold border border-blue-400 px-2 py-1 rounded">Stuur Trainingsmateriaal</button></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Cruquius</td>
                    <td className="py-3 text-red-400">TV Beugels (25.45%)</td>
                    <td className="py-3">"Design & Interieur" (Vogel's positionering)</td>
                    <td className="py-3"><button className="text-blue-400 text-xs font-bold border border-blue-400 px-2 py-1 rounded">Stuur Trainingsmateriaal</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'Winkeltrainers Toebedeling' ? (
          <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700 mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="mb-6 border-b border-gray-600 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="text-[#FDCB2C]" /> Master Trainers Portaal (Wendy & Johan)
              </h2>
              <p className="text-gray-400 mt-2">Bedeel de top 100 verkoper-resultaten en VMS data direct toe aan de regionale winkeltrainers voor coaching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {['Joep Morsink', 'Massi Amin', 'Danny', 'Michael Duits'].map((trainer) => (
                <div key={trainer} className="bg-[#2D2D2D] rounded-xl p-4 border border-blue-500/30 hover:border-blue-500 cursor-pointer transition-all shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <Users size={20} className="text-blue-400" />
                    <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded font-bold">Winkeltrainer</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">{trainer}</h3>
                  <p className="text-xs text-gray-400 mt-1">Regio: {trainer === 'Joep Morsink' ? 'Noord/Oost' : trainer === 'Massi Amin' ? 'Zuid' : trainer === 'Danny' ? 'Randstad' : 'Midden'}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Nieuwe Resultaten (Binnengekomen via Sales Tracker)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-gray-400 uppercase text-xs border-b border-gray-700">
                  <tr>
                    <th className="pb-3">Top Verkoper</th>
                    <th className="pb-3">Filiaal</th>
                    <th className="pb-3">Aandachtsgebied</th>
                    <th className="pb-3">Huidige Prestatie</th>
                    <th className="pb-3 text-right">Toebedelen Aan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="hover:bg-[#3D3D3D] transition-colors">
                    <td className="py-4 font-bold text-white">Lizzy Wams</td>
                    <td className="py-4">Tilburg</td>
                    <td className="py-4 text-orange-400 font-bold">SP TV Upgrade (Marge)</td>
                    <td className="py-4 text-gray-400">Target 80% (Nu 65%)</td>
                    <td className="py-4 text-right">
                      <select className="bg-[#1A1A1A] border border-gray-600 rounded px-3 py-1.5 text-white focus:border-[#FDCB2C] outline-none text-sm font-bold">
                        <option>Kies Trainer...</option>
                        <option value="Joep Morsink">Joep Morsink</option>
                        <option value="Massi Amin">Massi Amin</option>
                        <option value="Danny">Danny</option>
                        <option value="Michael Duits">Michael Duits</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#3D3D3D] transition-colors">
                    <td className="py-4 font-bold text-white">Farshid A</td>
                    <td className="py-4">Tilburg</td>
                    <td className="py-4 text-blue-400 font-bold">Cleaners (HaloTec)</td>
                    <td className="py-4 text-gray-400">Target 35% (Nu 15%)</td>
                    <td className="py-4 text-right">
                      <select className="bg-[#1A1A1A] border border-gray-600 rounded px-3 py-1.5 text-white focus:border-[#FDCB2C] outline-none text-sm font-bold">
                        <option>Kies Trainer...</option>
                        <option value="Joep Morsink">Joep Morsink</option>
                        <option value="Massi Amin">Massi Amin</option>
                        <option value="Danny">Danny</option>
                        <option value="Michael Duits">Michael Duits</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#3D3D3D] transition-colors">
                    <td className="py-4 font-bold text-white">Tom Peters</td>
                    <td className="py-4">Utrecht</td>
                    <td className="py-4 text-purple-400 font-bold">Beugels (Vogel's)</td>
                    <td className="py-4 text-gray-400">Target 36% (Nu 20%)</td>
                    <td className="py-4 text-right">
                      <select className="bg-[#1A1A1A] border border-gray-600 rounded px-3 py-1.5 text-white focus:border-[#FDCB2C] outline-none text-sm font-bold">
                        <option>Kies Trainer...</option>
                        <option value="Joep Morsink">Joep Morsink</option>
                        <option value="Massi Amin">Massi Amin</option>
                        <option value="Danny">Danny</option>
                        <option value="Michael Duits">Michael Duits</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
              <button className="px-6 py-3 bg-[#1D6F42] hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
                <CheckCircle size={18} /> Bevestig Toebedeling aan Winkeltrainers
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* The Scraped Charts */}
            <div className="bg-[#333333] rounded-xl shadow-2xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-white">
              {activeTab === 'OLED' ? `Week 14/15 Target is ${globalTarget}% OLED Aandeel` : `Resultaten voor ${activeTab}`}
            </h2>
            <div className="flex gap-3">
              <button 
                onClick={handlePdfExport}
                disabled={isExportingPdf}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isExportingPdf ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />} 
                {isExportingPdf ? 'PDF Genereren...' : 'Exporteer Mooie PDF'}
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
              >
                {isEditing ? <><Save size={16} className="text-green-400" /> Opslaan</> : <><Edit2 size={16} /> Bewerk Data & Target</>}
              </button>
            </div>
          </div>
          
          <div className="h-[400px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
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
                  domain={[0, 100]} 
                  tick={{ fill: '#ddd' }} 
                  axisLine={{ stroke: '#666' }}
                />
                <Tooltip 
                  cursor={{ fill: '#444' }}
                  contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, activeTab]}
                />
                <Bar dataKey="value" name={activeTab}>
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.value, entry.isTarget, currentTarget)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {isEditing && (
            <div className="bg-[#2D2D2D] p-6 rounded-xl border border-gray-600 mt-4 animate-in fade-in slide-in-from-top-4">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Algemeen Target Instellen ({activeTab})</h3>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    step="1"
                    value={currentTarget}
                    onChange={(e) => {
                      const tg = Number(e.target.value);
                      setTargets({...targets, [activeTab]: tg});
                      
                      let currentDataSet;
                      let setDataSet;
                      
                      switch (activeTab) {
                        case 'Cleaners': currentDataSet = cleanersData; setDataSet = setCleanersData; break;
                        case 'Kabels': currentDataSet = kabelsData; setDataSet = setKabelsData; break;
                        case 'TV Beugels': currentDataSet = beugelsData; setDataSet = setBeugelsData; break;
                        case 'SP TV': currentDataSet = sptvData; setDataSet = setSptvData; break;
                        case 'Inkoop & Voorraad': currentDataSet = inkoopData; setDataSet = setInkoopData; break;
                        default: currentDataSet = oledData; setDataSet = setOledData; break;
                      }

                      const targetIndex = currentDataSet.findIndex(d => d.isTarget);
                      if(targetIndex !== -1) {
                        const newData = [...currentDataSet];
                        newData[targetIndex].value = tg;
                        setDataSet(newData);
                      }
                    }}
                    className="bg-[#1A1A1A] border border-gray-600 rounded px-4 py-2 text-xl font-bold text-[#FDCB2C] focus:border-[#FDCB2C] outline-none w-32"
                  />
                  <span className="text-gray-400">% (Alle grafiekkleuren en doelen passen zich hierop aan)</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Pas Filiaal Prestaties Aan (Live)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentData.map((item, idx) => !item.isTarget && (
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
        </>
        )}
      </div>
    </div>
  );
}
