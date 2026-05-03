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
import { HelloTVLogo } from './components/ui/HelloTVLogo';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers';

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
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'quotes', label: 'Offertes', icon: FileText },
    { id: 'showcase', label: 'Case Study', icon: Layers },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Package },
    { id: 'trainers', label: 'Sales Trainers', icon: Users },
    { id: 'shiftbase', label: 'Shiftbase (Uren)', icon: Clock },
    { id: 'hr', label: 'HR & Reiskosten', icon: Users },
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
              <div className="flex items-center gap-2 mb-2">
                <UserCircle size={14} className="text-[#FDCB2C]" />
                <div className="text-[10px] text-gray-300 leading-tight">
                  <span className="font-bold text-white">Beheerder</span><br/>
                  admin@hellotv.nl
                </div>
              </div>
              <div className="text-xs text-gray-400 border-t border-gray-700 pt-2">Management System</div>
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
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50 relative w-full">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'orders' && <Orders />}
        {currentView === 'showcase' && <Showcase />}
        {currentView === 'crm' && <CRM />}
        {currentView === 'quotes' && <Quotes />}
        {currentView === 'sales' && <SalesTracker />}
        {currentView === 'trainers' && <TrainersPortal />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'shiftbase' && <Shiftbase />}
        {currentView === 'hr' && <HR />}
      </div>
    </div>
  );
}