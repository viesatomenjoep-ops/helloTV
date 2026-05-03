import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Box, 
  ShoppingCart, 
  Settings, 
  Menu, 
  X, 
  TrendingUp, 
  FileSignature, 
  CalendarClock,
  Briefcase,
  UserCircle,
  Search,
  Star,
  Link as LinkIcon,
  Wrench,
  Truck,
  HeartPulse,
  GraduationCap,
  Film,
  Building2,
  ShieldAlert
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { CRM } from './components/CRM';
import { Inventory } from './components/Inventory';
import { Quotes } from './components/Quotes';
import { Orders } from './components/Orders';
import { SalesTracker } from './components/SalesTracker';
import { Showcase } from './components/Showcase';
import { HR } from './components/HR';
import { Shiftbase } from './components/Shiftbase';
import { TrainersPortal } from './components/TrainersPortal';
import { Transport } from './components/Transport';
import { MediaPortal } from './components/MediaPortal';
import { Vendit } from './components/Vendit';
import { GoogleReviews } from './components/GoogleReviews';
import { HelloTVWebsite } from './components/HelloTVWebsite';
import { Reparatie } from './components/Reparatie';
import { MagicLinks } from './components/MagicLinks';
import { HelloTVLogo } from './components/ui/HelloTVLogo';
import { MaickPortal } from './components/MaickPortal';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'maick' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers' | 'transport' | 'media' | 'vendit' | 'reviews' | 'website' | 'reparatie' | 'magiclinks';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    initDemoData();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'maick', label: 'MAICK Portaal (Admin)', icon: ShieldAlert },
    { id: 'website', label: 'HelloTV.nl (Live)', icon: Search },
    { id: 'reviews', label: 'Google Maps Reviews', icon: Star },
    { id: 'orders', label: 'Orders & Upsell', icon: ShoppingCart },
    { id: 'quotes', label: 'Offertes', icon: FileSignature },
    { id: 'showcase', label: 'Visie & Strategie', icon: Building2 },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Box },
    { id: 'transport', label: 'Transport (Bessy)', icon: Truck },
    { id: 'reparatie', label: 'Reparatie & Service', icon: Wrench },
    { id: 'magiclinks', label: 'AI & Magic Links', icon: LinkIcon },
    { id: 'media', label: 'Media Portaal', icon: Film },
    { id: 'trainers', label: 'Sales Trainers', icon: GraduationCap },
    { id: 'shiftbase', label: 'Hello Base (Uren)', icon: CalendarClock },
    { id: 'hr', label: 'HR & Reiskosten', icon: HeartPulse },
    { id: 'vendit', label: 'Vendit API Koppeling', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id as View);
    setMobileMenuOpen(false); // sluit menu op mobiel na klikken
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] font-sans">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-300 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="flex items-center justify-center h-24 border-b border-gray-800 bg-gray-950 px-6 shrink-0">
          <HelloTVLogo className="h-10 w-auto" theme="dark" />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                currentView === item.id 
                  ? 'bg-gradient-to-r from-[#FDCB2C]/20 to-transparent text-[#FDCB2C] shadow-lg border-l-4 border-[#FDCB2C]' 
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  currentView === item.id ? 'text-[#FDCB2C]' : 'text-gray-500 group-hover:text-white'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <nav className="border-t border-gray-800 p-4 bg-gray-950 shrink-0">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <UserCircle size={24} className="text-[#FDCB2C]" />
              <div className="text-xs leading-tight">
                <span className="font-bold text-white">Beheerder</span><br/>
                <span className="text-gray-400">admin@heleutievier.nl</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-white rounded-tl-2xl shadow-xl border-t border-l border-gray-200">
        {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
        {currentView === 'maick' && <MaickPortal />}
        {currentView === 'website' && <HelloTVWebsite />}
        {currentView === 'reviews' && <GoogleReviews />}
        {currentView === 'orders' && <Orders />}
        {currentView === 'showcase' && <Showcase />}
        {currentView === 'crm' && <CRM />}
        {currentView === 'quotes' && <Quotes />}
        {currentView === 'sales' && <SalesTracker />}
        {currentView === 'trainers' && <TrainersPortal />}
        { currentView === 'inventory' && <Inventory /> }
        { currentView === 'shiftbase' && <Shiftbase /> }
        {currentView === 'hr' && <HR />}
        {currentView === 'transport' && <Transport />}
        {currentView === 'reparatie' && <Reparatie />}
        {currentView === 'magiclinks' && <MagicLinks />}
        {currentView === 'media' && <MediaPortal />}
        { currentView === 'vendit' && <Vendit /> }
      </div>
    </div>
  );
}