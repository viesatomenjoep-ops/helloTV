import { useState, useEffect } from 'react';
import { Package, Plus, AlertTriangle, TrendingDown, Edit2, MessageSquare, Mail } from 'lucide-react';
import { api } from '../../utils/api';
import { mockInventory } from '../../utils/mockInventory';

export function Inventory() {
  const [items, setItems] = useState<any[]>(mockInventory);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    lowStockThreshold: 10,
    price: 0,
    category: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createInventoryItem(formData);
      setFormData({ name: '', sku: '', quantity: 0, lowStockThreshold: 10, price: 0, category: '' });
      setShowForm(false);
      loadInventory();
    } catch (error) {
      console.error('Failed to create inventory item:', error);
    }
  };

  const totalValue = items.reduce((sum, item) => sum + ((item.stock || item.quantity || 0) * (item.prijs || item.price || 0)), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Voorraad Beheer</h1>
            <p className="text-gray-600">Beheer je producten en voorraadniveaus</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nieuw Product Toevoegen</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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

          {items.length === 0 && !showForm && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nog geen producten</p>
              <p className="text-gray-400">Klik op "Nieuw Product" om te beginnen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
