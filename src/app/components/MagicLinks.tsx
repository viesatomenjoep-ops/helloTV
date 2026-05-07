import React, { useState } from 'react';
import { Link, MessageSquare, PhoneCall, Bot, Copy, ExternalLink, CheckCircle, Table as TableIcon, Database, Terminal, RefreshCw } from 'lucide-react';
import { HelloTVLogo } from './ui/HelloTVLogo';

export function MagicLinks() {
  const [activeTab, setActiveTab] = useState<'magic_links' | 'calling_agents' | 'hessey_api'>('magic_links');
  const [copiedLink, setCopiedLink] = useState('');
  const [hesseyStatus, setHesseyStatus] = useState<'connected' | 'syncing' | 'error'>('connected');

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(''), 3000);
  };

  const STORES = [
    'Filiaal Breda (Test)', 
    'Filiaal Amsterdam', 
    'Filiaal Eindhoven', 
    'Filiaal Rotterdam', 
    'AI Klantenservice (Landelijk)', 
    'AI Zakelijk & B2B'
  ];

  const MAGIC_LINKS = [
    { label: 'Installatie Service Planner', url: 'https://www.hellotv.nl/ai-chat/installatie' },
    { label: 'Voorraad & Levertijd Checker', url: 'https://www.hellotv.nl/ai-chat/voorraad-check' },
    { label: 'Direct Bestellen met Korting', url: 'https://www.hellotv.nl/ai-chat/direct-bestellen' },
  ];

  return (
    <div className="p-8 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Magic Links & Calling Agents</h1>
            <p className="text-gray-600">Beheer klantenservice bots en AI Voice Agents per filiaal.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('magic_links')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'magic_links' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Link size={18} /> Magic Links (Chatbots)
          </button>
          <button
            onClick={() => setActiveTab('calling_agents')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'calling_agents' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <PhoneCall size={18} /> Voice AI Agents per Filiaal
          </button>
          <button
            onClick={() => setActiveTab('hessey_api')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'hessey_api' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Database size={18} /> helloTV Bakwagen Systeemintegratie
          </button>
        </div>

        {activeTab === 'magic_links' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bot className="text-[#FDCB2C]" /> Genereer Magic Links
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Een Magic Link start direct een gepersonaliseerde AI-chat omgeving voor de klant. Ideaal om mee te sturen in een offerte, e-mail of WhatsApp-bericht. Hier zijn 10 links gebaseerd op tv-verkoop.
                </p>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {MAGIC_LINKS.map((link, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex flex-col gap-2 group">
                      <span className="text-xs font-bold text-gray-700">{link.label}</span>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Link className="text-gray-400 shrink-0" size={14} />
                          <span className="text-xs font-mono text-blue-600 truncate">{link.url}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(link.url)}
                          className="shrink-0 p-1.5 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1"
                        >
                          {copiedLink === link.url ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TableIcon className="text-green-600" /> Adviesscenario's in Bot
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Deze tabellen bepalen hoe de Magic Link chatbot advies geeft aan klanten.
                </p>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-3 font-bold">Klant Scenario</th>
                        <th className="p-3 font-bold">Aanbevolen Type</th>
                        <th className="p-3 font-bold">Prijsindicatie</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="p-3">Veel lichtinval, kijkt overdag</td>
                        <td className="p-3 text-blue-600 font-bold">MiniLED / Neo QLED</td>
                        <td className="p-3">€ 1.200 - € 3.500</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="p-3">Film-liefhebber, avondkijker</td>
                        <td className="p-3 text-blue-600 font-bold">OLED / QD-OLED</td>
                        <td className="p-3">€ 1.500 - € 4.000</td>
                      </tr>
                      <tr>
                        <td className="p-3">Gaming (PS5 / Xbox)</td>
                        <td className="p-3 text-blue-600 font-bold">OLED (144Hz)</td>
                        <td className="p-3">€ 1.300 - € 2.800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mockup of Customer UI */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[600px] relative">
              <div className="absolute inset-0 bg-gray-900 z-0">
                 {/* Premium Background */}
                 <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black"></div>
              </div>
              <div className="relative z-10 bg-[#FDCB2C] p-4 flex items-center justify-between shadow-md">
                <HelloTVLogo className="h-6" theme="light" />
                <span className="text-xs font-bold text-black uppercase tracking-widest">Chat Filiaal Breda</span>
              </div>
              <div className="flex-1 relative z-10 p-6 overflow-y-auto space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white shadow-lg w-[85%]">
                  <p className="font-bold text-[#FDCB2C] text-xs mb-1">HelloTV Breda Bot</p>
                  <p className="text-sm mb-2">Welkom bij HelloTV Breda! Waar kan ik je mee helpen?</p>
                  <div className="flex flex-col gap-2 mt-3">
                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded text-xs text-left transition-colors">📦 Is mijn TV al binnen? (Order status)</button>
                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded text-xs text-left transition-colors">⚠️ Mijn pakket is vermist (PostNL)</button>
                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded text-xs text-left transition-colors">💬 Advies over een product</button>
                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded text-xs text-left transition-colors">👔 Ik wil een medewerker spreken</button>
                  </div>
                </div>
                <div className="bg-blue-600 p-4 rounded-xl text-white shadow-lg w-[80%] ml-auto">
                  <p className="text-sm">Ik wil een medewerker spreken</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white shadow-lg w-[90%]">
                  <p className="font-bold text-[#FDCB2C] text-xs mb-1">HelloTV Breda Bot</p>
                  <p className="text-sm mb-2">Wie wil je spreken in Filiaal Breda?</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Tom van Biene', 'Joep Morsink', 'Björn', 'René Wilhelm', 'Chris Ridenberg'].map(name => (
                      <span key={name} className="px-3 py-1 bg-white/20 text-xs rounded-full cursor-pointer hover:bg-white/30">{name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calling_agents' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Filiaal & Specialist Voice Agents</h2>
              {STORES.map((store, index) => (
                <div key={index} className={`p-4 rounded-xl border cursor-pointer transition-all ${index === 0 ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`font-bold text-sm ${index === 0 ? 'text-blue-800' : 'text-gray-800'}`}>{store}</h3>
                    {index === 0 && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">Online</span>}
                  </div>
                  <p className="text-xs text-gray-500">Agent: {index === 0 ? 'Lisa (Vrouw)' : index > 3 ? 'Klantenservice Bot (M/V)' : 'Sander (Man)'}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Filiaal Breda (Testcase)</h2>
                    <p className="text-gray-400 text-sm">AI Calling Agent: "Lisa" - Inkomende & Uitgaande lijn</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <PhoneCall size={24} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Telefoonnummer</h4>
                      <p className="text-xl font-mono text-gray-900">+31 76 123 4567</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Gesprekken Vandaag</h4>
                      <p className="text-xl font-bold text-gray-900">42</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-4">Gespreksinstructies (Prompt)</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm h-48 overflow-y-auto mb-6">
                    <p>SYSTEM PROMPT:</p>
                    <p className="mt-2 text-gray-300">"Je bent Lisa, de telefonische assistent van HelloTV Filiaal Breda.</p>
                    <p className="text-gray-300">Begroet klanten vriendelijk met: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'</p>
                    <p className="text-gray-300">Als klanten vragen naar voorraad: controleer de SQL database.</p>
                    <p className="text-gray-300">Als klanten een reparatie willen melden, verwijs ze door naar het online reparatieformulier of verbind ze door met Chaima.</p>
                    <p className="text-gray-300">Sluit af met de groet: 'Tot ziens in Breda!'"</p>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        alert("Bellen met +31 76 123 4567...");
                        setTimeout(() => {
                          alert("Lisa: 'Welkom bij HelloTV Breda, u spreekt met Lisa. Wat kan ik voor u doen?'");
                        }, 1000);
                      }}
                      className="flex-1 py-3 bg-[#1D6F42] text-white rounded-xl font-bold hover:bg-green-800 flex justify-center items-center gap-2"
                    >
                      <PhoneCall size={18} /> Test Bellen
                    </button>
                    <button className="flex-1 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 flex justify-center items-center gap-2">
                      Instellingen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hessey_api' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
            <div className="bg-gray-900 p-6 flex justify-between items-center text-white border-b border-gray-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FDCB2C] rounded-xl flex items-center justify-center">
                  <Database className="text-gray-900" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">helloTV Bakwagen Systeemintegratie (Transport)</h2>
                  <p className="text-gray-400 text-sm">Directe API koppeling met Transport ERP & AI-modules</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-bold text-sm">API Connected</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Huidige API Gegevens</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">helloTV Bakwagen Endpoint URL (Transport)</p>
                    <p className="font-mono text-sm text-blue-600 bg-white p-2 rounded border border-gray-100">https://api.hellotv.nl/v1/hessey-transport/graphql</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-500 font-bold uppercase">Productie API Key</p>
                      <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">Geheim</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="password" 
                        readOnly 
                        value="htv_live_hessey_transport_982y4h92834y7t2" 
                        className="font-mono text-sm bg-white p-2 rounded border border-gray-100 flex-1 outline-none text-gray-700"
                      />
                      <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-600 transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Datastromen</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-blue-500" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Voorraad Synchronisatie</p>
                          <p className="text-xs text-gray-500">Iedere 5 minuten</p>
                        </div>
                      </div>
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-purple-500" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">Klantdata (CRM) Sync</p>
                          <p className="text-xs text-gray-500">Real-time webhooks</p>
                        </div>
                      </div>
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-orange-500" />
                        <div>
                          <p className="font-bold text-sm text-gray-900">AI Agents Knowledge Base</p>
                          <p className="text-xs text-gray-500">Gekoppeld aan helloTV Bakwagen Docs</p>
                        </div>
                      </div>
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#1D6F42] hover:bg-green-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm">
                  <RefreshCw size={18} /> Forceer Volledige Sync
                </button>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all">
                  API Documentatie
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
