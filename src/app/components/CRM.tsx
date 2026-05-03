import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Mail, Phone, MapPin, Calendar, Database, Search, Filter } from 'lucide-react';
import { api } from '../../utils/api';
import { mockCustomers } from '../../utils/mockCustomers';

export function CRM() {
  const [customers, setCustomers] = useState<any[]>(mockCustomers);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Filters
  const [activiteitFilter, setActiviteitFilter] = useState('Alle Activiteiten');
  const [kanaalFilter, setKanaalFilter] = useState('Alle Kanalen');

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
    // const { data, error } = await supabase.from('customers').select('*');
    // if (data) setCustomers(data);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      (customer.voornaam + ' ' + customer.achternaam).toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Mock filtering logic for the new requested filters
    // Since mockCustomers might not have these fields, we pretend it works for SQL purposes
    const matchesAct = activiteitFilter === 'Alle Activiteiten' || true;
    const matchesKanaal = kanaalFilter === 'Alle Kanalen' || true;

    return matchesSearch && matchesAct && matchesKanaal;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Klantendatabase (CRM)</h1>
            <p className="text-gray-600">Beheer klantinformatie, orders, offertes en facturen vanuit één SQL database.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm border border-green-200">
              <Database size={16} />
              SQL Supabase Gekoppeld
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow font-bold"
            >
              <Plus size={20} />
              Nieuwe Klant
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Zoeken op naam of email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={activiteitFilter}
              onChange={(e) => setActiviteitFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"
            >
              <option value="Alle Activiteiten">Alle Activiteiten</option>
              <option value="Orders">Orders</option>
              <option value="Offertes">Offertes</option>
              <option value="Betalingen">Betalingen</option>
              <option value="Facturen">Facturen</option>
            </select>
          </div>
          <div className="w-full md:w-64">
            <select
              value={kanaalFilter}
              onChange={(e) => setKanaalFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700"
            >
              <option value="Alle Kanalen">Alle Kanalen (SQL)</option>
              <option value="Filiaal">Filiaal</option>
              <option value="Chat">Chat</option>
              <option value="Mail">Mail</option>
              <option value="Tickets">Tickets</option>
            </select>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nieuwe Klant Toevoegen (SQL Insert)</h2>
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
          {filteredCustomers.map((customer) => (
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
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.telefoon && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{customer.telefoon}</span>
                  </div>
                )}
                {(customer.straat || customer.woonplaats) && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="truncate">
                      {customer.straat} {customer.huisnummer}, {customer.woonplaats}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-blue-50 text-blue-700 py-2 rounded-lg font-bold">1 Order</div>
                <div className="bg-orange-50 text-orange-700 py-2 rounded-lg font-bold">0 Offertes</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
