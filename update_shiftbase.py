import re

with open('src/app/components/Shiftbase.tsx', 'r') as f:
    content = f.read()

# Add Maximize2/Minimize2 to imports if not there
if "Maximize2" not in content:
    content = content.replace("import { Home, Calendar, Clock, User, ChevronRight, CheckCircle, Smartphone, AlertTriangle } from 'lucide-react';", 
                              "import { Home, Calendar, Clock, User, ChevronRight, CheckCircle, Smartphone, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';")

# Replace Shiftbase function
old_func = """export function Shiftbase() {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-12 bg-gray-100 min-h-[100dvh] pt-8 pb-24 overflow-x-auto w-full">
      <div>
        <h3 className="text-center font-bold text-gray-500 mb-4">MOBIEL WEERGAVE</h3>
        <ShiftbaseApp isTablet={false} />
      </div>
      <div className="hidden md:block">
        <h3 className="text-center font-bold text-gray-500 mb-4">TABLET WEERGAVE (ZAAK)</h3>
        <ShiftbaseApp isTablet={true} />
      </div>
    </div>
  );
}"""

new_func = """export function Shiftbase() {
  const [selectedDevice, setSelectedDevice] = useState<'iphone' | 'ipad' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!selectedDevice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
        <h2 className="text-2xl font-black text-gray-900 mb-8">Kies je weergave voor HelloBase Uren</h2>
        <div className="flex gap-6">
          <button 
            onClick={() => setSelectedDevice('iphone')}
            className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <Smartphone size={48} className="text-gray-400 group-hover:text-blue-500 mb-4" />
            <span className="font-bold text-lg text-gray-800">iPhone 17 Pro</span>
            <span className="text-sm text-gray-500">Persoonlijk Rooster</span>
          </button>
          
          <button 
            onClick={() => setSelectedDevice('ipad')}
            className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-[#FDCB2C] hover:shadow-md transition-all group"
          >
            <div className="w-16 h-12 border-4 border-gray-400 group-hover:border-[#FDCB2C] rounded-lg mb-4 flex items-center justify-center relative">
               <div className="w-1 h-1 bg-gray-400 group-hover:bg-[#FDCB2C] rounded-full absolute left-1"></div>
            </div>
            <span className="font-bold text-lg text-gray-800">iPad Pro M5</span>
            <span className="text-sm text-gray-500">Filiaal Kiosk</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center bg-gray-100 ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto pt-12 pb-12' : 'min-h-[100dvh] pt-8 pb-24 overflow-x-auto w-full'}`}>
      <div className="flex items-center gap-4 mb-6 w-full max-w-4xl px-4 justify-between">
        <button 
          onClick={() => { setSelectedDevice(null); setIsFullscreen(false); }}
          className="px-4 py-2 bg-white text-gray-700 font-bold rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          ← Terug naar selectie
        </button>
        
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-gray-500 hidden sm:block">
            {selectedDevice === 'ipad' ? 'TABLET WEERGAVE (ZAAK)' : 'MOBIEL WEERGAVE'}
          </h3>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-white text-blue-600 rounded-lg shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors"
            title={isFullscreen ? "Verklein" : "Vergroot"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ${isFullscreen ? 'scale-110 origin-top' : ''}`}>
        <ShiftbaseApp isTablet={selectedDevice === 'ipad'} />
      </div>
    </div>
  );
}"""

content = content.replace(old_func, new_func)

with open('src/app/components/Shiftbase.tsx', 'w') as f:
    f.write(content)

