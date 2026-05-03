import React, { useState } from 'react';
import { Eye, Search, Filter, Download, Plus, ShoppingCart, List, Tv, TrendingUp, AlertTriangle, ArrowRightCircle, CreditCard, RefreshCw, CheckCircle } from 'lucide-react';
import { mockOrders } from '../../utils/mockOrders';
import { getMedewerkerByCode } from '../../utils/employees';
import { OrderDetailView } from './OrderDetail';

const MOCK_PRODUCTS = [
  { id: 'OLED65G6', merk: 'LG', model: 'OLED65G66LA (2026)', categorie: 'OLED', prijs: 2499, inkoop: 1624, marge: 35, voorraad: 14 },
  { id: 'OLED55C5', merk: 'LG', model: 'OLED55C54LA (2025)', categorie: 'OLED', prijs: 1399, inkoop: 1161, marge: 17, voorraad: 42 },
  { id: 'OLED55C4', merk: 'LG', model: 'OLED55C44LA (2024)', categorie: 'OLED', prijs: 1099, inkoop: 989, marge: 10, voorraad: 8 },
  { id: 'QE65S95D', merk: 'Samsung', model: 'QE65S95D (2026)', categorie: 'QD-OLED', prijs: 2799, inkoop: 1819, marge: 35, voorraad: 21 },
  { id: 'QE55S90C', merk: 'Samsung', model: 'QE55S90C (2024)', categorie: 'QD-OLED', prijs: 1199, inkoop: 1055, marge: 12, voorraad: 3 },
  { id: 'XR65A95L', merk: 'Sony', model: 'XR-65A95L (2025)', categorie: 'QD-OLED', prijs: 3499, inkoop: 2624, marge: 25, voorraad: 5 },
  { id: '55PUS8809', merk: 'Philips', model: '55PUS8809 (2024)', categorie: 'LED', prijs: 699, inkoop: 601, marge: 14, voorraad: 15 },
  { id: '65PUS8900', merk: 'Philips', model: '65PUS8900 (2026)', categorie: 'MiniLED', prijs: 1299, inkoop: 1039, marge: 20, voorraad: 19 },
  { id: '65C805', merk: 'TCL', model: '65C805 (2025)', categorie: 'MiniLED', prijs: 899, inkoop: 629, marge: 30, voorraad: 33 },
];

