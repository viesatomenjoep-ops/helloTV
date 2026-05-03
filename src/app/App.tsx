import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, TrendingUp, Package, FileText, ShoppingCart, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { CRM } from './components/CRM';
import { SalesTracker } from './components/SalesTracker';
import { Inventory } from './components/Inventory';
import { Quotes } from './components/Quotes';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    initDemoData();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'quotes', label: 'Offertes', icon: FileText },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'inventory', label: 'Voorraad', icon: Package },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          {sidebarOpen && (
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HelloTV
              </div>
              <div className="text-xs text-gray-400 mt-1">Management System</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-l-4 border-white'
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
              <div className="text-sm font-semibold mb-1">Powered by</div>
              <div className="text-xs text-gray-200">Supabase + React + Tailwind</div>
              <div className="mt-2 text-xs opacity-75">WhatsApp Integration Active</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'crm' && <CRM />}
        {currentView === 'quotes' && <Quotes />}
        {currentView === 'sales' && <SalesTracker />}
        {currentView === 'inventory' && <Inventory />}
      </div>
    </div>
  );
}