import React from "react";

import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Mail, Phone, MapPin, Calendar, Database } from 'lucide-react';
import { api } from '../../utils/api';
import { mockCustomers } from '../../utils/mockCustomers';

export function CRM() {
  const [customers, setCustomers] = useState<any[]>(mockCustomers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    postcode: '',
    huisnummer: '',
    straat: '',
    woonplaats: '',
  });

  // Simulated Supabase Fetch
  useEffect(() => {
    // In een echte applicatie halen we hier de data uit Supabase
    // const { data, error } = await supabase.from('customers').select('*');
    // if (data) setCustomers(data);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock insert logic
      const newCustomer = {
        id: crypto.randomUUID(),
        ...formData,
        created_at: new Date()
      };
      setCustomers([newCustomer, ...customers]);
      setFormData({ voornaam: '', achternaam: '', email: '', telefoon: '', postcode: '', huisnummer: '', straat: '', woonplaats: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Klantendatabase (CRM)</h1>
            <p className="text-gray-600">Beheer klantinformatie</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm">
              <Database size={16} />
              Beveiligde Database
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow font-bold"
            >
              <Plus size={20} />
              Nieuwe Klant
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nieuwe Klant Toevoegen</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Voornaam</label>
                <input
                  type="text" required
                  value={formData.voornaam}
                  onChange={(e) => setFormData({ ...formData, voornaam: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Achternaam</label>
                <input
                  type="text" required
                  value={formData.achternaam}
                  onChange={(e) => setFormData({ ...formData, achternaam: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">E-mailadres</label>
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Telefoonnummer</label>
                <input
                  type="tel"
                  value={formData.telefoon}
                  onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Postcode & Huisnummer</label>
                <div className="flex gap-2">
                  <input
                    type="text" placeholder="1234 AB"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text" placeholder="10"
                    value={formData.huisnummer}
                    onChange={(e) => setFormData({ ...formData, huisnummer: e.target.value })}
                    className="w-1/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Straat & Woonplaats</label>
                <div className="flex gap-2">
                  <input
                    type="text" placeholder="Straatnaam"
                    value={formData.straat}
                    onChange={(e) => setFormData({ ...formData, straat: e.target.value })}
                    className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text" placeholder="Woonplaats"
                    value={formData.woonplaats}
                    onChange={(e) => setFormData({ ...formData, woonplaats: e.target.value })}
                    className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3 flex gap-4 mt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1A1A1A] text-white font-bold rounded-lg shadow-md hover:bg-black transition-colors"
                >
                  Klant Opslaan in Database
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-[#FDCB2C] text-black w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-sm">
                  {customer.voornaam?.charAt(0).toUpperCase()}{customer.achternaam?.charAt(0).toUpperCase()}
                </div>
                <button className="text-gray-400 hover:text-[#FDCB2C] transition-colors bg-gray-50 p-2 rounded-lg">
                  <Edit size={16} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {customer.voornaam} {customer.achternaam}
              </h3>
              
              <div className="space-y-3">
                {customer.email && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Mail size={14} />
                    </div>
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.telefoon && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                    <span>{customer.telefoon}</span>
                  </div>
                )}
                {(customer.straat || customer.postcode) && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                      <MapPin size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="truncate">{customer.straat} {customer.huisnummer}</span>
                      <span className="text-xs text-gray-400">{customer.postcode} {customer.woonplaats}</span>
                    </div>
                  </div>
                )}
                {customer.created_at && (
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-50">
                    <Calendar size={14} />
                    <span>Klant sinds {new Date(customer.created_at).toLocaleDateString('nl-NL')}</span>
                  </div>
                )}
                
                {/* Order History Section */}
                {customer.orders && customer.orders.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-800">Bestelhistorie</span>
                      <span className="text-sm font-black text-green-600">
                        Totale waarde: €{(customer.total_spent || 0).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {customer.orders.map((order: any) => (
                        <div key={order.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-700">{order.id}</span>
                            <span className="text-xs font-semibold text-gray-900">€{order.totaal.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="text-xs text-gray-600 truncate">{order.product}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-gray-400">{new Date(order.datum).toLocaleDateString('nl-NL')}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              order.status === 'Afgehandeld' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {customers.length === 0 && !showForm && (
            <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Nog geen klanten in de database</p>
              <p className="text-gray-400 mt-1">Klik op "Nieuwe Klant" om te beginnen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
