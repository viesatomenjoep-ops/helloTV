import React, { useState } from 'react';
import { Truck, Calendar, MapPin, Box, CheckCircle, Clock, Search, Filter, Smartphone, CreditCard, AlertTriangle, MessageCircle, Map, Navigation, CheckSquare } from 'lucide-react';

const STORES = [
  'Alle Filialen', 'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Bergen op Zoom', 
  'Breda', 'Cruquius', 'Den Bosch', 'Doetinchem', 'Duiven', 'Eindhoven', 
  'Groningen', 'Leeuwarden', 'Nijmegen', 'Naarden', 'Rotterdam', 'Tilburg', 
  'Utrecht', 'Zoeterwoude'
];

const MOCK_VANS = [
  { id: 'BUS-1', driver: 'Sander', locatie: 'Amsterdam Centrum', status: 'Rijdend', coords: '52.3702, 4.8952', eta: '10:15 (Aankomst bij Klant)' },
  { id: 'BUS-2', driver: 'Kees', locatie: 'A2 richting Utrecht', status: 'In de file', coords: '52.15, 5.0', eta: 'Vertraging (+15m) - ETA 11:30' },
  { id: 'BUS-3', driver: 'Mohammed', locatie: 'Rotterdam Zuid', status: 'Aan het lossen', coords: '51.92, 4.48', eta: '14:00 (Lossen klaar)' },
];

const MOCK_ORDERS = [
  {
    id: 'TR-10045',
    customer: 'Johan de Vries',
    address: 'Kalverstraat 12, Amsterdam',
    filiaal: 'Amsterdam',
    date: '2026-05-04',
    timeSlot: '08:00 - 12:00',
    status: 'Ingepland',
    depot: 'Logistiek Duiven',
    driver: 'Sander (BUS-1)',
    paymentStatus: 'Betaald',
    items: [
      { sku: 'OLED65G56LA', name: 'LG 65" OLED', category: 'TV', qty: 1, checked: false },
      { sku: 'VOG-THIN545', name: 'Vogel\'s Muurbeugel', category: 'Accessoire', qty: 1, checked: false },
      { sku: 'CAB-HDMI-2M', name: 'AudioQuest Pearl 2m', category: 'Kabel', qty: 2, checked: false },
    ],
    coordinator: 'Guido'
  },
  {
    id: 'TR-10046',
    customer: 'Sanne Bakker',
    address: 'Coolsingel 45, Rotterdam',
    filiaal: 'Rotterdam',
    date: '2026-05-04',
    timeSlot: '13:00 - 17:00',
    status: 'Onderweg',
    depot: 'Logistiek DTC',
    driver: 'Mohammed (BUS-3)',
    paymentStatus: 'Openstaand € 2499',
    items: [
      { sku: 'QE65S95D', name: 'Samsung 65" QD-OLED', category: 'TV', qty: 1, checked: true },
      { sku: 'HALO-SPONGE', name: 'HaloTec Sponge', category: 'Cleaner', qty: 1, checked: true }
    ],
    coordinator: 'Rob'
  },
  {
    id: 'TR-10047',
    customer: 'Peter Jansen',
    address: 'Vredenburg 10, Utrecht',
    filiaal: 'Utrecht',
    date: '2026-05-05',
    timeSlot: 'Hele dag',
    status: 'Wacht op pick',
    depot: 'Logistiek Barbeque',
    driver: 'Nog toe te wijzen',
    paymentStatus: 'Betaald',
    items: [
      { sku: 'WEB-GENESIS', name: 'Weber Genesis II', category: 'Barbecue', qty: 1, checked: false },
      { sku: 'WEB-HOES', name: 'Weber Premium Hoes', category: 'Accessoire', qty: 1, checked: false }
    ],
    coordinator: 'Bas'
  }
];

