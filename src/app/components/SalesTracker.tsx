import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Award, Target, Euro, Trophy, Tv, Cable, Store, Filter, Download, ChevronDown, ChevronUp, Calendar, Mail, CheckCircle, RefreshCw, Maximize2, Minimize2, Smartphone, Users } from 'lucide-react';
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

const getMarginColor = (pct: number) => {
  if (pct < 22) return 'text-red-700 bg-red-100 border border-red-200';
  if (pct <= 24) return 'text-orange-700 bg-orange-100 border border-orange-200';
  return 'text-green-700 bg-green-100 border border-green-200';
};

export function SalesTracker() {
  const [performance, setPerformance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState('Alle Filialen');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [exportPeriod, setExportPeriod] = useState<string>('Maand');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [tvMode, setTvMode] = useState(false);

  const [whatsappSuccessId, setWhatsappSuccessId] = useState<string | null>(null);
  const [trainerSuccessId, setTrainerSuccessId] = useState<string | null>(null);

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
      const tvSold = Math.floor(salesCount * 0.6);
      const bbqSold = Math.floor(salesCount * 0.1);
      const accessoriesSold = Math.floor(salesCount * 1.5);

      const tvMargin = tvSold * (Math.floor(Math.random() * 200) + 150); 
      const bbqMargin = bbqSold * (Math.floor(Math.random() * 150) + 100);
      const accessoriesMargin = accessoriesSold * 35; 
      const totalRevenue = (tvSold * 1800) + (bbqSold * 900) + (accessoriesSold * 50); 
      
      const todaySalesCount = Math.floor(Math.random() * 5);
      const todayRevenue = todaySalesCount * 1500;

      const tvMarginPct = Math.floor(Math.random() * 20) + 18; // 18% to 37%
      const bbqMarginPct = Math.floor(Math.random() * 15) + 18; // 18% to 32%

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
        bbqSold,
        bbqMargin,
        tvMarginPct,
        bbqMarginPct,
        accessoriesSold,
        accessoriesMargin,
        points: Math.floor(totalRevenue / 100) + Math.floor(accessoriesSold * 2), // Eindejaarsbonus points
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

  const handleExportSpecific = (type: 'all' | 'single' | 'top3', person?: any) => {
    let targetData = filteredPerformance;
    let filename = 'HelloTV_Sales_Export_Totaal';

    if (type === 'single' && person) {
      targetData = [person];
      filename = `HelloTV_Sales_${person.name.replace(' ', '_')}`;
    } else if (type === 'top3') {
      targetData = filteredPerformance.slice(0, 3);
      filename = 'HelloTV_Sales_Top3';
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Verkoper,Filiaal,Periode,Verkocht Product,Klant,Datum,Prijs (Euro),Marge (Euro)\n`;

    targetData.forEach(p => {
      p.recentSales.forEach((sale: any) => {
        const row = [
          `"${p.name}"`,
          `"${p.store}"`,
          `"Huidig"`,
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
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailReport = () => {
    setIsEmailing(true);
    // Simuleer het genereren en versturen van het dashboard en excel via e-mail
    setTimeout(() => {
      setIsEmailing(false);
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 4000);
    }, 1500);
  };

  const handleSendToWhatsapp = (person: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setWhatsappSuccessId(person.id);
    setTimeout(() => setWhatsappSuccessId(null), 3000);
  };

  const handleSendToTrainer = (person: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setTrainerSuccessId(person.id);
    alert(`Resultaten van ${person.name} succesvol doorgezet naar Master Trainers (Wendy & Johan). Zij zullen dit toebedelen aan de winkeltrainers.`);
    setTimeout(() => setTrainerSuccessId(null), 3000);
  };

  const topPerformer = filteredPerformance[0];
  const totalRevenue = filteredPerformance.reduce((sum, p) => sum + (p.totalRevenue || 0), 0);
  const totalSales = filteredPerformance.reduce((sum, p) => sum + (p.salesCount || 0), 0);
  const totalTvs = filteredPerformance.reduce((sum, p) => sum + (p.tvSold || 0), 0);
  const totalAccessories = filteredPerformance.reduce((sum, p) => sum + (p.accessoriesSold || 0), 0);
  const totalTvMargin = filteredPerformance.reduce((sum, p) => sum + (p.tvMargin || 0), 0);
  const totalAccMargin = filteredPerformance.reduce((sum, p) => sum + (p.accessoriesMargin || 0), 0);

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-y-auto transition-all ${
      tvMode ? 'fixed inset-0 z-50 min-h-screen' : 'min-h-screen'
    }`}>
      <div className={`${tvMode ? 'max-w-[95%]' : 'max-w-7xl'} mx-auto`}>
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

            {/* PDF Export Button */}
            <button 
              onClick={() => {
                setTimeout(() => window.print(), 100);
              }}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-sm hover:bg-red-700 transition-all flex items-center gap-2 print:hidden"
            >
              <Download size={18} />
              Export naar PDF
            </button>

            {/* Excel Export Menu */}
            <div className="relative print:hidden">
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

            {/* Email Report Button */}
            <button
              onClick={handleEmailReport}
              disabled={isEmailing}
              className={`px-6 py-3 font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 print:hidden ${
                emailSuccess 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              }`}
            >
              {emailSuccess ? (
                <><CheckCircle size={18} /> PDF Dagoverzicht Verzonden</>
              ) : isEmailing ? (
                <><RefreshCw size={18} className="animate-spin" /> PDF & Excel Genereren...</>
              ) : (
                <><Mail size={18} /> E-mail Dagoverzicht (PDF/Excel)</>
              )}
            </button>
            
            {/* TV Mode Toggle */}
            <button
              onClick={() => setTvMode(!tvMode)}
              className="px-4 py-3 bg-gray-800 text-white font-bold rounded-xl shadow-sm hover:bg-gray-900 transition-all flex items-center gap-2"
              title="Open Landingspagina (TV Modus)"
            >
              {tvMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {/* Live Bonus & HelloTV-Punten Widget */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-white border-l-4 border-[#FDCB2C]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="text-[#FDCB2C]" /> Actueel Bonus & Punten Overzicht (Persoonlijk)
            </h2>
            <div className="text-sm px-3 py-1 bg-[#FDCB2C] text-black font-bold rounded-full animate-pulse">
              LIVE BEREKENING
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Punten Sectie (Boven/Voorop gesteld) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-800 p-5 rounded-xl border border-indigo-500/50 shadow-inner flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-1">Jouw Eindejaars HelloTV-Punten</p>
                <p className="text-5xl font-black text-white drop-shadow-md">4.250 <span className="text-xl font-normal opacity-80">pts</span></p>
                <p className="text-xs text-indigo-200 mt-2 font-medium">Gebaseerd op sales & behaalde KPI's</p>
              </div>
              <div className="hidden sm:block">
                <Star size={64} className="text-[#FDCB2C] opacity-50 drop-shadow-2xl" fill="#FDCB2C" />
              </div>
            </div>

            {/* Marge Sectie */}
            <div className="bg-white/10 p-5 rounded-xl border border-white/5 flex flex-col justify-center">
              <p className="text-gray-400 text-sm mb-1 font-medium">Jouw behaalde marge</p>
              <p className="text-3xl font-black text-white">€18.200</p>
              <div className="mt-2 text-xs text-gray-500">Drempel: €15.000</div>
            </div>

            {/* Bonus Schatting Sectie */}
            <div className="bg-gradient-to-br from-[#FDCB2C] to-yellow-600 p-5 rounded-xl text-black shadow-inner flex flex-col justify-center relative overflow-hidden">
              <p className="text-sm font-bold opacity-80 mb-1">Huidige Bonusschatting</p>
              <p className="text-4xl font-black">€150,- <span className="text-base font-bold opacity-80">bruto</span></p>
              <p className="text-xs font-bold mt-2 opacity-80 bg-white/20 inline-block px-2 py-1 rounded w-max">(3 x €50 staffel bereikt)</p>
            </div>
          </div>
        </div>

        {/* Incentives & Toppers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Cable size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">#1 Kabel Verkoper</p>
              <p className="text-xl font-black text-gray-900">Mark de Groot</p>
              <p className="text-sm text-green-600 font-bold mt-1">452 verkocht (+120 pnt)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <Tv size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">#1 Cleaner Verkoper</p>
              <p className="text-xl font-black text-gray-900">Lisa Visser</p>
              <p className="text-sm text-green-600 font-bold mt-1">389 verkocht (+90 pnt)</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
              <Award size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">#1 Spons Verkoper (HaloTec)</p>
              <p className="text-xl font-black text-gray-900">Kevin Bakker</p>
              <p className="text-sm text-green-600 font-bold mt-1">842 verkocht (+250 pnt)</p>
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
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Marge % (Gem. Maand)</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Punten (Eindejaarsbonus)</th>
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
                        <div className={`text-xs font-bold px-2 py-1 rounded inline-block mb-1 w-20 text-center ${getMarginColor(person.tvMarginPct)}`}>
                          TV: {person.tvMarginPct}%
                        </div>
                        <br/>
                        <div className={`text-xs font-bold px-2 py-1 rounded inline-block w-20 text-center ${getMarginColor(person.bbqMarginPct)}`}>
                          BBQ: {person.bbqMarginPct}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-black text-blue-600 text-lg">
                          <Award size={16} /> {person.points?.toLocaleString('nl-NL')} pnt
                        </div>
                        <div className="text-xs text-gray-500 font-medium mt-1">
                          Schatting: €{Math.floor(person.points / 100) * 10},- bonus
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
                              <div className="flex gap-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleExportSpecific('all'); }}
                                  className="text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                                >
                                  <Download size={12} /> Exporteer Totaal
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleExportSpecific('top3'); }}
                                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                                >
                                  <Download size={12} /> Exporteer Top 3
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleExportSpecific('single', person); }}
                                  className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                                >
                                  <Download size={12} /> Exporteer {person.name.split(' ')[0]}
                                </button>
                                <button 
                                  onClick={(e) => handleSendToWhatsapp(person, e)}
                                  className={`text-xs font-bold text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${whatsappSuccessId === person.id ? 'bg-green-600' : 'bg-[#25D366] hover:bg-green-600'}`}
                                >
                                  {whatsappSuccessId === person.id ? <CheckCircle size={12} /> : <Smartphone size={12} />}
                                  App Verkoper
                                </button>
                                <button 
                                  onClick={(e) => handleSendToTrainer(person, e)}
                                  className={`text-xs font-bold text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${trainerSuccessId === person.id ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                  {trainerSuccessId === person.id ? <CheckCircle size={12} /> : <Users size={12} />}
                                  Stuur naar Wendy & Johan
                                </button>
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
