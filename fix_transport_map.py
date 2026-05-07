import re

with open('src/app/components/Transport.tsx', 'r') as f:
    content = f.read()

# Make sure ZoomIn and ZoomOut are imported
lucide_import_search = "import { Package, Truck, Calendar, ArrowRight, UserCircle, Printer, Download, Plus, Search, Filter, Phone, Mail, FileText, CheckCircle, Navigation, MapPin, Clock, ArrowLeft, Eye, MessageSquare, ExternalLink, Map, Activity, CreditCard, ChevronDown } from 'lucide-react';"
lucide_import_replace = "import { Package, Truck, Calendar, ArrowRight, UserCircle, Printer, Download, Plus, Search, Filter, Phone, Mail, FileText, CheckCircle, Navigation, MapPin, Clock, ArrowLeft, Eye, MessageSquare, ExternalLink, Map, Activity, CreditCard, ChevronDown, ZoomIn, ZoomOut } from 'lucide-react';"
content = content.replace(lucide_import_search, lucide_import_replace)

# We need to add state for mapZoom in TransportDashboard
state_search = "const [searchQuery, setSearchQuery] = useState('');"
state_replace = "const [searchQuery, setSearchQuery] = useState('');\n  const [mapZoom, setMapZoom] = useState(1);"
content = content.replace(state_search, state_replace)

# Add STORES map
stores_map = """
const MAP_STORES = [
  { name: 'Alkmaar', x: 40, y: 35 },
  { name: 'Amsterdam', x: 44, y: 42 },
  { name: 'Apeldoorn', x: 65, y: 48 },
  { name: 'Bergen op Zoom', x: 30, y: 72 },
  { name: 'Breda', x: 42, y: 68 },
  { name: 'Cruquius', x: 40, y: 44 },
  { name: 'Den Bosch', x: 53, y: 65 },
  { name: 'Doetinchem', x: 78, y: 56 },
  { name: 'Duiven', x: 68, y: 57 },
  { name: 'Eindhoven', x: 56, y: 74 },
  { name: 'Groningen', x: 80, y: 15 },
  { name: 'Leeuwarden', x: 58, y: 18 },
  { name: 'Nijmegen', x: 65, y: 62 },
  { name: 'Naarden', x: 50, y: 43 },
  { name: 'Rotterdam', x: 35, y: 58 },
  { name: 'Tilburg', x: 48, y: 70 },
  { name: 'Utrecht', x: 50, y: 51 },
  { name: 'Zoeterwoude', x: 38, y: 49 }
];
"""
content = content.replace("export function TransportDashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {", stores_map + "\nexport function TransportDashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {")

# Modify LIVE TRACKER HEEL NEDERLAND
old_map = """            {/* LIVE TRACKER HEEL NEDERLAND */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-black text-gray-800 flex items-center gap-2">
                  <Map className="text-blue-600" /> Live GPS Tracking Heel Nederland
                </h3>
                <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> LIVE
                </span>
              </div>
              <div className="h-64 sm:h-80 bg-gray-200 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
                <div className="absolute inset-0 bg-blue-50/50"></div>
                {MOCK_VANS.map((van, idx) => (
                  <div key={van.id} className="absolute flex flex-col items-center transition-all duration-1000 ease-in-out" style={{ 
                    left: `${25 + idx * 25}%`, 
                    top: `${30 + idx * 15}%` 
                  }}>
                    <div className="bg-[#1D6F42] text-white p-3 rounded-full shadow-xl relative group cursor-pointer hover:bg-[#FDCB2C] hover:text-black hover:scale-110 transition-transform">
                      <Truck size={20} />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                        <p className="font-black text-[#FDCB2C] mb-1">{van.id} - {van.driver}</p>
                        <p className="mb-1"><MapPin size={10} className="inline mr-1"/>{van.locatie}</p>
                        <p className="text-green-400 font-bold"><Clock size={10} className="inline mr-1"/>{van.eta}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actieve bussen op de weg</p>
                  <p className="text-2xl font-black text-[#1D6F42]">{MOCK_VANS.length}</p>
                </div>
              </div>
            </div>"""

new_map = """            {/* LIVE TRACKER HEEL NEDERLAND */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-black text-gray-800 flex items-center gap-2">
                  <Map className="text-blue-600" /> Live GPS Tracking Heel Nederland
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <button onClick={() => setMapZoom(Math.max(1, mapZoom - 0.5))} className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"><ZoomOut size={16}/></button>
                    <span className="text-xs font-bold px-2">{Math.round(mapZoom * 100)}%</span>
                    <button onClick={() => setMapZoom(Math.min(3, mapZoom + 0.5))} className="p-1.5 hover:bg-gray-100 text-gray-600 transition-colors"><ZoomIn size={16}/></button>
                  </div>
                  <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> LIVE
                  </span>
                </div>
              </div>
              <div className="h-96 sm:h-[500px] bg-[#E3F2FD] relative overflow-hidden flex items-center justify-center">
                <div 
                  className="absolute inset-0 transition-transform duration-300 origin-center" 
                  style={{ 
                    transform: `scale(${mapZoom})`,
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/e6/Netherlands_provinces_blank.svg")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* HelloTV Filialen (Stippen) */}
                  {MAP_STORES.map(store => (
                    <div 
                      key={store.name} 
                      className="absolute flex flex-col items-center group z-10"
                      style={{ left: `${store.x}%`, top: `${store.y}%` }}
                    >
                      <div className="w-3 h-3 bg-[#FDCB2C] border-2 border-black rounded-full shadow-md"></div>
                      <span className="absolute top-4 bg-white/90 px-1 py-0.5 rounded text-[8px] font-bold text-black opacity-0 group-hover:opacity-100 shadow-sm transition-opacity whitespace-nowrap pointer-events-none">
                        {store.name}
                      </span>
                    </div>
                  ))}

                  {/* Bussen */}
                  {MOCK_VANS.map((van, idx) => (
                    <div key={van.id} className="absolute flex flex-col items-center transition-all duration-1000 ease-in-out z-20" style={{ 
                      left: `${35 + idx * 15}%`, 
                      top: `${45 + idx * 8}%` 
                    }}>
                      <div className="bg-[#1D6F42] text-white p-2 rounded-full shadow-xl relative group cursor-pointer hover:bg-[#FDCB2C] hover:text-black hover:scale-110 transition-transform">
                        <Truck size={14} />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-gray-900 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-2xl">
                          <p className="font-black text-[#FDCB2C] mb-1 text-xs">{van.id}</p>
                          <p className="mb-1"><MapPin size={10} className="inline mr-1"/>{van.locatie}</p>
                          <p className="text-green-400 font-bold"><Clock size={10} className="inline mr-1"/>{van.eta}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-30">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actieve bussen</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#1D6F42]">{MOCK_VANS.length}</span>
                    <span className="text-xs text-gray-400">/ 18 Filialen</span>
                  </div>
                </div>
              </div>
            </div>"""

content = content.replace(old_map, new_map)

with open('src/app/components/Transport.tsx', 'w') as f:
    f.write(content)

