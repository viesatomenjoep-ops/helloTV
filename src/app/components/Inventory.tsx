import React, { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, TrendingDown, Edit2, MessageSquare, Mail, ShoppingCart, Truck, CheckCircle } from 'lucide-react';
import { api } from '../../utils/api';
import { mockInventory } from '../../utils/mockInventory';

export function Inventory() {
  const [activeTab, setActiveTab] = useState<'voorraad' | 'inkoop'>('voorraad');
  const [items, setItems] = useState<any[]>(mockInventory);
  
  // Voorraad State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    lowStockThreshold: 10,
    price: 0,
    category: '',
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

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const result = await api.getInventory();
      if (result.success) {
        setItems(result.items);
      }
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  };

  const handleVoorraadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createInventoryItem(formData);
      setFormData({ name: '', sku: '', quantity: 0, lowStockThreshold: 10, price: 0, category: '', depot: 'Logistiek Duiven' });
      setShowForm(false);
      loadInventory();
    } catch (error) {
      console.error('Failed to create inventory item:', error);
    }
  };

  const handleInkoopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const lowStockItems = items.filter(item => (item.stock || item.quantity) <= (item.lowStockThreshold || 10));
  const totalValue = items.reduce((sum, item) => sum + ((item.stock || item.quantity || 0) * (item.prijs || item.price || 0)), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 pb-24">
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

              <div className={`rounded-2xl shadow-lg p-6 ${
                lowStockItems.length > 0 ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' : 'bg-white'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={32} className={lowStockItems.length > 0 ? '' : 'text-orange-600'} />
                  <span className={lowStockItems.length > 0 ? 'opacity-90' : 'text-gray-600'}>Lage Voorraad</span>
                </div>
                <div className="text-4xl font-bold">{lowStockItems.length}</div>
                {lowStockItems.length > 0 && (
                  <div className="mt-2 text-sm opacity-90">⚠️ Actie vereist!</div>
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
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Voorraad</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Inkoop</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Verkoop</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Marge</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Magic Links</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Truck size={48} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Recente Inkooporders</h3>
              <p className="text-gray-500 mb-6">Nog geen orders geplaatst vandaag. Zodra je een inkooporder toewijst aan een logistiek kanaal, verschijnt deze hier ter goedkeuring voor de levering.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
