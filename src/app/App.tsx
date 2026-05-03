import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  Menu, 
  X, 
  TrendingUp, 
  FileText, 
  Clock,
  Layers,
  UserCircle
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
import { ProductDashboard } from './components/ProductDashboard';
import { HelloTVWebsite } from './components/HelloTVWebsite';
import { HelloTVLogo } from './components/ui/HelloTVLogo';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers' | 'transport' | 'media' | 'vendit' | 'reviews' | 'products' | 'website';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize data on mount
  React.useEffect(() => {
    initDemoData();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'website', label: 'HelloTV.nl (Live)', icon: Search },
    { id: 'reviews', label: 'Google Maps Reviews', icon: Star },
    { id: 'products', label: 'Producten & Marges', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'quotes', label: 'Offertes', icon: FileText },
    { id: 'showcase', label: 'Visie & Strategie', icon: Layers },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Package },
    { id: 'transport', label: 'Transport (Bessy)', icon: Clock },
    { id: 'media', label: 'Media & Cloudinary', icon: Layers },
    { id: 'trainers', label: 'Sales Trainers', icon: Users },
    { id: 'shiftbase', label: 'Hello Base (Uren)', icon: Clock },
    { id: 'hr', label: 'HR & Reiskosten', icon: Users },
    { id: 'vendit', label: 'Vendit API Koppeling', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id as View);
    setMobileMenuOpen(false); // sluit menu op mobiel na klikken
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between shadow-md z-40">
        <HelloTVLogo className="h-8" theme="dark" />
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-gray-800 rounded-lg">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Slide-in) */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${sidebarOpen ? 'w-64' : 'w-20 md:w-20 w-64'}`}
      >
        <div className="flex items-center justify-between p-6">
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="flex-1">
              <HelloTVLogo className="h-10 mb-2" theme="dark" />
              <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">OS 2026</div>
            </div>
          )}
          
          {/* Hide collapse button on mobile, it's always full width there */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:block p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-4 pb-20 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                currentView === item.id
                  ? 'bg-[#FDCB2C] text-gray-900 border-r-4 border-white font-bold'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={currentView === item.id ? 'text-gray-900' : ''} />
              {(sidebarOpen || mobileMenuOpen) && <span>{item.label}</span>}
            </button>
          ))}
          
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="mt-8 mx-6 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-gray-700">
                <UserCircle size={24} className="text-[#FDCB2C]" />
                <div className="text-xs leading-tight">
                  <span className="font-bold text-white">Beheerder</span><br/>
                  <span className="text-gray-400">admin@heleutievier.nl</span>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-white rounded-tl-2xl shadow-xl border-t border-l border-gray-200">
        {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
        {currentView === 'website' && <HelloTVWebsite />}
        {currentView === 'reviews' && <GoogleReviews />}
        {currentView === 'products' && <ProductDashboard />}
        {currentView === 'orders' && <Orders />}
        {currentView === 'showcase' && <Showcase />}
        {currentView === 'crm' && <CRM />}
        {currentView === 'quotes' && <Quotes />}
        {currentView === 'sales' && <SalesTracker />}
        {currentView === 'trainers' && <TrainersPortal />}
        { currentView === 'inventory' && <Inventory /> }
        { currentView === 'shiftbase' && <Shiftbase /> }
        { currentView === 'hr' && <HR /> }
        { currentView === 'transport' && <Transport /> }
        { currentView === 'media' && <MediaPortal /> }
        { currentView === 'vendit' && <Vendit /> }
      </div>
    </div>
  );
}