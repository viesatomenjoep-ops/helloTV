import React from "react";

import { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, FileText, ShoppingCart, Package, Euro, AlertTriangle, Bell, Trophy, MessageCircle, Store, Mail } from 'lucide-react';
import { api } from '../../utils/api';
import { HelloTVLogo } from './ui/HelloTVLogo';
import { NewOrderWidget } from './NewOrderWidget';

export function Dashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

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
      value: `€${(stats?.totalRevenue || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      icon: Euro,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      change: '+12.5%',
    },
    {
      title: 'Vandaag Omzet',
      value: `€${(stats?.todayRevenue || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      change: '+8.2%',
    },
    {
      title: 'Klanten',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      change: '+5.4%',
    },
    {
      title: 'Offertes',
      value: stats?.pendingQuotes || 0,
      icon: FileText,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      subtitle: 'in behandeling',
    },
    {
      title: 'Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      subtitle: `${stats?.pendingOrders || 0} pending`,
    },
    {
      title: 'Lage Voorraad',
      value: stats?.lowStockItems || 0,
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      alert: (stats?.lowStockItems || 0) > 0,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HelloTVLogo className="h-12" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Dashboard
                </h1>
                <p className="text-gray-500">Welkom terug! Hier is je overzicht van vandaag.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const text = encodeURIComponent('Hallo, dit is het HelloTVLogo dashboard.');
                  window.open(`https://wa.me/31651641886?text=${text}`, '_blank');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Bell size={18} />
                <span>Test WhatsApp</span>
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-500">Laatste update</div>
                <div className="font-medium">{new Date().toLocaleTimeString('nl-NL')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Snelle Order Aanmaken (Customer Lookup Prototype) */}
        <div className="mb-8">
          <NewOrderWidget />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`${card.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <card.icon size={32} className="opacity-90" />
                  {card.change && (
                    <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                      {card.change}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold mb-1">{card.value}</div>
                <div className="text-sm opacity-90">
                  {card.subtitle || card.title}
                  {card.alert && <span className="ml-2">⚠️</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers van Vandaag */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Trophy className="text-[#FDCB2C]" size={24} />
            Nummer 1 Verkopers (Vandaag)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="bg-blue-500 text-white p-3 rounded-full shadow-md">
                <MessageCircle size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Online (Chat)</div>
                <div className="text-lg font-black text-gray-900">Lisa Jansen</div>
                <div className="text-sm font-semibold text-gray-500">24 orders gesloten</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="bg-green-500 text-white p-3 rounded-full shadow-md">
                <Store size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">In de Verkoop (Winkel)</div>
                <div className="text-lg font-black text-gray-900">Mark de Vries</div>
                <div className="text-sm font-semibold text-gray-500">18 orders gesloten</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="bg-purple-500 text-white p-3 rounded-full shadow-md">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Via Mail (Tickets)</div>
                <div className="text-lg font-black text-gray-900">Tom Peters</div>
                <div className="text-sm font-semibold text-gray-500">12 orders gesloten</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="bg-orange-500 text-white p-3 rounded-full shadow-md">
                <Store size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Barbecue (BBQ)</div>
                <div className="text-lg font-black text-gray-900">Ruben de Boer</div>
                <div className="text-sm font-semibold text-gray-500">8 BBQ's gesloten</div>
              </div>
            </div>
          </div>
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

      </div>
    </div>
  );
}
