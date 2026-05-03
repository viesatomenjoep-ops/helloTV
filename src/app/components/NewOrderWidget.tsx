import React, { useState } from 'react';
import { Search, UserPlus, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { mockCustomers } from '../../utils/mockCustomers';
import { Customer } from '../../types/database';

export function NewOrderWidget() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);

  const searchResults = mockCustomers.filter(c => 
    c.achternaam.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.postcode.toLowerCase().includes(searchQuery.toLowerCase().replace(/\s/g, ''))
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery('');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCreated(true);
    setTimeout(() => {
      setOrderCreated(false);
      setSelectedCustomer(null);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <ShoppingCart className="text-blue-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Snelle Order Aanmaken</h2>
          <p className="text-gray-500 text-sm">Zoek op postcode of achternaam om direct een order te vullen</p>
        </div>
      </div>

      {!selectedCustomer ? (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Zoek op achternaam of postcode (bijv. 'Jansen' of '1011AA')"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery.length > 1 && (
            <div className="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => handleSelectCustomer(c)}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{c.voornaam} {c.achternaam}</div>
                      <div className="text-xs text-gray-500">{c.straat} {c.huisnummer}, {c.woonplaats}</div>
                    </div>
                    <div className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {c.postcode}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Geen klanten gevonden. Maak een nieuwe klant aan.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleCreateOrder} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 flex items-start gap-4">
            <UserPlus className="text-green-600 mt-1" size={20} />
            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-green-800 font-semibold mb-1">Klantgegevens (Auto-filled)</div>
                <div className="text-green-700">{selectedCustomer.voornaam} {selectedCustomer.achternaam}</div>
                <div className="text-green-700">{selectedCustomer.email}</div>
                <div className="text-green-700">{selectedCustomer.telefoon}</div>
              </div>
              <div>
                <div className="text-green-800 font-semibold mb-1">Adresgegevens</div>
                <div className="text-green-700">{selectedCustomer.straat} {selectedCustomer.huisnummer}</div>
                <div className="text-green-700">{selectedCustomer.postcode} {selectedCustomer.woonplaats}</div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setSelectedCustomer(null)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Wijzig
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product toevoegen</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Scan of typ productnaam..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {orderCreated ? (
                 <>
                  <CheckCircle size={20} />
                  <span>Order Succesvol Aangemaakt!</span>
                 </>
              ) : (
                <span>Maak Order Aan</span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
