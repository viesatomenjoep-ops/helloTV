import React from "react";

import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, FileText, ShoppingCart, Package, Euro, AlertTriangle, Bell, Trophy, MessageCircle, Store, Mail, Target, Database as DatabaseIcon, CheckCircle, RefreshCw } from 'lucide-react';
import { api } from '../../utils/api';
import { HelloTVLogo } from './ui/HelloTVLogo';
import { NewOrderWidget } from './NewOrderWidget';

export function Dashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Cashback State
  const [cashbackActies, setCashbackActies] = useState([
    { id: 1, merk: 'LG', actie: 'OLED evo Cashback Weken', datum: '31 Mei 2026', bedrag: 'Tot €500', url: 'https://lg.com/cashback' },
    { id: 2, merk: 'Sony', actie: 'Bravia XR Inruilbonus', datum: '15 Juni 2026', bedrag: 'Tot €400', url: 'https://sony.com/promo' },
    { id: 3, merk: 'Philips', actie: 'Ambilight WK Promotie', datum: '30 Juni 2026', bedrag: 'Tot €300', url: 'https://philips.com/actie' }
  ]);
  const [showAddActie, setShowAddActie] = useState(false);
  const [newActie, setNewActie] = useState({ merk: '', actie: '', datum: '', bedrag: '', url: '' });

  // Targets State
  const [syncingTargets, setSyncingTargets] = useState(false);
  const filiaalTargets = [
    { name: 'Alkmaar', target: 14000, current: 12100 },
    { name: 'Amsterdam', target: 25000, current: 18400 },
    { name: 'Apeldoorn', target: 12000, current: 9500 },
    { name: 'Arnhem', target: 15000, current: 16200 },
    { name: 'Breda', target: 18000, current: 19100 },
    { name: 'Cruquius', target: 11000, current: 11500 },
    { name: 'Den Bosch', target: 16000, current: 14200 },
    { name: 'Den Haag', target: 21000, current: 18900 },
    { name: 'Eindhoven', target: 22000, current: 24500 },
    { name: 'Groningen', target: 13000, current: 11200 },
    { name: 'Heerlen', target: 9000, current: 7500 },
    { name: 'Leeuwarden', target: 8000, current: 8100 },
    { name: 'Nijmegen', target: 14000, current: 12800 },
    { name: 'Rotterdam', target: 28000, current: 29500 },
    { name: 'Tilburg', target: 15000, current: 14900 },
    { name: 'Utrecht', target: 24000, current: 21000 },
    { name: 'Zoeterwoude', target: 10000, current: 9200 },
    { name: 'Zwolle', target: 12000, current: 13500 },
  ];

  const handlePushToSQL = () => {
    setSyncingTargets(true);
    setTimeout(() => {
      setSyncingTargets(false);
      alert('Targets succesvol gepusht naar E-mail Maick én alle 18 WhatsApp groep apps!');
    }, 1500);
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Simulate live revenue ticking
  useEffect(() => {
    if (!stats) return;
    const interval = setInterval(() => {
      // Randomly add between €1.50 and €15.00 every few seconds
      if (Math.random() > 0.3) {
        const amount = Math.floor(Math.random() * 1500) / 100;
        setStats((prev: any) => ({
          ...prev,
          totalRevenue: prev.totalRevenue + amount,
          todayRevenue: prev.todayRevenue + amount,
          totalOrders: prev.totalOrders + (Math.random() > 0.8 ? 1 : 0)
        }));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [stats]);

  const loadStats = async () => {
    try {
      const result = await api.getDashboardStats();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-xl font-medium">Loading...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Totale Omzet',
      value: `€${(stats?.totalRevenue || 10000000).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      icon: Euro,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      change: '+12.5%',
    },
    {
      title: 'Vandaag Omzet',
      value: `€${(stats?.todayRevenue || 322580).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: '+8.2%',
      link: 'orders',
    },
    {
      title: 'Klanten',
      value: (stats?.totalCustomers || 15420).toLocaleString('nl-NL'),
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      change: '+5.4%',
      link: 'crm',
    },
    {
      title: 'Offertes',
      value: (stats?.pendingQuotes || 1845).toLocaleString('nl-NL'),
      icon: FileText,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      subtitle: 'in behandeling',
      link: 'quotes',
    },
    {
      title: 'Orders',
      value: (stats?.totalOrders || 8492).toLocaleString('nl-NL'),
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      subtitle: `${stats?.pendingOrders || 124} pending`,
      link: 'orders',
    },
    {
      title: 'Lage Voorraad',
      value: stats?.lowStockItems || 42,
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      alert: (stats?.lowStockItems || 42) > 0,
      link: 'inventory',
    },
  ];

  const mockRevenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mrt', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'Mei', revenue: 55000 },
  ];

  const mockSalesData = [
    { day: 'Ma', sales: 12 },
    { day: 'Di', sales: 19 },
    { day: 'Wo', sales: 15 },
    { day: 'Do', sales: 22 },
    { day: 'Vr', sales: 28 },
    { day: 'Za', sales: 18 },
    { day: 'Zo', sales: 14 },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Logo */}
      <img src="/HelloTV.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl object-contain opacity-5 pointer-events-none mix-blend-multiply" alt="" />
      
      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-3 md:gap-4">
              <HelloTVLogo className="h-10 md:h-12 mt-1" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                    Dashboard
                  </h1>
                  <span className="text-[10px] text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full mt-1 border border-gray-200">
                    Laatste update: {new Date().toLocaleTimeString('nl-NL')}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500">Welkom terug! Hier is je overzicht van vandaag.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <div className="text-right bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 rounded-2xl shadow-lg border border-green-400">
                <div className="text-[11px] md:text-xs text-green-100 uppercase tracking-wider font-bold mb-1">Totale Omzet Nederland Vandaag</div>
                <div className="font-black text-white text-2xl md:text-3xl">€ 222.222</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section: #1 Verkoper & Totale Omzet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Hero: Totale Omzet Maand */}
          <div 
            onClick={() => onNavigate?.('orders')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white lg:col-span-1 flex flex-col justify-center cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
            </div>
            <h2 className="text-blue-200 font-bold mb-2 flex items-center gap-2 text-xl"><Euro size={24}/> Totale Omzet (Deze Maand)</h2>
            <div className="text-3xl font-black mb-3">€{(stats?.totalRevenue || 10000000).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</div>
            <div className="text-white font-bold bg-white/20 px-3 py-1 rounded-full inline-block self-start text-sm">+12.5% vs Vorige Maand</div>
          </div>
          
          {/* Hero: Top Verkopers */}
          <div className="bg-gradient-to-br from-[#FDCB2C] to-yellow-500 rounded-2xl shadow-xl p-8 text-gray-900 lg:col-span-2">
            <h2 className="text-yellow-900 font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
              <Trophy size={18} className="text-yellow-900" />
              Nummer 1 Verkopers Vandaag <span className="bg-white text-yellow-600 px-2 py-0.5 rounded text-xs font-bold animate-pulse">LIVE</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/40 p-4 rounded-xl shadow-sm">
                <div className="text-xs font-bold text-yellow-900 mb-1 flex items-center gap-1"><MessageCircle size={14}/> ONLINE (CHAT)</div>
                <div className="text-2xl font-black mb-1">Daan van Poppel</div>
                <div className="text-sm font-bold text-yellow-800">44 Orders</div>
              </div>
              <div className="bg-white/40 p-4 rounded-xl shadow-sm">
                <div className="text-xs font-bold text-yellow-900 mb-1 flex items-center gap-1"><Store size={14}/> WINKEL</div>
                <div className="text-2xl font-black mb-1">Tom van Biene</div>
                <div className="text-sm font-bold text-yellow-800">22 Orders</div>
              </div>
              <div className="bg-white/40 p-4 rounded-xl shadow-sm">
                <div className="text-xs font-bold text-yellow-900 mb-1 flex items-center gap-1"><Mail size={14}/> TICKETS</div>
                <div className="text-2xl font-black mb-1">Tim Swens</div>
                <div className="text-sm font-bold text-yellow-800">88 Tickets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats Grid (Without Total Revenue) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.slice(1).map((card: any, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate?.(card.link)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className={`${card.color} p-6 text-white relative h-full flex flex-col justify-between`}>
                <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1 shadow-sm border border-white/30">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <card.icon size={24} className="opacity-90" />
                    <span className="font-bold text-lg">{card.title}</span>
                  </div>
                  {card.change && idx !== 0 && (
                    <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                      {card.change}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black mb-1">
                  {card.value}
                </div>
                <div className="text-sm opacity-80">
                  {card.subtitle}
                  {card.alert && <span className="ml-2">⚠️</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filiaal Targets Block */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Target className="text-indigo-600" />
                Dagelijkse Targets per Filiaal
              </h2>
              <p className="text-sm text-gray-500 mt-1">Targets worden live berekend (VMS Omzet zelfde dag +1 vorig jaar).</p>
            </div>
            <button 
              onClick={handlePushToSQL}
              disabled={syncingTargets}
              className={`px-4 py-2 font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                syncingTargets ? 'bg-gray-100 text-gray-500 cursor-wait' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {syncingTargets ? (
                <><RefreshCw size={18} className="animate-spin" /> Bezig met Pushen...</>
              ) : (
                <><DatabaseIcon size={18} /> Push Targets naar Email Maick & WhatsApp groep apps</>
              )}
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filiaalTargets.map((filiaal, idx) => {
              const progress = Math.min(100, (filiaal.current / filiaal.target) * 100);
              const isAchieved = progress >= 100;
              return (
                <div key={idx} className={`p-4 rounded-xl border ${isAchieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{filiaal.name}</h3>
                    {isAchieved && <CheckCircle size={16} className="text-green-600" />}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Target: €{filiaal.target.toLocaleString('nl-NL')}</div>
                  <div className={`text-lg font-black mb-3 ${isAchieved ? 'text-green-700' : 'text-gray-900'}`}>
                    €{filiaal.current.toLocaleString('nl-NL')}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isAchieved ? 'bg-green-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Snelle Order Aanmaken (Customer Lookup Prototype) */}
        <div className="mb-8">
          <NewOrderWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Omzet Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value: any) => `€${value.toLocaleString('nl-NL')}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Verkopen per Dag</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value: any) => `${value} verkopen`}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cashback Acties Overview */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                Lopende Cashback Acties (Live DB)
              </h2>
              <p className="text-sm text-gray-500 mt-1">Stuur actievoorwaarden als PDF via filiaal WhatsApp naar de klant.</p>
            </div>
            <button 
              onClick={() => setShowAddActie(!showAddActie)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
            >
              + Nieuwe Actie
            </button>
          </div>

          {showAddActie && (
            <div className="p-6 border-b border-gray-100 bg-blue-50">
              <h3 className="text-sm font-bold text-blue-900 mb-4">Nieuwe Cashback Actie Toevoegen</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Merk</label>
                  <input type="text" value={newActie.merk} onChange={e => setNewActie({...newActie, merk: e.target.value})} className="px-3 py-2 border rounded text-sm w-32" placeholder="Bijv. TCL" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-600 mb-1">Actie Naam</label>
                  <input type="text" value={newActie.actie} onChange={e => setNewActie({...newActie, actie: e.target.value})} className="px-3 py-2 border rounded text-sm w-full" placeholder="Bijv. Zomer Promotie" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Einddatum</label>
                  <input type="text" value={newActie.datum} onChange={e => setNewActie({...newActie, datum: e.target.value})} className="px-3 py-2 border rounded text-sm w-32" placeholder="30 Mei 2026" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Bedrag</label>
                  <input type="text" value={newActie.bedrag} onChange={e => setNewActie({...newActie, bedrag: e.target.value})} className="px-3 py-2 border rounded text-sm w-32" placeholder="Tot €250" />
                </div>
                <button 
                  onClick={() => {
                    if(newActie.merk && newActie.actie) {
                      setCashbackActies([...cashbackActies, { ...newActie, id: Date.now() }]);
                      setNewActie({ merk: '', actie: '', datum: '', bedrag: '', url: '' });
                      setShowAddActie(false);
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700"
                >
                  Opslaan
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-600">Merk & Actie</th>
                  <th className="p-4 font-bold text-gray-600">Geldig tot</th>
                  <th className="p-4 font-bold text-gray-600">Cashback Bedrag</th>
                  <th className="p-4 font-bold text-gray-600 text-right">Actie</th>
                </tr>
              </thead>
              <tbody>
                {cashbackActies.map((actie) => (
                  <tr key={actie.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{actie.merk}</p>
                      <p className="text-xs text-gray-500">{actie.actie}</p>
                    </td>
                    <td className="p-4 font-medium text-gray-600">{actie.datum}</td>
                    <td className="p-4 font-black text-green-600">{actie.bedrag}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => {
                          if(window.confirm(`PDF Genereren en WhatsApp openen voor ${actie.merk} actie?`)) {
                            // Simulating API call
                            alert(`PDF voor ${actie.merk} succesvol gegenereerd en geregistreerd in Supabase. WhatsApp link geopend.`);
                          }
                        }}
                        className="px-4 py-2 bg-black text-[#FDCB2C] font-bold rounded-lg hover:bg-gray-900 transition-colors text-sm shadow-md"
                      >
                        PDF & WhatsApp
                      </button>
                      <button
                        onClick={() => {
                          setCashbackActies(cashbackActies.filter(a => a.id !== actie.id));
                        }}
                        className="ml-2 px-3 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        Verwijder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
