import React from "react";

import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, TrendingUp, Package, FileText, ShoppingCart, Menu, X, Layers, LogOut, UserCircle, RefreshCw } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { CRM } from './components/CRM';
import { SalesTracker } from './components/SalesTracker';
import { Inventory } from './components/Inventory';
import { Quotes } from './components/Quotes';
import { Orders } from './components/Orders';
import { Showcase } from './components/Showcase';
import { HR } from './components/HR';
import { HelloTVLogo } from './components/ui/HelloTVLogo';
import { initDemoData } from '../utils/initDemoData';

type View = 'dashboard' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@hellotv.nl' && password === '1111') {
      setIsAuthenticated(true);
      localStorage.setItem('hellotv_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Onjuiste inloggegevens. Probeer opnieuw.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('hellotv_auth') === 'true') {
      setIsAuthenticated(true);
    }
    initDemoData();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative brand background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative z-10">
          <div className="flex justify-center mb-8">
            <HelloTVLogo className="h-12" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-2">Welkom bij HelloTV</h1>
            <p className="text-gray-500 font-medium">Log in op het HelloTV Backend Systeem</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-mailadres</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="naam@hellotv.nl"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] focus:bg-white outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Wachtwoord</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCB2C] focus:bg-white outline-none transition-all"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100">
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-[#FDCB2C] text-black font-black text-lg rounded-xl shadow-md hover:bg-yellow-400 transition-colors"
            >
              Inloggen
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">© 2026 Viesa Automations x HelloTV</p>
          </div>
        </div>
      </div>
    );
  }



  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'showcase', label: 'Case Study', icon: Layers },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'quotes', label: 'Offertes', icon: FileText },
    { id: 'sales', label: 'Sales Tracker', icon: TrendingUp },
    { id: 'inventory', label: 'Voorraad', icon: Package },
    { id: 'hr', label: 'HR & Reiskosten', icon: Users },
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
                  ? 'bg-[#1A1A1A] border-l-4 border-[#FDCB2C] text-[#FDCB2C]'
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

      </div>

      <div className="flex-1 overflow-y-auto">
        {currentView === 'dashboard' && <Dashboard onNavigate={(view) => setCurrentView(view as View)} />}
        {currentView === 'orders' && <Orders />}
        {currentView === 'showcase' && <Showcase />}
        {currentView === 'crm' && <CRM />}
        {currentView === 'quotes' && <Quotes />}
        {currentView === 'sales' && <SalesTracker />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'hr' && <HR />}
      </div>
    </div>
  );
}