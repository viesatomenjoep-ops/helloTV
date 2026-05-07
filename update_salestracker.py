import re

with open('src/app/components/SalesTracker.tsx', 'r') as f:
    content = f.read()

# 1. Add the constant SELLER_BONUSES
bonuses_data = """
const SELLER_BONUSES = [
  { code: '921', naam: 'Tom', filiaal: 'Breda', punten: '4.250', marge: '18.200', bonus: 150, staffel: '3 x €50 staffel bereikt' },
  { code: '810', naam: 'Lisa', filiaal: 'Amsterdam', punten: '5.600', marge: '22.000', bonus: 250, staffel: '5 x €50 staffel bereikt' },
  { code: '750', naam: 'Daan', filiaal: 'Eindhoven', punten: '6.100', marge: '25.400', bonus: 350, staffel: '7 x €50 staffel bereikt' },
  { code: '420', naam: 'Rob', filiaal: 'Rotterdam', punten: '2.100', marge: '12.000', bonus: 0, staffel: 'Drempel niet bereikt' },
  { code: '310', naam: 'Chaima', filiaal: 'Utrecht', punten: '4.500', marge: '17.500', bonus: 150, staffel: '3 x €50 staffel bereikt' },
  { code: '922', naam: 'Kevin', filiaal: 'Breda', punten: '3.100', marge: '15.500', bonus: 50, staffel: '1 x €50 staffel bereikt' },
  { code: '811', naam: 'Sanne', filiaal: 'Amsterdam', punten: '2.900', marge: '14.500', bonus: 0, staffel: 'Drempel niet bereikt' },
  { code: '751', naam: 'Mark', filiaal: 'Eindhoven', punten: '4.800', marge: '19.800', bonus: 200, staffel: '4 x €50 staffel bereikt' },
  { code: '630', naam: 'Max', filiaal: 'Alkmaar', punten: '3.900', marge: '16.700', bonus: 100, staffel: '2 x €50 staffel bereikt' },
  { code: '540', naam: 'Bas', filiaal: 'Den Haag', punten: '5.200', marge: '21.100', bonus: 250, staffel: '5 x €50 staffel bereikt' }
];
"""

content = content.replace("const getMarginColor =", bonuses_data + "\nconst getMarginColor =")

# 2. Add state inside SalesTracker
state_insert = """  const [bonusSearch, setBonusSearch] = useState('');
  const [bonusFiliaal, setBonusFiliaal] = useState('Breda');
  
  const activeBonusSeller = useMemo(() => {
    let sellers = SELLER_BONUSES;
    if (bonusFiliaal && bonusFiliaal !== 'Alle Filialen') {
      sellers = sellers.filter(s => s.filiaal === bonusFiliaal);
    }
    if (bonusSearch) {
      sellers = sellers.filter(s => s.naam.toLowerCase().includes(bonusSearch.toLowerCase()) || s.code === bonusSearch);
    }
    return sellers[0] || SELLER_BONUSES[0]; // fallback to Tom if none found
  }, [bonusSearch, bonusFiliaal]);
"""

content = content.replace("const [tvMode, setTvMode] = useState(false);", "const [tvMode, setTvMode] = useState(false);\n" + state_insert)


# 3. Replace the Widget JSX
old_widget = """        {/* Live Bonus & HelloTV-Punten Widget */}
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
        </div>"""

new_widget = """        {/* Live Bonus & HelloTV-Punten Widget */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-white border-l-4 border-[#FDCB2C]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="text-[#FDCB2C]" /> Actueel Bonus & Punten Overzicht
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <select 
                value={bonusFiliaal}
                onChange={e => setBonusFiliaal(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none w-full sm:w-auto"
              >
                <option value="Alle Filialen">Alle Filialen</option>
                <option value="Alkmaar">Alkmaar</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Breda">Breda</option>
                <option value="Den Haag">Den Haag</option>
                <option value="Eindhoven">Eindhoven</option>
                <option value="Rotterdam">Rotterdam</option>
                <option value="Utrecht">Utrecht</option>
              </select>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Zoek naam of code (bijv. 921)"
                  value={bonusSearch}
                  onChange={e => setBonusSearch(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#FDCB2C]"
                />
              </div>
              <div className="text-xs px-3 py-1 bg-[#FDCB2C] text-black font-bold rounded-full animate-pulse whitespace-nowrap">
                LIVE
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Punten Sectie (Boven/Voorop gesteld) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-800 p-5 rounded-xl border border-indigo-500/50 shadow-inner flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-1">Eindejaars Punten: {activeBonusSeller.naam} ({activeBonusSeller.filiaal})</p>
                <p className="text-5xl font-black text-white drop-shadow-md">{activeBonusSeller.punten} <span className="text-xl font-normal opacity-80">pts</span></p>
                <p className="text-xs text-indigo-200 mt-2 font-medium">Gebaseerd op sales & behaalde KPI's</p>
              </div>
              <div className="hidden sm:block">
                <Star size={64} className="text-[#FDCB2C] opacity-50 drop-shadow-2xl" fill="#FDCB2C" />
              </div>
            </div>

            {/* Marge Sectie */}
            <div className="bg-white/10 p-5 rounded-xl border border-white/5 flex flex-col justify-center">
              <p className="text-gray-400 text-sm mb-1 font-medium">Behaalde marge</p>
              <p className="text-3xl font-black text-white">€{activeBonusSeller.marge}</p>
              <div className="mt-2 text-xs text-gray-500">Drempel: €15.000</div>
            </div>

            {/* Bonus Schatting Sectie */}
            <div className="bg-gradient-to-br from-[#FDCB2C] to-yellow-600 p-5 rounded-xl text-black shadow-inner flex flex-col justify-center relative overflow-hidden">
              <p className="text-sm font-bold opacity-80 mb-1">Huidige Bonusschatting</p>
              <p className="text-4xl font-black">€{activeBonusSeller.bonus},- <span className="text-base font-bold opacity-80">bruto</span></p>
              <p className="text-xs font-bold mt-2 opacity-80 bg-white/20 inline-block px-2 py-1 rounded w-max">({activeBonusSeller.staffel})</p>
            </div>
          </div>
        </div>"""

content = content.replace(old_widget, new_widget)

with open('src/app/components/SalesTracker.tsx', 'w') as f:
    f.write(content)

