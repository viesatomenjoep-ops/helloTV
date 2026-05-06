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
  Store,
  MessageSquare
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
import { LiveChatPortal } from './components/LiveChatPortal';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'maick' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers' | 'transport' | 'media' | 'vendit' | 'reviews' | 'website' | 'reparatie' | 'magiclinks' | 'storeportal' | 'livechat';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
    { id: 'livechat', label: 'LiveChat & Sales', icon: MessageSquare },
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
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id as View);
    setMobileMenuOpen(false); // sluit menu op mobiel na klikken
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <HelloTVLogo className="h-16 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welkom Terug</h2>
          <p className="text-gray-500 mb-8">Log in om toegang te krijgen tot het portaal.</p>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors shadow-sm"
          >
            Inloggen met HelloTV Account
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="flex h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-white font-sans">
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white text-gray-900 rounded-lg border border-gray-200 shadow-sm"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white text-gray-900 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl border-r border-gray-200
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="flex flex-col items-center justify-center py-6 h-44 border-b border-gray-100 bg-white px-6 shrink-0 text-center w-full">
          <HelloTVLogo className="h-24 w-auto object-contain mx-auto block" />
          <span className="text-gray-500 font-black text-sm uppercase tracking-widest mt-3 block w-full text-center">Master Management</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-bold ${
                currentView === item.id 
                  ? 'bg-[#FDCB2C] text-black shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors duration-200 ${
                  currentView === item.id ? 'text-black' : 'text-gray-400 group-hover:text-black'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex flex-col gap-3">
          <div 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#FDCB2C] flex items-center justify-center text-black font-bold">
              TM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">admin11@hellotv.nl</p>
              <p className="text-xs text-gray-500 truncate">Beheerder</p>
            </div>
            <LogOut size={18} className="text-gray-400" />
          </div>
          <button 
            onClick={() => {
              setIsAuthenticated(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors border border-red-200 text-sm font-bold"
          >
            Uitloggen
          </button>
        </div>
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
        {currentView === 'livechat' && <LiveChatPortal />}
        {currentView === 'vendit' && <Vendit />}
      </div>
    </div>
  );
}