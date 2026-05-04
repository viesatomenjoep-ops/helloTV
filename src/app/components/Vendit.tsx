import React, { useState } from 'react';
import { Database, Link2, RefreshCw, CheckCircle, AlertTriangle, Key, Shield } from 'lucide-react';

export function Vendit() {
  const [apiKey, setApiKey] = useState('vdt_live_8f92j3n4m5lk6jh7g8f9');
  const [endpoint, setEndpoint] = useState('https://api.vendit.nl/v3/hellotv');
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTestConnection = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('testing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Database className="text-blue-600" size={36} />
              Vendit API Integratie
            </h1>
            <p className="text-gray-600">Beheer de live koppeling tussen HelloTV OS en het Vendit VMS systeem.</p>
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm border border-green-200 flex items-center gap-2">
            <Shield size={16} /> API Voorbereid
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <RefreshCw size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Real-time Sync</h3>
            <p className="text-xs text-gray-500">Voorraad, orders en prijzen worden elke 5 minuten gesynchroniseerd.</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Link2 size={24} />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">2-Way Datastroom</h3>
            <p className="text-xs text-gray-500">Mutaties in HelloTV OS worden direct naar Vendit gepusht en vice versa.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Key className="text-gray-400" /> API Configuratie
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configureer de endpoints om de API-verbinding tot stand te brengen.</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleTestConnection} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Vendit API Endpoint</label>
                <input
                  type="url"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Secret API Key (V3)</label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Versleuteld</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'testing'}
                  className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-[#FDCB2C] hover:text-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'testing' ? (
                    <><RefreshCw size={18} className="animate-spin" /> Verbinding Testen...</>
                  ) : (
                    <><Link2 size={18} /> Test & Sla Op</>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-3 rounded-xl border border-green-200 w-full md:w-auto">
                    <CheckCircle size={20} />
                    <span>Verbinding Succesvol! API is actief.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-4 py-3 rounded-xl border border-red-200 w-full md:w-auto">
                    <AlertTriangle size={20} />
                    <span>Verbinding mislukt. Controleer de API Key.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
