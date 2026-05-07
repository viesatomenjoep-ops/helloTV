import React, { useState } from 'react';
import { Search, UserPlus, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { mockCustomers } from '../../utils/mockCustomers';
import { mockOrders } from '../../utils/mockOrders';
import { Customer } from '../../types/database';
import { SqlTerminal } from './SqlTerminal';

export function NewOrderWidget({ onOrderCreated }: { onOrderCreated?: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [orderStep, setOrderStep] = useState<'idle' | 'pdf_saved' | 'sent'>('idle');
  const [selectedMerk, setSelectedMerk] = useState('Samsung');
  const [selectedProduct, setSelectedProduct] = useState('');

  const searchResults = mockCustomers.filter(c => 
    c.achternaam.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.postcode.toLowerCase().includes(searchQuery.toLowerCase().replace(/\s/g, ''))
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery('');
  };

  const handleSavePdf = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simulate saving PDF
    setOrderStep('pdf_saved');
  };


  const handleSqlComplete = () => {
    if (onOrderCreated) {
      onOrderCreated();
    }
    setOrderStep('idle');
    setSelectedCustomer(null);
    setSelectedProduct('');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderStep !== 'pdf_saved') return;
    
    // Simulate order creation and add to global mockOrders
    const newOrder = {
      id: Math.floor(Math.random() * 1000000000).toString(),
      label: 'PTV',
      vms: false,
      klant_id: selectedCustomer?.id || 'onbekend',
      order_totaal: 999.00,
      aanschaf_datum: new Date(),
      laatst_gewijzigd: new Date(),
      verzending: 'bezorgen',
      betaalmethode: 'IDEAL',
      bezorg_datum: null,
      status: 'Afgehandeld - Nieuwe order',
      sco_status: null,
      online_order: false,
      shipping_pdf_url: null,
      verwerkings_datum: new Date(),
      referer: 'Dashboard Snel-Order',
      magento_ordernummer: `MG-Snel-${Math.floor(Math.random() * 10000)}`,
      magento_entity_id: '9999',
      trustpilot_review_link: '',
      communicatiekanaal: 'Winkel',
      order_regels: [
        {
          aantal: 1,
          productnaam: selectedProduct || 'Onbekend Product',
          model_type: selectedMerk,
          korting_procent: 0,
          btw_procent: 21,
          prijs_ex: 825.62,
          prijs_inc: 999.00,
          totaal_ex: 825.62,
          totaal_inc: 999.00
        }
      ],
      interne_memos: [],
      fraud_check: {
        aavcheck: 'Match',
        cvccheck: 'Match',
        cccty: 'NL',
        ipcty: 'NL'
      }
    };
    
    mockOrders.unshift(newOrder as any);
    
    setOrderStep('sent');
    // The SqlTerminal will now handle the timeout via its onComplete prop!
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merk</label>
                <select 
                  value={selectedMerk}
                  onChange={(e) => setSelectedMerk(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Sony">Sony</option>
                  <option value="Philips">Philips</option>
                  <option value="TCL">TCL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    placeholder="Typ productnaam..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                type="button"
                onClick={handleSavePdf}
                disabled={orderStep !== 'idle'}
                className={`w-full py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2 ${orderStep !== 'idle' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {orderStep !== 'idle' ? <><CheckCircle size={20} /> PDF Opgeslagen</> : 'Sla op als PDF'}
              </button>
              
              {orderStep !== 'idle' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <button 
                    type="submit" 
                    disabled={orderStep === 'sent'}
                    className="w-full py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black rounded-xl font-black shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {orderStep === 'sent' ? (
                       <>
                        <CheckCircle size={20} />
                        <span>Order Verstuurd!</span>
                       </>
                    ) : (
                      <span>Verstuur Order</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      {orderStep === 'sent' && (
        <SqlTerminal 
          query={`INSERT INTO orders (id, klant_id, product, merk, totaal, status) VALUES ('${Math.floor(Math.random() * 1000000000)}', '${selectedCustomer?.id || 'onbekend'}', '${selectedProduct}', '${selectedMerk}', 999.00, 'Processing');`}
          onComplete={handleSqlComplete} 
        />
      )}
    </div>
  );
}
