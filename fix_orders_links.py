import re

with open('src/app/components/Orders.tsx', 'r') as f:
    content = f.read()

# Make sure ExternalLink is imported
if "ExternalLink" not in content[:300]:
    import_re = re.search(r"import \{ .* \} from 'lucide-react';", content).group(0)
    content = content.replace(import_re, import_re.replace("}", ", ExternalLink }"))

old_tabs = """        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('overzicht')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'overzicht' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <List size={18} /> Order Overzicht
          </button>
          <button
            onClick={() => setActiveTab('upsell')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'upsell' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <TrendingUp size={18} /> Directe Upsell Order
          </button>
        </div>"""

new_tabs = """        {/* Tab Switcher & Legacy Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-2 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overzicht')}
              className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
                activeTab === 'overzicht' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List size={18} /> Order Overzicht
            </button>
            <button
              onClick={() => setActiveTab('upsell')}
              className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
                activeTab === 'upsell' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              <TrendingUp size={18} /> Directe Upsell Order
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pb-1">
            <button 
              onClick={() => alert("Navigeren naar: Oude Backend Systeem")}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg border border-gray-200"
            >
              <ExternalLink size={14} /> Ga naar oude backend systeem
            </button>
            <button 
              onClick={() => alert("Navigeren naar: Backend Archief (2010)")}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg border border-gray-200"
            >
              <ExternalLink size={14} /> Ga naar backend systeem met archief (tot 2010)
            </button>
          </div>
        </div>"""

content = content.replace(old_tabs, new_tabs)

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(content)

