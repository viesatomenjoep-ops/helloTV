import React, { useState } from 'react';
import { ShieldAlert, Users, TrendingUp, Settings, Edit, Save, Trash2, Plus, Star, Wrench, Search, Box } from 'lucide-react';

const INITIAL_TEAM = [
  { id: 1, naam: 'Tom van Biene', email: 'tom@hellotv.nl', role: 'Spits', filiaal: 'Amsterdam', status: 'Actief', target: 25000, salaris: 3200, bonus: 450, contract: 'Vast' },
  { id: 2, naam: 'Max de Groot', email: 'max@hellotv.nl', role: 'Aanvaller', filiaal: 'Alkmaar', status: 'Actief', target: 18000, salaris: 2800, bonus: 200, contract: 'Onderhandeling' },
  { id: 3, naam: 'Lisa Visser', email: 'lisa@hellotv.nl', role: 'Middenvelder', filiaal: 'Breda', status: 'Actief', target: 12000, salaris: 2400, bonus: 150, contract: 'Tijdelijk' },
  { id: 4, naam: 'Klaas Jansen', email: 'klaas@hellotv.nl', role: 'Verdediger', filiaal: 'Eindhoven', status: 'Actief', target: 8000, salaris: 2200, bonus: 0, contract: 'Vast' },
  { id: 5, naam: 'Maick', email: 'maick@hellotv.nl', role: 'Coach', filiaal: 'Hoofdkantoor', status: 'Actief', target: 0, salaris: 6500, bonus: 1200, contract: 'Onbepaalde Tijd' },
  { id: 6, naam: 'Daan Bos', email: 'daan@hellotv.nl', role: 'Trainer', filiaal: 'Rotterdam', status: 'Actief', target: 0, salaris: 3100, bonus: 300, contract: 'Vast' },
];

export function MaickPortal() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Superdashboard');

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
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
              <ShieldAlert size={40} className="text-[#FDCB2C]" />
              Maick Administrator Portal
            </h1>
            <p className="text-gray-500 mt-2">Master Control: Eén opslag monitoren van HR, Transport, Reparaties en Voorraad</p>
          </div>
        </div>

        {/* Top KPIs for MAICK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#FDCB2C] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">SALES</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Totale Omzet Vandaag</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">€ 42.850</h3>
            <p className="text-sm text-green-600 mt-2 font-bold flex items-center gap-1">Top verkoper: Lisa (Breda)</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#FDCB2C] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <Wrench className="text-yellow-500" size={24} />
              <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">REPARATIES</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Reparatieverzoeken</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">12 Openstaand</h3>
            <p className="text-sm text-red-600 mt-2 font-bold">3 Dringend (Deadline rood)</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#FDCB2C] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <Star className="text-blue-500" size={24} />
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">TRANSPORT</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Logistiek (Hessey)</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">14 Busjes</h3>
            <p className="text-sm text-green-600 mt-2 font-bold">Alles op schema</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#FDCB2C] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <Box className="text-purple-500" size={24} />
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">INKOOP</span>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">Voorraad Waarschuwingen</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">4 Kritiek</h3>
            <p className="text-sm text-yellow-600 mt-2 font-bold">ODM & Gele Voorraad checken</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {['Superdashboard', 'HR, Personeel & Contracten', 'SysteemInstellingen'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold rounded-xl transition-all ${
                activeTab === tab 
                  ? 'bg-[#FDCB2C] text-black shadow-lg shadow-[#FDCB2C]/20' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'Superdashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Sales & Trainers Inzichten</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700 font-bold">🏆 #1 Salestrekker (Vandaag)</span>
                  <span className="text-yellow-600 font-black text-lg">Lisa Visser (Breda)</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-red-200">
                  <span className="text-gray-700 font-bold">📚 Bijscholing Vereist</span>
                  <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg">Utrecht (Kabels Target: 32%)</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-yellow-200">
                  <span className="text-gray-700 font-bold">⚠️ Inkopers Waarschuwing</span>
                  <span className="text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-lg">Cruquius Voorraad (78%)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Transport & Reparatie Logistiek</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-700 font-bold">🚚 Hessey Transport Status</span>
                  <span className="text-green-600 font-bold">14/14 Bussen Gepland</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-red-200">
                  <span className="text-gray-700 font-bold">🔧 Reparaties (Deadline Rood)</span>
                  <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg">3 Tickets URGENT</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-blue-200">
                  <span className="text-gray-700 font-bold">⭐ Live Reviews Sync</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg">Actief (Trustpilot & Google)</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'HR, Personeel & Contracten' && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-[#FDCB2C]" /> Verkopers & Credentials Beheer
              </h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Zoek medewerker..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#FDCB2C] outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2">
                  <Plus size={18} /> Nieuwe Toevoegen
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-4">Medewerker</th>
                    <th className="p-4 font-bold text-gray-500">Email</th>
                    <th className="p-4 font-bold text-gray-500">Rol</th>
                    <th className="p-4 font-bold text-gray-500">Filiaal</th>
                    <th className="p-4 font-bold text-gray-500">Status</th>
                    <th className="p-4 font-bold text-gray-500">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTeam.map(member => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-900">{member.naam}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-500">{member.email}</td>
                      <td className="px-4 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadge(member.role)}`}>{member.role}</span></td>
                      <td className="px-4 py-4 text-gray-900 font-bold">{member.filiaal}</td>
                      <td className="px-4 py-4 text-green-600 font-bold">{member.status}</td>
                      <td className="px-4 py-4">
                        <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors"><Edit size={18} /></button>
                        <button className="p-2 text-red-500 hover:text-red-700 transition-colors ml-2"><Trash2 size={18} /></button>
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
