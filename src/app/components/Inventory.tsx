import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, TrendingDown, Edit2, MessageSquare, Mail, ShoppingCart, Truck, CheckCircle, Building, Zap, ClipboardCheck, RefreshCw } from 'lucide-react';
import { api } from '../../utils/api';
import { mockInventory } from '../../utils/mockInventory';

export function Inventory() {
  const [activeTab, setActiveTab] = useState<'voorraad' | 'inkoop' | 'voorraad_per_filiaal' | 'vloercheck' | 'odm'>('voorraad');
  const [autoSyncStatus, setAutoSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle');
  const [vloercheckLocation, setVloercheckLocation] = useState('Breda');

  const [vloercheckStock, setVloercheckStock] = useState([
    { model: '55LS03F', vms: 6, phys: 6, free: 6 },
    { model: '55QN93F', vms: 3, phys: 5, free: 3 },
    { model: '55S90F', vms: 0, phys: 0, free: 0 },
    { model: '55S93F', vms: 7, phys: 7, free: 7 },
    { model: '55S95F', vms: 9, phys: 12, free: 7 },
    { model: '65LS03F', vms: 6, phys: 7, free: 7 },
    { model: '65QN93F', vms: 3, phys: 3, free: 3 },
    { model: '65S90F', vms: 2, phys: 1, free: 0 },
    { model: '65S95F', vms: 13, phys: 11, free: 8 },
    { model: 'OLED48G5', vms: 1, phys: 1, free: 1 },
    { model: 'OLED55C5', vms: 6, phys: 8, free: 7 },
    { model: 'OLED55G5', vms: 2, phys: 2, free: 2 },
    { model: 'OLED55G6', vms: 1, phys: 1, free: 1 },
    { model: 'OLED65C5', vms: 6, phys: 9, free: 7 },
    { model: 'OLED65G5', vms: 9, phys: 10, free: 9 },
    { model: '32S5L', vms: 15, phys: 15, free: 15 },
    { model: '43P79K', vms: 6, phys: 6, free: 6 },
    { model: '43P7L', vms: 3, phys: 3, free: 3 },
    { model: '50P79K', vms: 2, phys: 2, free: 2 },
    { model: '55P89K', vms: -1, phys: 0, free: 0 },
    { model: '55C69K', vms: -3, phys: 0, free: 0 },
    { model: '65C69K', vms: 1, phys: 2, free: 2 },
    { model: '43PUS9000', vms: 3, phys: 3, free: 3 },
    { model: '50PUS9000', vms: 1, phys: 1, free: 0 },
    { model: '55PUS9000', vms: 3, phys: 3, free: 3 },
    { model: '65PUS9000', vms: 2, phys: 2, free: 2 },
    { model: '55OLED810', vms: 5, phys: 5, free: 4 },
    { model: '65OLED810', vms: 3, phys: 5, free: 5 },
    { model: 'HW-Q800F', vms: 15, phys: 15, free: 15 },
    { model: 'HW-Q930F', vms: 9, phys: 9, free: 8 },
    { model: 'HW-Q990F', vms: 12, phys: 13, free: 11 },
    { model: 'Arc ultra zwart', vms: 7, phys: 6, free: 6 }
  ]);

  const handlePhysicalStockChange = (idx: number, newValue: number) => {
    const updated = [...vloercheckStock];
    updated[idx].phys = newValue;
    setVloercheckStock(updated);
    setAutoSyncStatus('idle'); // Reset auto sync since values changed manually
  };

  const handleAutoSync = () => {
    setAutoSyncStatus('syncing');
    setTimeout(() => {
      // Automate VMS Correction: set VMS = Phys
      setVloercheckStock(prev => prev.map(item => ({ ...item, vms: item.phys })));
      setAutoSyncStatus('success');
    }, 2000);
  };

  const [syncingRowIdx, setSyncingRowIdx] = useState<number | null>(null);

  const handleRowSync = (idx: number) => {
    setSyncingRowIdx(idx);
    setTimeout(() => {
      setVloercheckStock(prev => {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], vms: updated[idx].phys };
        return updated;
      });
      setSyncingRowIdx(null);
    }, 800);
  };

  const [items, setItems] = useState<any[]>(mockInventory);
  const [filterLowStock, setFilterLowStock] = useState(false);

  // ODM State
  const [odmStock, setOdmStock] = useState([
    { id: 1, model: 'Samsung QE65S95C', condition: 'Accessoire mist', quantity: 2, location: 'Rotterdam', discount: 15 },
    { id: 2, model: 'LG OLED55G3', condition: 'Schade', quantity: 1, location: 'Breda', discount: 25 },
    { id: 3, model: 'Sony XR-65A95L', condition: 'Reparaties', quantity: 1, location: 'DC Duiven', discount: 30 },
    { id: 4, model: 'Philips 55OLED808', condition: 'Als Nieuw', quantity: 3, location: 'Amsterdam', discount: 10 },
  ]);

  const [odmForm, setOdmForm] = useState({
    model: '',
    condition: 'Als Nieuw',
    quantity: 1,
    location: 'DC Duiven',
    discount: 10
  });

  const handleAddOdm = (e: React.FormEvent) => {
    e.preventDefault();
    setOdmStock([...odmStock, { ...odmForm, id: Date.now() }]);
    setOdmForm({ model: '', condition: 'Als Nieuw', quantity: 1, location: 'DC Duiven', discount: 10 });
    alert('Open Doos Model succesvol toegevoegd aan de voorraad!');
  };
  
  // Voorraad State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    lowStockThreshold: 10,
    price: 0,
    category: '',
    voorraadType: 'Standaard',
    depot: 'Logistiek Duiven',
  });

  // Inkoop State
  const [inkoopFormData, setInkoopFormData] = useState({
    leverancier: '',
    product: '',
    aantal: 0,
    inkoopprijs: 0,
    logistiek: 'Logistiek Duiven'
  });
  const [isInkopping, setIsInkopping] = useState(false);
  const [inkoopSuccess, setInkoopSuccess] = useState(false);

  // Filiaal Voorraad State
  const [selectedLocation, setSelectedLocation] = useState('Breda');
  const [allocationForm, setAllocationForm] = useState({
    product: '',
    aantal: 0,
    minVoorraad: 2,
    maxVoorraad: 10,
    whatsappAlert: true,
    emailAlert: false
  });
  const [allocationSuccess, setAllocationSuccess] = useState(false);

  const LOCATIONS = [
    // 3 Logistieke Centra
    'DC Duiven', 'DC Amsterdam', 'DC Eindhoven',
    // 18 Filialen
    'Alkmaar', 'Amsterdam', 'Apeldoorn', 'Arnhem', 'Bergen op Zoom', 'Breda',
    'Cruquius', 'Den Bosch', 'Doetinchem', 'Duiven', 'Eindhoven', 'Groningen',
    'Leeuwarden', 'Naarden', 'Nijmegen', 'Rotterdam', 'Tilburg', 'Zoeterwoude'
  ];

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    // Rely on local state initialized from mockInventory
  };

  const handleVoorraadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: formData.quantity <= formData.lowStockThreshold ? 'Low Stock' : 'In Stock',
      lastRestocked: new Date().toISOString()
    };
    setItems([newItem, ...items]);
    setFormData({ name: '', sku: '', quantity: 0, lowStockThreshold: 10, price: 0, category: '', voorraadType: 'Standaard', depot: 'Logistiek Duiven' });
    setShowForm(false);
  };

  const handleInkoopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm(`Weet je zeker dat je deze inkooporder wilt plaatsen bij ${inkoopFormData.leverancier}?`)) return;
    setIsInkopping(true);
    setTimeout(() => {
      setIsInkopping(false);
      setInkoopSuccess(true);
      setTimeout(() => {
        setInkoopSuccess(false);
        setInkoopFormData({ leverancier: '', product: '', aantal: 0, inkoopprijs: 0, logistiek: 'Logistiek Duiven' });
      }, 3000);
    }, 1500);
  };

  const handleAllocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm(`Weet je zeker dat je ${allocationForm.aantal} stuks van ${allocationForm.product} wilt reserveren voor filiaal/DC?`)) return;
    setAllocationSuccess(true);
    setTimeout(() => {
      setAllocationSuccess(false);
      setAllocationForm({ ...allocationForm, product: '', aantal: 0 });
    }, 3000);
  };

  const lowStockItems = items.filter(item => (item.stock || item.quantity) <= (item.lowStockThreshold || 10));
  const totalValue = items.reduce((sum, item) => sum + ((item.stock || item.quantity || 0) * (item.prijs || item.price || 0)), 0);

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Voorraad & Inkoop</h1>
          <p className="text-gray-600">Beheer voorraadniveaus of plaats inkooporders (Guido, Rob, Joeri & Bas).</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2">
          <button
            onClick={() => setActiveTab('voorraad')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'voorraad' ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Package size={18} /> Voorraadbeheer
          </button>
          <button
            onClick={() => setActiveTab('inkoop')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'inkoop' ? 'bg-[#1D6F42] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart size={18} /> Inkoopsysteem (Guido, Rob, Joeri & Bas)
          </button>
          <button
            onClick={() => setActiveTab('voorraad_per_filiaal')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'voorraad_per_filiaal' ? 'bg-[#FDCB2C] text-black' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Building size={18} /> Voorraad per Filiaal & DC
          </button>
          <button
            onClick={() => setActiveTab('vloercheck')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'vloercheck' ? 'bg-[#1D6F42] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ClipboardCheck size={18} /> Vloercheck
          </button>
          <button
            onClick={() => setActiveTab('odm')}
            className={`px-6 py-3 font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'odm' ? 'bg-[#ff6b6b] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Package size={18} /> Open Doos (ODM)
          </button>
        </div>

        {/* Tab 1: Voorraadbeheer */}
        {activeTab === 'voorraad' && (
          <div>
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow font-bold"
              >
                <Plus size={20} />
                Nieuw Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Package size={32} className="text-blue-600" />
                  <span className="text-gray-600">Totaal Producten</span>
                </div>
                <div className="text-4xl font-bold text-gray-800">{items.length}</div>
              </div>

              <div 
                onClick={() => { setActiveTab('voorraad'); setFilterLowStock(!filterLowStock); }}
                className={`rounded-2xl shadow-lg p-6 cursor-pointer transition-transform hover:scale-105 ${
                lowStockItems.length > 0 ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : 'bg-white'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={32} className={lowStockItems.length > 0 ? '' : 'text-orange-600'} />
                  <span className={lowStockItems.length > 0 ? 'opacity-90' : 'text-gray-600'}>Lage Voorraad</span>
                </div>
                <div className="text-4xl font-bold">{lowStockItems.length}</div>
                {lowStockItems.length > 0 && (
                  <div className="mt-2 text-sm opacity-90">⚠️ Actie vereist! Klik om te bekijken</div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown size={32} className="text-green-600" />
                  <span className="text-gray-600">Totale Waarde</span>
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  €{totalValue.toLocaleString('nl-NL', { minimumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Nieuw Product Toevoegen</h2>
                <form onSubmit={handleVoorraadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Naam</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aantal</label>
                    <input
                      type="number"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lage Voorraad Drempel</label>
                    <input
                      type="number"
                      value={formData.lowStockThreshold}
                      onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prijs (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voorraad Type</label>
                    <select
                      value={formData.voorraadType}
                      onChange={(e) => setFormData({ ...formData, voorraadType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Standaard">Standaard (Regulier)</option>
                      <option value="ODM">ODM (Original Design Manufacturer)</option>
                      <option value="Geel">Gele Voorraad (Veiligheidsvoorraad voor upsells)</option>
                      <option value="Groen">Groene Voorraad (Overjarig, mag verkocht worden)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logistiek Depot</label>
                    <select
                      value={formData.depot}
                      onChange={(e) => setFormData({ ...formData, depot: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Logistiek Duiven">Logistiek Duiven</option>
                      <option value="Logistiek DTC">Logistiek DTC</option>
                      <option value="Logistiek Barbeque">Logistiek Barbeque</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow font-bold"
                    >
                      Opslaan
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-bold"
                    >
                      Annuleren
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">SKU</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Categorie</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Voorraad</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Inkoop</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verkoop</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Marge</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Magic Links</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filterLowStock ? lowStockItems : items).filter(item => 
                    item.model?.toLowerCase().includes(search?.toLowerCase() || '') ||
                    item.brand?.toLowerCase().includes(search?.toLowerCase() || '')
                  ).map((item) => {
                      const isLowStock = (item.stock || item.quantity) <= (item.lowStockThreshold || 10);
                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            isLowStock ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-800">{item.productnaam || item.name}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-mono text-sm">{item.id || item.sku}</td>
                          <td className="px-6 py-4">
                            {item.category && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {item.category}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {item.voorraadType === 'ODM' && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded font-bold text-xs">ODM</span>}
                            {item.voorraadType === 'Geel' && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded font-bold text-xs" title="Veiligheidsvoorraad Upsells">Geel</span>}
                            {item.voorraadType === 'Groen' && <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-300 rounded font-bold text-xs" title="Overjarig">Groen</span>}
                            {(!item.voorraadType || item.voorraadType === 'Standaard') && <span className="text-gray-400 text-xs">-</span>}
                          </td>
                          <td className="px-6 py-4">
                            <div className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                              {item.stock || item.quantity} stuks
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            €{item.inkoopprijs?.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) || '0.00'}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            €{item.prijs?.toLocaleString('nl-NL', { minimumFractionDigits: 2 }) || '0.00'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-green-600">{Math.round((item.marge_procent || 0) * 100)}%</span>
                              <span className="text-xs text-gray-500">(€{item.marge_euro?.toLocaleString('nl-NL', { minimumFractionDigits: 2 })})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <a href={`https://wa.me/?text=Interesse%20in%20${encodeURIComponent(item.productnaam || item.name)}`} target="_blank" rel="noreferrer" className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors tooltip" title="Deel via WhatsApp">
                                <MessageSquare size={16} />
                              </a>
                              <a href={`mailto:?subject=Offerte%20Aanvraag:%20${encodeURIComponent(item.productnaam || item.name)}&body=Ik%20heb%20interesse%20in%20deze%20TV.`} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors tooltip" title="Deel via E-mail">
                                <Mail size={16} />
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {isLowStock ? (
                              <span className="flex items-center gap-2 text-red-600 font-medium">
                                <AlertTriangle size={16} />
                                Lage voorraad
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">Op voorraad</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Voorraad per Filiaal & DC */}
        {activeTab === 'voorraad_per_filiaal' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Kies Locatie</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 font-bold text-gray-700 border-b border-gray-200">
                  Logistieke Centra (DC)
                </div>
                <div className="flex flex-col">
                  {LOCATIONS.slice(0, 3).map(loc => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-left p-4 font-bold transition-colors border-b border-gray-100 last:border-0 ${
                        selectedLocation === loc ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 font-bold text-gray-700 border-y border-gray-200">
                  18 Winkels (Filialen)
                </div>
                <div className="flex flex-col max-h-[400px] overflow-y-auto">
                  {LOCATIONS.slice(3).map(loc => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-left p-3 font-medium transition-colors border-b border-gray-100 last:border-0 ${
                        selectedLocation === loc ? 'bg-[#FDCB2C]/20 text-black font-bold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Filiaal {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Voorraad: {selectedLocation}</h2>
                    <p className="text-gray-500">Huidige toegewezen items en notificatie-instellingen.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
                      <MessageSquare size={14} /> WhatsApp Actief
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex items-center gap-1">
                      <Mail size={14} /> E-mail Actief
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 font-bold text-gray-700">Product (SKU)</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Huidige Voorraad</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Type</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Min (Kritiek)</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Max (Veilig)</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-bold">QE65S95F (Samsung QD-OLED)</td>
                        <td className="p-4 text-center text-lg font-black">10</td>
                        <td className="p-4 text-center"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded font-bold text-xs">ODM</span></td>
                        <td className="p-4 text-center text-gray-500">2</td>
                        <td className="p-4 text-center text-gray-500">15</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Gezond</span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-bold">OLED55G5 (LG OLED evo)</td>
                        <td className="p-4 text-center text-lg font-black text-red-600">1</td>
                        <td className="p-4 text-center"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-bold text-xs">Geel</span></td>
                        <td className="p-4 text-center text-gray-500">3</td>
                        <td className="p-4 text-center text-gray-500">10</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold animate-pulse">Kritiek</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-bold">Bravia 9 75" (Sony MiniLED)</td>
                        <td className="p-4 text-center text-lg font-black">4</td>
                        <td className="p-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-800 rounded font-bold text-xs">Groen</span></td>
                        <td className="p-4 text-center text-gray-500">1</td>
                        <td className="p-4 text-center text-gray-500">5</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Gezond</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="text-blue-600" /> Voorraad Toebedelen aan {selectedLocation}
                </h3>
                
                <form onSubmit={handleAllocationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Selecteer Product</label>
                      <select 
                        required
                        value={allocationForm.product}
                        onChange={(e) => setAllocationForm({...allocationForm, product: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Kies een product uit algemene voorraad --</option>
                        <option value="QE65S95F">Samsung QE65S95F (14 beschikbaar)</option>
                        <option value="OLED65G5">LG OLED65G5 (8 beschikbaar)</option>
                        <option value="XR65A95L">Sony XR-65A95L (5 beschikbaar)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Aantal Toebedelen</label>
                      <input 
                        type="number" 
                        min="1"
                        required
                        value={allocationForm.aantal}
                        onChange={(e) => setAllocationForm({...allocationForm, aantal: Number(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Minimale Voorraad (Kritiek Alarm)</label>
                      <input 
                        type="number" 
                        min="0"
                        value={allocationForm.minVoorraad}
                        onChange={(e) => setAllocationForm({...allocationForm, minVoorraad: Number(e.target.value)})}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-red-600 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Maximale Voorraad (Veilig)</label>
                      <input 
                        type="number" 
                        min="1"
                        value={allocationForm.maxVoorraad}
                        onChange={(e) => setAllocationForm({...allocationForm, maxVoorraad: Number(e.target.value)})}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-green-600 font-bold"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col gap-3">
                    <p className="text-sm font-bold text-blue-900 mb-1">Dagelijkse Notificatie Instellingen</p>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={allocationForm.whatsappAlert}
                        onChange={(e) => setAllocationForm({...allocationForm, whatsappAlert: e.target.checked})}
                        className="w-5 h-5 rounded text-blue-600"
                      />
                      <span className="text-sm text-blue-800 flex items-center gap-2"><MessageSquare size={16}/> Stuur WhatsApp-bericht bij kritieke voorraad</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={allocationForm.emailAlert}
                        onChange={(e) => setAllocationForm({...allocationForm, emailAlert: e.target.checked})}
                        className="w-5 h-5 rounded text-blue-600"
                      />
                      <span className="text-sm text-blue-800 flex items-center gap-2"><Mail size={16}/> Stuur dagelijkse E-mail rapportage</span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2"
                  >
                    {allocationSuccess ? <><CheckCircle size={20} /> Succesvol Toebedeeld!</> : <><Truck size={20} /> Bevestig Voorraad Toewijzing</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inkoopsysteem (Guido & Rob) */}
        {activeTab === 'inkoop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Truck className="text-[#1D6F42]" /> 
                Nieuwe Inkooporder
              </h2>
              <p className="text-gray-500 mb-6">Plaats een inkooporder voor interne distributie.</p>

              {inkoopSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-top-4">
                  <CheckCircle size={48} className="text-green-500 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Inkooporder Verzonden!</h3>
                  <p className="text-sm">De inkooporder wordt verwerkt in de geselecteerde logistieke flow ({inkoopFormData.logistiek}).</p>
                </div>
              ) : (
                <form onSubmit={handleInkoopSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Leverancier</label>
                    <input
                      type="text"
                      required
                      placeholder="Bijv. Samsung B.V."
                      value={inkoopFormData.leverancier}
                      onChange={(e) => setInkoopFormData({ ...inkoopFormData, leverancier: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1D6F42] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product</label>
                    <select
                      required
                      value={inkoopFormData.product}
                      onChange={(e) => setInkoopFormData({ ...inkoopFormData, product: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1D6F42] outline-none"
                    >
                      <option value="">Selecteer product...</option>
                      {items.map(i => (
                        <option key={i.id} value={i.productnaam || i.name}>{i.productnaam || i.name}</option>
                      ))}
                      <option value="nieuw">-- Nieuw product (Nog niet in assortiment) --</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Aantal</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={inkoopFormData.aantal || ''}
                        onChange={(e) => setInkoopFormData({ ...inkoopFormData, aantal: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1D6F42] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Inkoopprijs p/s</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        value={inkoopFormData.inkoopprijs || ''}
                        onChange={(e) => setInkoopFormData({ ...inkoopFormData, inkoopprijs: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1D6F42] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Distributie & Logistiek Kanaal</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setInkoopFormData({ ...inkoopFormData, logistiek: 'Logistiek Duiven' })}
                        className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                          inkoopFormData.logistiek === 'Logistiek Duiven' 
                            ? 'border-[#1D6F42] bg-green-50 text-[#1D6F42]' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        Logistiek Duiven
                      </button>
                      <button
                        type="button"
                        onClick={() => setInkoopFormData({ ...inkoopFormData, logistiek: 'Logistiek DTC' })}
                        className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                          inkoopFormData.logistiek === 'Logistiek DTC' 
                            ? 'border-[#1D6F42] bg-green-50 text-[#1D6F42]' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        Logistiek DTC
                      </button>
                      <button
                        type="button"
                        onClick={() => setInkoopFormData({ ...inkoopFormData, logistiek: 'Logistiek Barbeque' })}
                        className={`p-3 rounded-lg border-2 text-sm font-bold transition-all ${
                          inkoopFormData.logistiek === 'Logistiek Barbeque' 
                            ? 'border-[#1D6F42] bg-green-50 text-[#1D6F42]' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        Logistiek Barbeque <span className="block text-xs font-normal text-gray-400">(Fase 2)</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isInkopping}
                    className="w-full py-4 mt-4 bg-[#1D6F42] text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-green-800 transition-all shadow-md disabled:opacity-70"
                  >
                    {isInkopping ? 'Order Verwerken...' : 'Plaats Inkooporder'}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Building className="text-blue-600" />
                Inkoopbedrijven & Leveranciers
              </h3>
              <p className="text-gray-500 mb-6">Voeg leveranciers toe en beheer API-koppelingen/automations.</p>

              {/* Form to add supplier */}
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-100">
                <h4 className="font-bold text-sm text-gray-700 mb-3">Nieuw Bedrijf Toevoegen</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Naam leverancier (bijv. Samsung B.V.)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1D6F42] outline-none" />
                  <input type="email" placeholder="Contact e-mailadres voor orders" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1D6F42] outline-none" />
                  <button onClick={() => alert('Leverancier succesvol toegevoegd aan inkoopdatabase!')} className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm mt-2">
                    Voeg Bedrijf Toe
                  </button>
                </div>
              </div>

              {/* Automations list */}
              <h4 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
                <Zap className="text-yellow-500" size={18} fill="currentColor" /> Actieve Automations
              </h4>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:border-gray-300 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-gray-800">Auto-Order bij Lage Voorraad</p>
                    <p className="text-xs text-gray-500 mt-1">Verstuurt bestelformulier naar leverancier bij &lt; 5 stuks</p>
                  </div>
                  <div className="w-11 h-6 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:border-gray-300 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-gray-800">Vendit Auto-Factuur Fetch</p>
                    <p className="text-xs text-gray-500 mt-1">Haalt inkoopfacturen automatisch op voor Vendit POS</p>
                  </div>
                  <div className="w-11 h-6 bg-green-500 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:border-gray-300 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-gray-800">Logistiek Notificaties (Duiven)</p>
                    <p className="text-xs text-gray-500 mt-1">Stuur tracking/aanmelding direct door naar depot</p>
                  </div>
                  <div className="w-11 h-6 bg-gray-300 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Vloercheck */}
        {activeTab === 'vloercheck' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ClipboardCheck className="text-[#1D6F42]" /> 
                  Voorraadverschillen (Vloercheck {vloercheckLocation})
                </h2>
                <p className="text-gray-500">Controleer en automatiseer correcties tussen VMS en fysieke winkelvoorraad.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <select 
                  value={vloercheckLocation}
                  onChange={(e) => {
                    setVloercheckLocation(e.target.value);
                    setAutoSyncStatus('idle'); // Reset sync status when changing location
                  }}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#1D6F42]"
                >
                  <optgroup label="Filialen">
                    {LOCATIONS.filter(loc => !loc.includes('DC')).map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Logistieke Centra">
                    {LOCATIONS.filter(loc => loc.includes('DC')).map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                </select>

                <button 
                  onClick={handleAutoSync}
                  disabled={autoSyncStatus === 'syncing' || autoSyncStatus === 'success'}
                  className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md ${
                    autoSyncStatus === 'success' ? 'bg-green-100 text-green-800 cursor-default' :
                    autoSyncStatus === 'syncing' ? 'bg-blue-100 text-blue-800 cursor-wait' :
                    'bg-[#1D6F42] hover:bg-green-800 text-white'
                  }`}
                >
                  {autoSyncStatus === 'success' ? <><CheckCircle size={18} /> Alles Gesynchroniseerd!</> :
                   autoSyncStatus === 'syncing' ? <><RefreshCw size={18} className="animate-spin" /> Bezig met Syncen...</> :
                   <><RefreshCw size={18} /> Synchroniseer Alles naar VMS</>}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-700">Model</th>
                    <th className="p-4 font-bold text-gray-700 text-center">VMS Voorraad</th>
                    <th className="p-4 font-bold text-gray-700 text-center">Fysieke Voorraad</th>
                    <th className="p-4 font-bold text-gray-700 text-center">Vrije Voorraad</th>
                    <th className="p-4 font-bold text-gray-700 text-center">Status</th>
                    <th className="p-4 font-bold text-gray-700 text-center">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {vloercheckStock.map((item, idx) => {
                    const hasDifference = item.vms !== item.phys;
                    const isNegative = item.vms < 0;
                    return (
                      <tr key={idx} className={`border-b border-gray-100 ${hasDifference ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                        <td className="p-4 font-bold text-gray-900">{item.model}</td>
                        <td className={`p-4 text-center font-mono ${isNegative ? 'text-red-600 font-bold' : ''}`}>
                          {item.vms}
                        </td>
                        <td className="p-4 text-center">
                          <input 
                            type="number" 
                            className="w-20 px-2 py-1 border border-gray-300 rounded font-mono font-bold text-center outline-none focus:ring-2 focus:ring-[#1D6F42] bg-white shadow-sm"
                            value={item.phys}
                            onChange={(e) => handlePhysicalStockChange(idx, Number(e.target.value))}
                          />
                        </td>
                        <td className="p-4 text-center text-gray-600">{item.free}</td>
                        <td className="p-4 text-center">
                          {!hasDifference ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold flex items-center justify-center gap-1">
                              <CheckCircle size={12} /> Correct
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold flex items-center justify-center gap-1">
                              <AlertTriangle size={12} /> Verschil: {item.phys - item.vms > 0 ? '+' : ''}{item.phys - item.vms}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {hasDifference ? (
                            <button 
                              onClick={() => handleRowSync(idx)}
                              disabled={syncingRowIdx === idx}
                              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1 mx-auto transition-colors disabled:opacity-50"
                            >
                              {syncingRowIdx === idx ? <><RefreshCw size={14} className="animate-spin" /> Sync...</> : <><RefreshCw size={14} /> Sync VMS</>}
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs font-bold">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Open Doos Modellen (ODM) */}
        {activeTab === 'odm' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Open Doos Modellen (ODM) Beheer</h2>
            <p className="text-gray-500 mb-6">Registreer en beheer geretourneerde producten, reparaties en producten met lichte schade of ontbrekende accessoires.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Nieuwe ODM Registreren</h3>
                <form onSubmit={handleAddOdm} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Model / Product</label>
                    <input 
                      type="text" 
                      required 
                      value={odmForm.model}
                      onChange={(e) => setOdmForm({...odmForm, model: e.target.value})}
                      placeholder="Bijv. Samsung 65QN90C"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status / Conditie</label>
                    <select 
                      value={odmForm.condition}
                      onChange={(e) => setOdmForm({...odmForm, condition: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                    >
                      <option value="Als Nieuw">Als Nieuw</option>
                      <option value="Accessoire mist">Accessoire mist</option>
                      <option value="Schade">Schade (bijv. krasjes)</option>
                      <option value="Reparaties">Reparaties</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Aantal</label>
                      <input 
                        type="number" 
                        min="1"
                        required 
                        value={odmForm.quantity}
                        onChange={(e) => setOdmForm({...odmForm, quantity: Number(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Korting (%)</label>
                      <input 
                        type="number" 
                        min="0"
                        max="100"
                        required 
                        value={odmForm.discount}
                        onChange={(e) => setOdmForm({...odmForm, discount: Number(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Locatie (Voorraad)</label>
                    <select 
                      value={odmForm.location}
                      onChange={(e) => setOdmForm({...odmForm, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#ff6b6b]"
                    >
                      {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#ff6b6b] text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-sm">
                    Voeg ODM Toe
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 font-bold text-gray-700">Product Model</th>
                        <th className="p-4 font-bold text-gray-700">Conditie</th>
                        <th className="p-4 font-bold text-gray-700">Locatie</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Voorraad</th>
                        <th className="p-4 font-bold text-gray-700 text-center">Actie Korting</th>
                      </tr>
                    </thead>
                    <tbody>
                      {odmStock.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-4 font-bold text-gray-900">{item.model}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              item.condition === 'Als Nieuw' ? 'bg-green-100 text-green-700' :
                              item.condition === 'Accessoire mist' ? 'bg-orange-100 text-orange-700' :
                              item.condition === 'Schade' ? 'bg-red-100 text-red-700' :
                              'bg-gray-200 text-gray-800'
                            }`}>
                              {item.condition}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{item.location}</td>
                          <td className="p-4 text-center font-bold">{item.quantity}</td>
                          <td className="p-4 text-center text-red-600 font-bold">-{item.discount}%</td>
                        </tr>
                      ))}
                      {odmStock.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">Geen Open Doos Modellen gevonden.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
