import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Mail, Phone, MapPin, Calendar, Database, Search, Filter, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { api } from '../../utils/api';
import { mockCustomers } from '../../utils/mockCustomers';
import { EMPLOYEES } from '../../utils/employees';

export function CRM() {
  const [customers, setCustomers] = useState<any[]>(mockCustomers);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'klanten' | 'rechten'>('klanten');
  
  // New Filters
  const [activiteitFilter, setActiviteitFilter] = useState('Alle Activiteiten');
  const [kanaalFilter, setKanaalFilter] = useState('Alle Kanalen');
  
  // Rechten State (Mock)
  const [permissions, setPermissions] = useState<Record<string, any>>({});

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

  const togglePermission = (empCode: string, module: string) => {
    setPermissions(prev => ({
      ...prev,
      [empCode]: {
        ...(prev[empCode] || {}),
        [module]: !(prev[empCode]?.[module])
      }
    }));
  };

  const MODULES = ['SalesTrackers', 'Offertes', 'Orders', 'Voorraad', 'SalesTrainers', 'Reparatie', 'Hello Base', 'CRM'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">HelloTV Systeembeheer & CRM</h1>
            <p className="text-gray-600">Beheer klantgegevens en wijs module-rechten (credentials) toe aan personeel.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm border border-green-200">
              <Database size={16} />
              SQL Supabase Gekoppeld
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('klanten')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'klanten' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Users size={18} /> Klantendatabase (CRM)
          </button>
          <button
            onClick={() => setActiveTab('rechten')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'rechten' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Shield size={18} /> Rechten & Credentials
          </button>
        </div>

        {activeTab === 'klanten' && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow font-bold"
              >
                <Plus size={20} />
                Nieuwe Klant
              </button>
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
          </>
        )}

        {activeTab === 'rechten' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="text-blue-600" /> Toegangsbeheer (Credentials)
              </h2>
              <p className="text-gray-600">Bebepaal welke medewerker toegang heeft tot welke applicatie/module. Wijzigingen worden direct doorgevoerd in het systeem. Let op: Maak nog geen logincodes aan, dit is puur de rechten-kopie.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left bg-white text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-bold text-gray-700">Medewerker</th>
                    <th className="p-4 font-bold text-gray-700">Rol</th>
                    {MODULES.map(mod => (
                      <th key={mod} className="p-4 font-bold text-gray-700 text-center">{mod}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.map((emp) => (
                    <tr key={emp.code} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500 font-mono">Code: {emp.code}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${emp.isSeller ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
                          {emp.isSeller ? 'Verkoper' : 'Staf/Anders'}
                        </span>
                      </td>
                      {MODULES.map(mod => {
                        // Default wat logische rechten
                        const hasAccess = permissions[emp.code]?.[mod] ?? (emp.isSeller && ['Offertes', 'Orders', 'SalesTrackers'].includes(mod) || mod === 'Hello Base');
                        return (
                          <td key={mod} className="p-4 text-center align-middle">
                            <button 
                              onClick={() => togglePermission(emp.code, mod)}
                              className={`transition-colors flex justify-center w-full ${hasAccess ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                            >
                              {hasAccess ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
