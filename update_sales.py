import re

with open('src/app/components/SalesTracker.tsx', 'r') as f:
    content = f.read()

# Add ticking state inside SalesTracker
state_hooks = """  const [tvMode, setTvMode] = useState(false);

  // Live Totals Ticker
  const [liveTotals, setLiveTotals] = useState({
    totalRevenue: 7444950,
    totalSales: 6052,
    totalTvs: 3600,
    tvMargin: 899550,
    totalAccessories: 9057,
    accMargin: 316995
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.1) {
        setLiveTotals(prev => ({
          totalRevenue: prev.totalRevenue + (Math.floor(Math.random() * 1500) + 100),
          totalSales: prev.totalSales + (Math.random() > 0.6 ? 1 : 0),
          totalTvs: prev.totalTvs + (Math.random() > 0.7 ? 1 : 0),
          tvMargin: prev.tvMargin + (Math.floor(Math.random() * 200)),
          totalAccessories: prev.totalAccessories + (Math.random() > 0.5 ? 1 : 0),
          accMargin: prev.accMargin + (Math.floor(Math.random() * 50)),
        }));
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);
"""

content = re.sub(r'  const \[tvMode, setTvMode\] = useState\(false\);\s*', state_hooks, content, count=1)

# Modify the Global Stats to use liveTotals when 'Alle Filialen' is selected
global_stats_replacement = """        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">LIVE</div>
            <div className="flex items-center gap-3 mb-3">
              <Euro size={24} />
              <span className="text-sm opacity-90">Totale Omzet ({selectedStore})</span>
            </div>
            <div className="text-3xl font-bold">
              €{(selectedStore === 'Alle Filialen' ? liveTotals.totalRevenue : totalRevenue).toLocaleString('nl-NL', { minimumFractionDigits: 0 })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">LIVE</div>
            <div className="flex items-center gap-3 mb-3">
              <Target size={24} />
              <span className="text-sm opacity-90">Totaal Verkopen</span>
            </div>
            <div className="text-3xl font-bold">{selectedStore === 'Alle Filialen' ? liveTotals.totalSales : totalSales}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">LIVE</div>
            <div className="flex items-center gap-3 mb-3">
              <Tv size={24} />
              <span className="text-sm opacity-90">TV's Verkocht</span>
            </div>
            <div className="text-3xl font-bold">{selectedStore === 'Alle Filialen' ? liveTotals.totalTvs : totalTvs}</div>
            <div className="text-sm mt-1 font-semibold text-purple-100">+ €{(selectedStore === 'Alle Filialen' ? liveTotals.tvMargin : totalTvMargin).toLocaleString('nl-NL')} marge</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse">LIVE</div>
            <div className="flex items-center gap-3 mb-3">
              <Cable size={24} />
              <span className="text-sm opacity-90">Accessoires</span>
            </div>
            <div className="text-3xl font-bold">{selectedStore === 'Alle Filialen' ? liveTotals.totalAccessories : totalAccessories}</div>
            <div className="text-sm mt-1 font-semibold text-orange-100">+ €{(selectedStore === 'Alle Filialen' ? liveTotals.accMargin : totalAccMargin).toLocaleString('nl-NL')} marge</div>
          </div>
        </div>"""

content = re.sub(r'\{\/\* Global Stats \*\/.*?\{\/\* Detailed Leaderboard Table \*\/\}', global_stats_replacement + '\n\n        {/* Detailed Leaderboard Table */}', content, flags=re.DOTALL)

# Modify Table to be condensed
table_header = """              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-2 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider w-8">#</th>
                  <th className="px-2 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider">Verkoper & Filiaal</th>
                  <th className="px-2 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider">Omzet & Orders</th>
                  <th className="px-2 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider">TV's & Marges</th>
                  <th className="px-2 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider">Punten (Bonus)</th>
                  <th className="px-2 py-3 text-right text-[11px] font-black text-gray-500 uppercase tracking-wider">Verkopen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">"""

content = re.sub(r'              <thead>.*?<tbody>', table_header, content, flags=re.DOTALL)

table_row = """                    <tr
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        expandedRow === person.id ? 'bg-blue-50/30' : ''
                      } ${idx === 0 && !expandedRow ? 'bg-yellow-50/50' : ''}`}
                      onClick={() => setExpandedRow(expandedRow === person.id ? null : person.id)}
                    >
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-1">
                          {idx === 0 && <span className="text-xl">🥇</span>}
                          {idx === 1 && <span className="text-xl">🥈</span>}
                          {idx === 2 && <span className="text-xl">🥉</span>}
                          {idx > 2 && <span className="text-gray-400 font-black text-sm">{idx + 1}</span>}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-900 text-[#FDCB2C] w-8 h-8 rounded-full flex items-center justify-center font-black shadow-inner text-xs shrink-0">
                            {person.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{person.name}</div>
                            <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500"><Store size={10}/> {person.store}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="font-black text-gray-900 text-sm whitespace-nowrap">
                          €{person.totalRevenue.toLocaleString('nl-NL')}
                        </div>
                        <div className="text-[10px] font-medium text-gray-500">{person.salesCount} orders</div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-bold text-gray-800 text-xs">{person.tvSold} tv's</div>
                            <div className="text-[10px] text-green-600 font-bold whitespace-nowrap">+ €{person.tvMargin.toLocaleString('nl-NL')} marge</div>
                          </div>
                          <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-center whitespace-nowrap ${getMarginColor(person.tvMarginPct)}`}>
                            {person.tvMarginPct}%
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center gap-1 font-black text-blue-600 text-sm whitespace-nowrap">
                          <Award size={14} /> {person.points?.toLocaleString('nl-NL')} pnt
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                          €{Math.floor(person.points / 100) * 10},- bonus
                        </div>
                      </td>
                      <td className="px-2 py-2 text-right">
                        <button className="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Bekijk Verkopen">
                          {expandedRow === person.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>"""

content = re.sub(r'                    <tr.*?</tr>', table_row, content, count=1, flags=re.DOTALL)
content = re.sub(r'<td colSpan=\{8\}', '<td colSpan={6}', content)

with open('src/app/components/SalesTracker.tsx', 'w') as f:
    f.write(content)