export function Transport() {
  const [activeTab, setActiveTab] = useState<'admin' | 'installateur' | 'filiaal' | 'paklijsten'>('admin');
  const [selectedStore, setSelectedStore] = useState('Alle Filialen');
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [installateurDriver, setInstallateurDriver] = useState('Sander (BUS-1)');
  const [isPrintingPaklijst, setIsPrintingPaklijst] = useState(false);

  const handlePrintPaklijst = () => {
    setIsPrintingPaklijst(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ingepland': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Onderweg': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Afgeleverd': return 'bg-green-100 text-green-800 border-green-200';
      case 'Wacht op pick': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendPaymentLink = (order: any, method: string) => {
    const fakeLink = `https://betalen.hellotv.nl/${method.toLowerCase()}/${order.id.replace('#', '')}`;
    if (window.confirm(`Wil je de ${method} betaallink voor ${order.customer} eerst kopiëren naar je klembord voordat je hem doorstuurt?`)) {
      navigator.clipboard.writeText(fakeLink);
      alert(`Link gekopieerd: ${fakeLink}\n\nDe betaling wordt nu gecodeerd en klaargezet in het systeem.`);
    } else {
      if (window.confirm(`Weet je zeker dat je de ${method} betaallink direct wilt coderen en doorsturen naar ${order.customer}?`)) {
        alert(`Betaallink (${method}) gecodeerd en verzonden naar ${order.customer} (Order: ${order.id}) via SMS/WhatsApp.`);
      }
    }
  };

  const handlePushToStore = (order: any) => {
    if (window.confirm(`Weet je zeker dat je deze order direct wilt doorzetten naar filiaal ${order.filiaal}? De voorraad wordt direct gereserveerd!`)) {
      alert(`Order ${order.id} is geautomatiseerd doorgezet naar filiaal ${order.filiaal}. Voorraad is succesvol gereserveerd!`);
    }
  };

  const toggleCheckItem = (orderId: string, sku: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          items: o.items.map(item => item.sku === sku ? { ...item, checked: !item.checked } : item)
        };
      }
      return o;
    }));
  };

  const checkOrderComplete = (order: any) => {
    return order.items.every((i: any) => i.checked);
  };

  const handleContactWhatsApp = (orderId: string, target: string) => {
    alert(`WhatsApp geopend naar ${target} voor order: ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 print:bg-white">
      <div className={isPrintingPaklijst ? 'hidden print:hidden' : ''}>
      {/* Header */}
      <div className="bg-[#FDCB2C] text-gray-900 p-8 shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Truck size={36} className="text-gray-900" />
              helloTV Transport & Logistiek
            </h1>
            <p className="text-gray-800 font-medium">Beheer filialen, live tracking en installateurs check-out</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['admin', 'installateur', 'filiaal', 'paklijsten'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-bold rounded-lg transition-all capitalize shadow-sm backdrop-blur-sm border border-black/10 ${
                  activeTab === tab ? 'bg-black text-[#FDCB2C] scale-105' : 'bg-black/70 text-white/90 hover:bg-black/80 hover:text-white'
                }`}
              >
                {tab === 'admin' ? 'Master Admin' : tab === 'filiaal' ? 'Filiaal Overzicht' : tab === 'paklijsten' ? 'Inter-Filiaal Paklijsten' : 'Installateurs App'}
              </button>
            ))}
          </div>
        </div>
        {/* Background graphic */}
        <img src="/HelloTV.png" className="absolute -right-10 top-1/2 -translate-y-1/2 h-48 md:h-64 object-contain opacity-30 mix-blend-multiply pointer-events-none" alt="" />
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* MASTER ADMIN TAB */}
        {activeTab === 'admin' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Ingelogd als: André Wendelaar (Master Admin)</h2>
                  <p className="text-xs text-gray-500">Live Overzicht Bussen & Betalingen</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <CheckCircle size={16} /> Vendit Gekoppeld
              </div>
            </div>

            {/* LIVE TRACKER HEEL NEDERLAND */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-black text-gray-800 flex items-center gap-2">
                  <Map className="text-blue-600" /> Live GPS Tracking Heel Nederland
                </h3>
                <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> LIVE
                </span>
              </div>
              <div className="h-64 sm:h-80 bg-gray-200 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
                <div className="absolute inset-0 bg-blue-50/50"></div>
                {MOCK_VANS.map((van, idx) => (
                  <div key={van.id} className="absolute flex flex-col items-center transition-all duration-1000 ease-in-out" style={{ 
                    left: `${25 + idx * 25}%`, 
                    top: `${30 + idx * 15}%` 
                  }}>
                    <div className="bg-[#1D6F42] text-white p-3 rounded-full shadow-xl relative group cursor-pointer hover:bg-[#FDCB2C] hover:text-black hover:scale-110 transition-transform">
                      <Truck size={20} />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-2xl">
                        <p className="font-black text-[#FDCB2C] mb-1">{van.id} - {van.driver}</p>
                        <p className="mb-1"><MapPin size={10} className="inline mr-1"/>{van.locatie}</p>
                        <p className="text-green-400 font-bold"><Clock size={10} className="inline mr-1"/>{van.eta}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Actieve bussen op de weg</p>
                  <p className="text-2xl font-black text-[#1D6F42]">{MOCK_VANS.length}</p>
                </div>
              </div>
            </div>

            {/* Live Map / Viewer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2"><Map size={18} className="text-[#FDCB2C]"/> Live Bus Viewer</h3>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">3 bussen actief</span>
                </div>
                <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4 h-64 overflow-y-auto">
                  {MOCK_VANS.map(van => (
                    <div key={van.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Navigation size={48} />
                      </div>
                      <p className="font-black text-lg text-gray-900">{van.id}</p>
                      <p className="text-sm text-gray-600 font-bold mb-3">{van.driver}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-gray-50 pb-1">
                          <span className="text-gray-400">Locatie</span>
                          <span className="font-bold">{van.locatie}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-1">
                          <span className="text-gray-400">Status</span>
                          <span className={`font-bold ${van.status === 'In de file' ? 'text-orange-500' : 'text-green-500'}`}>{van.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 pb-1">
                          <span className="text-gray-400">Tijd (ETA)</span>
                          <span className={`font-bold ${van.status === 'In de file' ? 'text-orange-500' : 'text-blue-500'}`}>{van.eta}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <CreditCard className="text-blue-500" /> Snelle Betaallinks (Master)
                </h3>
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {orders.filter(o => o.paymentStatus !== 'Betaald').map(order => (
                    <div key={order.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{order.customer}</p>
                          <p className="text-xs font-mono text-gray-500">{order.id}</p>
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 mt-3">
                        <button onClick={() => handlePushToStore(order)} className="text-xs py-2 bg-[#1D6F42] text-white font-bold rounded shadow-sm hover:opacity-90 flex justify-center items-center gap-2">
                          <Box size={14} /> Bestel & Reserveer direct bij Filiaal {order.filiaal}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <button onClick={() => handleSendPaymentLink(order, 'iDEAL')} className="text-xs py-1.5 bg-[#CC0066] text-white font-bold rounded shadow-sm hover:opacity-90">iDEAL</button>
                        <button onClick={() => handleSendPaymentLink(order, 'Bancontact')} className="text-xs py-1.5 bg-[#FFCC00] text-blue-900 font-bold rounded shadow-sm hover:opacity-90">Bancontact</button>
                        <button onClick={() => handleSendPaymentLink(order, 'Creditcard')} className="text-xs py-1.5 bg-gray-800 text-white font-bold rounded shadow-sm hover:opacity-90">Creditcard</button>
                      </div>
                    </div>
                  ))}
                  {orders.filter(o => o.paymentStatus !== 'Betaald').length === 0 && (
                    <p className="text-sm text-gray-400 italic text-center mt-10">Alle actieve orders zijn betaald.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTALLATEURS APP TAB */}
        {activeTab === 'installateur' && (
          <div className="max-w-md mx-auto bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-gray-800 min-h-[700px] flex flex-col animate-in fade-in zoom-in-95">
            <div className="bg-[#1D6F42] p-6 text-white text-center relative">
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>
              <h2 className="text-xl font-black">Installateurs App</h2>
              <p className="text-sm opacity-80">{installateurDriver}</p>
              
              <button 
                onClick={() => handleContactWhatsApp('Algemeen', 'Logistiek')}
                className="p-3 bg-[#25D366] text-white rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-bold"
              >
                <MessageCircle size={20} />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-100 p-4 overflow-y-auto space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-4">Jouw Route Vandaag</p>
              
              {orders.filter(o => o.driver === installateurDriver).map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-900">{order.customer}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{order.timeSlot}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                      <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                      <span>{order.address}</span>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-xs font-black text-gray-800 uppercase">Laad Checklist</p>
                        {checkOrderComplete(order) && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle size={12}/> Klaar</span>}
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => toggleCheckItem(order.id, item.sku)}
                            className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                              item.checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              item.checked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white'
                            }`}>
                              {item.checked && <CheckSquare size={14} />}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-bold ${item.checked ? 'text-green-800 line-through opacity-70' : 'text-gray-900'}`}>
                                {item.qty}x {item.name}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">{item.sku} • {item.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!checkOrderComplete(order) && (
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold text-gray-500 mb-2">Product mist? Meld direct via WhatsApp:</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleContactWhatsApp(order.id, 'Master (André Wendelaar)')}
                            className="flex-1 py-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#25D366]/20"
                            title="Stuur WhatsApp naar Master"
                          >
                            <AlertTriangle size={12} /> Master
                          </button>
                          <button 
                            onClick={() => handleContactWhatsApp(order.id, 'Filiaal')}
                            className="flex-1 py-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#25D366]/20"
                            title="Stuur WhatsApp naar Filiaal"
                          >
                            <AlertTriangle size={12} /> Filiaal
                          </button>
                          <button 
                            onClick={() => handleContactWhatsApp(order.id, 'Logistiek')}
                            className="flex-1 py-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#25D366]/20"
                            title="Stuur WhatsApp naar Logistieke afdeling"
                          >
                            <AlertTriangle size={12} /> Logistiek
                          </button>
                        </div>
                      </div>
                    )}

                    {checkOrderComplete(order) && (
                      <div className="mt-4 border-t border-gray-100 pt-4 animate-in fade-in slide-in-from-top-2">
                        <p className="text-sm font-bold text-gray-800 mb-3">Installatie Afronden</p>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Klant Tevredenheid</label>
                            <select className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50">
                              <option>Zeer Tevreden (5/5)</option>
                              <option>Tevreden (4/5)</option>
                              <option>Neutraal (3/5)</option>
                              <option>Ontevreden (Probleem)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 block mb-1">Installatie Notities</label>
                            <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50 h-16" placeholder="Bijzonderheden tijdens installatie..."></textarea>
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 border border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                              <span className="text-xs font-bold text-gray-600 block">📷 Foto Uploaden</span>
                              <input type="file" accept="image/*" className="hidden" />
                            </label>
                            <label className="flex-1 border border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                              <span className="text-xs font-bold text-gray-600 block">🎥 Video Uploaden</span>
                              <input type="file" accept="video/*" className="hidden" />
                            </label>
                          </div>
                          <button 
                            onClick={() => {
                              alert(`Installatierapport inclusief foto/video geüpload naar de backend en direct via WhatsApp verzonden naar Masteradmin André.`);
                            }}
                            className="w-full py-3 bg-[#1D6F42] text-white font-bold rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2 hover:bg-green-800 transition-colors"
                          >
                            <CheckCircle size={18} /> Apleveren & Stuur naar WhatsApp (André)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FILIAAL OVERZICHT TAB */}
        {activeTab === 'filiaal' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Filter className="text-gray-400" />
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1D6F42] outline-none font-bold text-gray-700"
                >
                  {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Order & Klant</th>
                      <th className="px-6 py-4">Filiaal</th>
                      <th className="px-6 py-4">Status & Planning</th>
                      <th className="px-6 py-4">Producten (Aantal)</th>
                      <th className="px-6 py-4">Logistiek Coördinator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.filter(o => selectedStore === 'Alle Filialen' || o.filiaal === selectedStore).map(order => (
                      <tr key={order.id} className="hover:bg-green-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{order.customer}</div>
                          <div className="text-xs font-mono text-gray-500">{order.id}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">{order.filiaal}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold border mb-1 ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} /> {order.date} • {order.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-xs flex items-center gap-1">
                                <span className="font-bold w-4">{item.qty}x</span> 
                                <span className="text-gray-700">{item.name}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 font-bold text-xs">
                            <Smartphone size={14} /> Naar {order.coordinator}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PAKLIJSTEN TAB */}
        {activeTab === 'paklijsten' && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="font-black text-gray-800 flex items-center gap-2 text-xl mb-2">
                  <Box className="text-[#1D6F42]" size={24} /> 
                  Paklijst Inter-Filiaal (Voorraad Verplaatsingen)
                </h3>
                <p className="text-sm text-gray-500 font-bold">Van: Filiaal Breda ➔ Naar: Logistiek Duiven (DC)</p>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                      <th className="p-4 font-bold text-gray-600">Product & SKU</th>
                      <th className="p-4 font-bold text-gray-600 text-center">Aantal</th>
                      <th className="p-4 font-bold text-gray-600 text-center">Type Retour</th>
                      <th className="p-4 font-bold text-gray-600 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">Samsung 65" QD-OLED</p>
                        <p className="text-xs text-gray-500">SKU: QE65S95D</p>
                      </td>
                      <td className="p-4 text-center font-black text-lg">1</td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-red-100 text-red-800 font-bold rounded-lg text-xs">DOA</span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 text-xs transition-colors">Wacht op pick</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">LG 55" OLED evo</p>
                        <p className="text-xs text-gray-500">SKU: OLED55G5</p>
                      </td>
                      <td className="p-4 text-center font-black text-lg">1</td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 font-bold rounded-lg text-xs">Reparatie</span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="px-3 py-1 bg-[#1D6F42] text-white font-bold rounded hover:bg-green-800 text-xs transition-colors">Geladen in BUS-2</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">Vogel's Muurbeugel Thin</p>
                        <p className="text-xs text-gray-500">SKU: VOG-THIN545</p>
                      </td>
                      <td className="p-4 text-center font-black text-lg">3</td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold rounded-lg text-xs">ODM (Overschot)</span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="px-3 py-1 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 text-xs transition-colors">Wacht op pick</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  onClick={handlePrintPaklijst}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors print:hidden"
                >
                  Paklijst Printen
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm("Weet je zeker dat je deze paklijst wilt accorderen voor transport?")) {
                      alert("Paklijst geaccordeerd. Status geüpdatet naar 'Wacht op transport'.");
                    }
                  }}
                  className="px-6 py-2 bg-[#1D6F42] text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-lg"
                >
                  Accordeer & Bevestig
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Print Only Layout (Real PDF Look) */}
      {isPrintingPaklijst && (
        <div className="fixed inset-0 bg-white z-[9999] p-12 text-black text-left overflow-auto">
          <div className="print:hidden flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <h2 className="font-bold text-gray-800">Paklijst Preview & Bewerken</h2>
              <p className="text-sm text-gray-500">Controleer de paklijst voordat je print.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsPrintingPaklijst(false)} className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg">Terug naar Dashboard</button>
              <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2">
                Definitief Printen
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-start border-b-4 border-[#FDCB2C] pb-6 mb-8">
            <div>
              <img src="/HelloTV.png" alt="HelloTV Logo" className="h-16 mb-4 filter brightness-0" />
              <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900">Officiële Retour/Inter-Filiaal Paklijst</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-500">Filiaal: Breda</p>
              <p className="text-sm font-bold text-gray-500">Datum: {new Date().toLocaleDateString('nl-NL')}</p>
              <p className="text-xl font-black mt-2">TR-RET-8842</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-bold bg-gray-100 px-4 py-2 uppercase tracking-widest mb-4">Verzendgegevens</h2>
            <div className="px-4 text-sm font-medium space-y-1">
              <p>Van: Filiaal Breda</p>
              <p>transport via helloTV bakwagen</p>
              <p>Bestemming: Logistiek Centrum Duiven (DC)</p>
            </div>
          </div>

          <table className="w-full text-left mb-12">
            <thead className="bg-gray-100 border-y-2 border-gray-900">
              <tr>
                <th className="py-3 px-4 font-bold uppercase text-sm">Aantal</th>
                <th className="py-3 px-4 font-bold uppercase text-sm">Omschrijving & SKU</th>
                <th className="py-3 px-4 font-bold uppercase text-sm">Type Retour</th>
                <th className="py-3 px-4 font-bold uppercase text-sm text-right">Controle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 font-black text-lg">1x</td>
                <td className="py-4 px-4 font-bold">Samsung 65" QD-OLED <span className="text-gray-500 block text-xs">SKU: QE65S95D</span></td>
                <td className="py-4 px-4">DOA</td>
                <td className="py-4 px-4 text-right">
                  <div className="inline-block w-6 h-6 border-2 border-gray-900 rounded-sm"></div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 font-black text-lg">1x</td>
                <td className="py-4 px-4 font-bold">LG 55" OLED evo <span className="text-gray-500 block text-xs">SKU: OLED55G5</span></td>
                <td className="py-4 px-4">Reparatie</td>
                <td className="py-4 px-4 text-right">
                  <div className="inline-block w-6 h-6 border-2 border-gray-900 rounded-sm"></div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 px-4 font-black text-lg">3x</td>
                <td className="py-4 px-4 font-bold">Vogel's Muurbeugel Thin <span className="text-gray-500 block text-xs">SKU: VOG-THIN545</span></td>
                <td className="py-4 px-4">ODM</td>
                <td className="py-4 px-4 text-right">
                  <div className="inline-block w-6 h-6 border-2 border-gray-900 rounded-sm"></div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-24 flex justify-between border-t-2 border-gray-200 pt-8">
            <div className="text-center w-64">
              <div className="border-b-2 border-gray-400 h-12 mb-2"></div>
              <p className="text-sm font-bold text-gray-500">Handtekening Chauffeur (helloTV bakwagen)</p>
            </div>
            <div className="text-center w-64">
              <div className="border-b-2 border-gray-400 h-12 mb-2"></div>
              <p className="text-sm font-bold text-gray-500">Handtekening Filiaal (Breda)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
