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
  ShieldAlert,
  LogOut,
  Store
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
import { StorePortal } from './components/StorePortal';
import { HelloTVWebsite } from './components/HelloTVWebsite';
import { Reparatie } from './components/Reparatie';
import { MagicLinks } from './components/MagicLinks';
import { HelloTVLogo } from './components/ui/HelloTVLogo';
import { MaickPortal } from './components/MaickPortal';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'maick' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers' | 'transport' | 'media' | 'vendit' | 'reviews' | 'website' | 'reparatie' | 'magiclinks' | 'storeportal';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    initDemoData();
  }, []);

  const menuItems = [
    { id: 'maick', label: 'Maick Portal', icon: ShieldAlert },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'storeportal', label: '18 Filialen (Winkels)', icon: Store },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'trainers', label: 'Sales Trainers', icon: GraduationCap },
    { id: 'orders', label: 'Orders & Upsell', icon: ShoppingCart },
    { id: 'quotes', label: 'Offertes', icon: FileSignature },
    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Box },
    { id: 'transport', label: 'Transport (Hessey)', icon: Truck },
    { id: 'reparatie', label: 'Reparatie & Service', icon: Wrench },
    { id: 'hr', label: 'HR & Reiskosten', icon: HeartPulse },
    { id: 'shiftbase', label: 'Hello Base (Uren)', icon: CalendarClock },
    { id: 'media', label: 'Media Portaal', icon: Film },
    { id: 'magiclinks', label: 'AI & Magic Links', icon: LinkIcon },
    { id: 'reviews', label: 'Google Maps Reviews', icon: Star },
    { id: 'showcase', label: 'Visie & Strategie', icon: Building2 },
    { id: 'vendit', label: 'Vendit API Koppeling', icon: Settings },
    { id: 'website', label: 'HelloTV.nl (Live)', icon: Search },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id as View);
    setMobileMenuOpen(false); // sluit menu op mobiel na klikken
  };

  return (
    <div className="flex h-[100dvh] w-full max-w-[100vw] overflow-hidden bg-[#F5F5F5] font-sans">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 text-gray-900 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl border-r border-gray-200
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="flex flex-col items-center justify-center py-6 h-44 border-b border-gray-200 bg-white px-6 shrink-0 text-center w-full">
          <HelloTVLogo className="h-24 w-auto object-contain mx-auto block" />
          <span className="text-black font-black text-sm uppercase tracking-widest mt-3 opacity-90 block w-full text-center">Master Management</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                currentView === item.id 
                  ? 'bg-gradient-to-r from-[#FDCB2C]/20 to-transparent text-[#FDCB2C] shadow-sm border-l-4 border-[#FDCB2C]' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#FDCB2C]'
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  currentView === item.id ? 'text-[#FDCB2C]' : 'text-gray-400 group-hover:text-[#FDCB2C]'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <nav className="border-t border-gray-200 p-4 bg-white shrink-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <UserCircle size={24} className="text-gray-400 group-hover:text-[#FDCB2C]" />
                <div className="text-xs leading-tight">
                  <span className="font-bold text-gray-900 group-hover:text-[#FDCB2C]">Beheerder</span><br/>
                  <span className="text-gray-500">admin@heleutievier.nl</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                alert('Je bent succesvol uitgelogd.');
                window.location.reload();
              }}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors border border-red-200 text-sm font-bold"
            >
              <LogOut size={16} /> Uitloggen
            </button>
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
        {currentView === 'storeportal' && <StorePortal />}
        {currentView === 'reparatie' && <Reparatie />}
        {currentView === 'magiclinks' && <MagicLinks />}
        {currentView === 'media' && <MediaPortal />}
        { currentView === 'vendit' && <Vendit /> }
      </div>
    </div>
  );
}