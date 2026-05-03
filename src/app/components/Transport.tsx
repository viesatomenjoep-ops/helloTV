import React, { useState } from 'react';
import { Truck, Calendar, MapPin, Box, CheckCircle, Clock, Search, Filter } from 'lucide-react';

export function Transport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Alle statussen');

  const mockTransportOrders = [
    {
      id: 'TR-10045',
      customer: 'Johan de Vries',
      address: 'Kalverstraat 12, Amsterdam',
      items: ['Samsung 65" OLED', 'Muurbeugel'],
      date: '2026-05-04',
      timeSlot: '08:00 - 12:00',
      status: 'Ingepland',
      depot: 'Logistiek Duiven',
      driver: 'Kees (Auto 4)'
    },
    {
      id: 'TR-10046',
      customer: 'Sanne Bakker',
      address: 'Coolsingel 45, Rotterdam',
      items: ['LG 55" QNED'],
      date: '2026-05-04',
      timeSlot: '13:00 - 17:00',
      status: 'Onderweg',
      depot: 'Logistiek DTC',
      driver: 'Mark (Auto 1)'
    },
    {
      id: 'TR-10047',
      customer: 'Peter Jansen',
      address: 'Vredenburg 10, Utrecht',
      items: ['Weber BBQ', 'BBQ Hoes'],
      date: '2026-05-05',
      timeSlot: 'Hele dag',
      status: 'Wacht op pick',
      depot: 'Logistiek Barbeque',
      driver: 'Nog toe te wijzen'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ingepland': return 'bg-blue-100 text-blue-800';
      case 'Onderweg': return 'bg-yellow-100 text-yellow-800';
      case 'Afgeleverd': return 'bg-green-100 text-green-800';
      case 'Wacht op pick': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = mockTransportOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle statussen' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Truck className="text-[#1D6F42]" size={36} />
              Transport & Logistiek (Bessy)
            </h1>
            <p className="text-gray-600">Beheer alle transport- en planningsorders (Logistiek Duiven, DTC & Barbeque).</p>
          </div>
          <button className="px-6 py-3 bg-[#1D6F42] text-white rounded-xl font-bold hover:bg-green-800 transition-colors shadow-md">
            + Nieuwe Planningsorder
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Zoeken op TR-nummer of klant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1D6F42] outline-none font-medium"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1D6F42] outline-none font-bold text-gray-700"
            >
              <option value="Alle statussen">Alle statussen</option>
              <option value="Wacht op pick">Wacht op pick</option>
              <option value="Ingepland">Ingepland</option>
              <option value="Onderweg">Onderweg</option>
              <option value="Afgeleverd">Afgeleverd</option>
            </select>
          </div>
        </div>

        {/* Transport Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <span className="font-mono font-bold text-gray-800">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{order.customer}</h3>
                
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-gray-400" />
                    <span className="font-bold text-gray-900">{order.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck size={16} className="text-[#1D6F42]" />
                    <span className="font-medium text-[#1D6F42]">{order.driver}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Te leveren artikelen:</p>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Box size={14} className="text-gray-400" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold border border-gray-200">
                    {order.depot}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