export function Orders() {
  const [activeTab, setActiveTab] = useState<'overzicht' | 'upsell'>('overzicht');
  
  // Orders State
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Alle');
  const [storeFilter, setStoreFilter] = useState('Alle Filialen');
  const [channelFilter, setChannelFilter] = useState('Alle Kanalen');
  const [medewerkerCode, setMedewerkerCode] = useState('');
  const [actieveMedewerker, setActieveMedewerker] = useState<string | null>(null);

  // Upsell State
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [upsellModelId, setUpsellModelId] = useState('');
  const [bijbetaling, setBijbetaling] = useState(50);
  const [idealLink, setIdealLink] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const STORES = [
    'Alle Filialen',
    'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Bergen op Zoom', 
    'Breda', 'Cruquius', 'Den Bosch', 'Doetinchem', 
    'Duiven', 'Eindhoven', 'Groningen', 'Leeuwarden', 
    'Nijmegen', 'Naarden', 'Rotterdam', 'Tilburg', 
    'Utrecht', 'Zoeterwoude'
  ];

  const CHANNELS = ['Alle Kanalen', 'Online', 'Chat', 'Winkel', 'Mail/Tickets'];

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMedewerkerCode(val);
    const naam = getMedewerkerByCode(val);
    setActieveMedewerker(naam);
  };

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Ordernummer,Datum,Klant ID,Status,Bedrag,Verzending,Kanaal\n`;

    filteredOrders.forEach(o => {
      const row = [
        `"${o.id}"`,
        `"${o.aanschaf_datum.toLocaleDateString('nl-NL')}"`,
        `"${o.klant_id}"`,
        `"${o.status}"`,
        `"${o.order_totaal}"`,
        `"${o.verzending}"`,
        `"${o.communicatiekanaal}"`
      ];
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `HelloTV_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMargeColor = (marge: number) => {
    if (marge >= 24) return 'bg-green-100 text-green-800 border-green-200';
    if (marge >= 15) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const handleCreateUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    if(!upsellModelId) return alert('Selecteer een upsell model.');
    setIsProcessing(true);
    setIdealLink('');
    setTimeout(() => {
      setIsProcessing(false);
      setIdealLink(`https://pay.hellotv.nl/ideal/req_8f9${Math.floor(Math.random() * 1000)}`);
    }, 2000);
  };

  if (selectedOrderId) {
    const order = mockOrders.find(o => o.id === selectedOrderId);
    if (order) {
      return <OrderDetailView order={order} onBack={() => setSelectedOrderId(null)} />;
    }
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.klant_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || order.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesStore = storeFilter === 'Alle Filialen' || (order as any).filiaal === storeFilter || storeFilter === 'Alle Filialen';
    const matchesChannel = channelFilter === 'Alle Kanalen' || (order as any).communicatiekanaal === channelFilter || channelFilter === 'Alle Kanalen';

    return matchesSearch && matchesStatus && matchesStore && matchesChannel;
  });

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.model.toLowerCase().includes(productSearchTerm.toLowerCase()) || 
    p.merk.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order & Upsell Beheer</h1>
            <p className="text-gray-500 text-sm mt-1">Beheer alle orders en creëer directe upsell links</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto flex-wrap">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 w-full md:w-auto">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Users size={16} className="text-gray-500" />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Jouw code (bijv. 921)"
                  value={medewerkerCode}
                  onChange={handleCodeChange}
                  className="text-sm font-bold text-gray-800 outline-none w-32 bg-transparent"
                  maxLength={4}
                />
                {actieveMedewerker && (
                  <p className="text-xs text-green-600 font-bold">{actieveMedewerker} ingelogd</p>
                )}
              </div>
            </div>
            
            {activeTab === 'overzicht' && (
              <div className="flex gap-3">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D6F42] text-white rounded-lg font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <Download size={18} /> Exporteer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FDCB2C] text-black rounded-lg font-bold shadow-sm hover:shadow-md transition-all">
                  <Plus size={18} /> Nieuwe Order
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('overzicht')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'overzicht' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <List size={18} /> Order Overzicht
          </button>
          <button
            onClick={() => setActiveTab('upsell')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'upsell' ? 'bg-white text-blue-600 border-t-2 border-l-2 border-r-2 border-gray-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-100'
            }`}
          >
            <TrendingUp size={18} /> Directe Upsell Order
          </button>
        </div>

        {/* Order Overzicht Tab */}
        {activeTab === 'overzicht' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Zoeken op nr of klant..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select 
                  value={storeFilter}
                  onChange={(e) => setStoreFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                >
                  {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select 
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                >
                  {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                >
                  {['Alle', 'In behandeling', 'Verzonden', 'Afgeleverd', 'Geannuleerd'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Order Nr.</th>
                      <th className="px-6 py-4">Datum</th>
                      <th className="px-6 py-4">Bedrag</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Verzending</th>
                      <th className="px-6 py-4">Acties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-blue-600">#{order.id}</td>
                        <td className="px-6 py-4">{order.aanschaf_datum.toLocaleDateString('nl-NL')}</td>
                        <td className="px-6 py-4 font-medium">€{order.order_totaal.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{order.verzending}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrderId(order.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Bekijk Details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    Geen orders gevonden.
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Upsell Tab */}
        {activeTab === 'upsell' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Lijst */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Zoek model of merk (bijv. LG, 2026)..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Merk & Model</th>
                      <th className="px-6 py-4 text-right">Inkoop</th>
                      <th className="px-6 py-4 text-right">Verkoop</th>
                      <th className="px-6 py-4 text-center">Marge (%)</th>
                      <th className="px-6 py-4 text-center">Actie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{product.model}</div>
                          <div className="text-xs text-gray-500">{product.merk} • {product.categorie}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-gray-500">€{product.inkoop}</td>
                        <td className="px-6 py-4 text-right font-mono font-bold">€{product.prijs}</td>
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-block px-3 py-1 rounded-full font-bold border ${getMargeColor(product.marge)}`}>
                            {product.marge}%
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-blue-600 font-bold rounded transition-colors text-xs flex items-center gap-1 mx-auto"
                          >
                            <ArrowRightCircle size={14} /> Kies voor Upsell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upsell Widget */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col h-fit sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                <TrendingUp className="text-[#1D6F42]" /> Directe Upsell Order
              </h2>

              {selectedProduct ? (
                <form onSubmit={handleCreateUpsell} className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Huidig Model (Klant bestelling)</p>
                    <p className="font-bold text-gray-900">{selectedProduct.model}</p>
                    <p className="text-sm font-mono text-gray-500">Verkocht voor: €{selectedProduct.prijs}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Selecteer Upsell Model</label>
                    <select 
                      required
                      value={upsellModelId}
                      onChange={(e) => setUpsellModelId(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    >
                      <option value="">-- Kies een nieuwer/beter model --</option>
                      {MOCK_PRODUCTS.filter(p => p.prijs > selectedProduct.prijs).map(p => (
                        <option key={p.id} value={p.id}>
                          {p.model} (Marge: {p.marge}%) - €{p.prijs}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bijbetalingsbedrag (Klant)</label>
                    <div className="flex gap-2 mb-3">
                      {[20, 50, 100, 200, 300].map(bedrag => (
                        <button
                          type="button"
                          key={bedrag}
                          onClick={() => setBijbetaling(bedrag)}
                          className={`flex-1 py-2 text-sm font-bold rounded-lg border ${
                            bijbetaling === bedrag 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          +€{bedrag}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">€</span>
                      <input 
                        type="number"
                        value={bijbetaling}
                        onChange={(e) => setBijbetaling(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <><RefreshCw className="animate-spin" size={20} /> Order & Link genereren...</>
                    ) : (
                      <><ShoppingCart size={20} /> Maak Order & iDEAL Link</>
                    )}
                  </button>

                  {idealLink && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                        <CheckCircle size={18} /> iDEAL Link Klaar!
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-green-100 p-2 rounded-lg">
                        <CreditCard size={16} className="text-gray-400" />
                        <input 
                          type="text" 
                          readOnly 
                          value={idealLink} 
                          className="w-full text-xs font-mono outline-none bg-transparent"
                        />
                        <button 
                          type="button" 
                          onClick={() => navigator.clipboard.writeText(idealLink)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-bold whitespace-nowrap"
                        >
                          Kopieer
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <AlertTriangle className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-sm font-bold text-gray-500">
                    Selecteer een product uit de lijst om een upsell-order te starten.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
