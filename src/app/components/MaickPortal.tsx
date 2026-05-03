import React, { useState } from 'react';
import { ShieldAlert, Users, TrendingUp, Settings, Edit, Save, Trash2, Plus, Star, Wrench, Search, Box } from 'lucide-react';

const INITIAL_TEAM = [
  { id: 1, naam: 'Tom van Biene', email: 'tom@hellotv.nl', role: 'Spits', filiaal: 'Amsterdam', status: 'Actief', target: 25000 },
  { id: 2, naam: 'Max de Groot', email: 'max@hellotv.nl', role: 'Aanvaller', filiaal: 'Alkmaar', status: 'Actief', target: 18000 },
  { id: 3, naam: 'Lisa Visser', email: 'lisa@hellotv.nl', role: 'Middenvelder', filiaal: 'Breda', status: 'Actief', target: 12000 },
  { id: 4, naam: 'Klaas Jansen', email: 'klaas@hellotv.nl', role: 'Verdediger', filiaal: 'Eindhoven', status: 'Actief', target: 8000 },
  { id: 5, naam: 'Maick', email: 'maick@hellotv.nl', role: 'Coach', filiaal: 'Hoofdkantoor', status: 'Actief', target: 0 },
  { id: 6, naam: 'Daan Bos', email: 'daan@hellotv.nl', role: 'Trainer', filiaal: 'Rotterdam', status: 'Actief', target: 0 },
];

export function MaickPortal() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('TeamBeheer');

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Spits': return 'bg-red-100 text-red-700 border-red-200';
      case 'Aanvaller': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Middenvelder': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Verdediger': return 'bg-green-100 text-green-700 border-green-200';
      case 'Coach': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Trainer': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTeam = team.filter(member => 
    member.naam.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.filiaal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-[#FDCB2C] flex items-center gap-3">
              <ShieldAlert size={40} />
              MAICK Administrator Portaal
            </h1>
            <p className="text-gray-400 mt-2">Master Control: Cijfers, Reviews, Reparatieverzoeken & Teamcredentials</p>
          </div>
        </div>

        {/* Top KPIs for MAICK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Totale Omzet Vandaag</p>
            <h3 className="text-3xl font-black text-white mt-1">€ 42.850</h3>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <Star className="text-yellow-500" size={24} />
              <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">LIVE</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Reviews Vandaag</p>
            <h3 className="text-3xl font-black text-white mt-1">+24 (4.8 gem.)</h3>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <Wrench className="text-red-500" size={24} />
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">URGENT</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Reparatieverzoeken</p>
            <h3 className="text-3xl font-black text-white mt-1">12 openstaand</h3>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <Box className="text-blue-500" size={24} />
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">VOORRAAD</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Waarschuwingen</p>
            <h3 className="text-3xl font-black text-white mt-1">4 modellen laag</h3>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {['TeamBeheer', 'SysteemInstellingen', 'Alle Statistieken'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold rounded-xl transition-all ${
                activeTab === tab 
                  ? 'bg-[#FDCB2C] text-black shadow-lg shadow-[#FDCB2C]/20' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'TeamBeheer' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="text-[#FDCB2C]" /> Verkopers & Credentials Beheer
              </h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="Zoek medewerker..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2">
                  <Plus size={18} /> Nieuwe Toevoegen
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800/50 text-gray-400 font-bold border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Medewerker</th>
                    <th className="px-6 py-4">Credentials (Email)</th>
                    <th className="px-6 py-4">Positie (Voetbalteam)</th>
                    <th className="px-6 py-4">Filiaal</th>
                    <th className="px-6 py-4">Target / Status</th>
                    <th className="px-6 py-4 text-right">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredTeam.map(member => (
                    <tr key={member.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{member.naam}</td>
                      <td className="px-6 py-4 font-mono text-gray-400">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{member.filiaal}</td>
                      <td className="px-6 py-4">
                        {member.target > 0 ? (
                          <div className="text-[#FDCB2C] font-bold">€ {member.target.toLocaleString('nl-NL')}</div>
                        ) : (
                          <div className="text-gray-500 italic">N.v.t.</div>
                        )}
                        <div className="text-xs text-green-500 font-bold mt-1">{member.status}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-gray-800 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 rounded-lg transition-colors" title="Bewerk">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 bg-gray-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg transition-colors" title="Verwijder">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
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
