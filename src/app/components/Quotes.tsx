import { useState } from 'react';
import { Eye, Search, Filter, FileText, CheckCircle } from 'lucide-react';
import { mockQuotes } from '../../utils/mockQuotes';
import { mockOrders } from '../../utils/mockOrders';
import { QuoteDetailView } from './QuoteDetail';
import { OrderDetail } from '../../types/database';

export function Quotes() {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState('');

  const handleConvertToOrder = (quoteId: string) => {
    // Vind de offerte
    const quoteIndex = quotes.findIndex(q => q.id === quoteId);
    if (quoteIndex === -1) return;
    
    const quote = quotes[quoteIndex];

    // Update de offerte status
    const updatedQuotes = [...quotes];
    updatedQuotes[quoteIndex] = { ...quote, status: 'Omgezet naar Order' };
    setQuotes(updatedQuotes);

    // Maak een nieuwe order aan in mockOrders
    const newOrder: OrderDetail = {
      id: `ORD-9${Math.floor(Math.random() * 1000)}`,
      klant_id: quote.klant_id,
      order_totaal: quote.order_totaal,
      status: 'In behandeling',
      aanschaf_datum: new Date(),
      betaalmethode: 'Op factuur',
      verzending: 'HelloTV Bezorgservice',
      communicatiekanaal: 'Offerte',
      magento_ordernummer: `MG-9${Math.floor(Math.random() * 1000)}`,
      fraud_check: {
        aavcheck: 'Match',
        cvccheck: 'Match',
        cccty: 'NL',
        ipcty: 'NL'
      },
      order_regels: quote.producten.map((p: any) => ({
        productnaam: p.naam,
        model_type: 'Standaard',
        aantal: p.aantal,
        prijs_ex: p.prijs * 0.79, // reverse 21% btw approx
        totaal_inc: p.prijs * p.aantal
      })),
      interne_memos: [
        {
          id: `MEM-${Math.floor(Math.random() * 1000)}`,
          datum: new Date(),
          auteur: 'Systeem',
          tekst: `Order automatisch aangemaakt vanuit offerte ${quote.id}.`
        }
      ]
    };
    
    mockOrders.unshift(newOrder); // Voeg toe bovenaan de orders

    setSelectedQuoteId(null);
    setShowSuccessMsg(`Offerte ${quote.id} is succesvol omgezet naar order ${newOrder.id}!`);
    
    setTimeout(() => {
      setShowSuccessMsg('');
    }, 5000);
  };

  if (selectedQuoteId) {
    const quote = quotes.find(q => q.id === selectedQuoteId);
    if (quote) {
      return (
        <QuoteDetailView 
          quote={quote} 
          onBack={() => setSelectedQuoteId(null)} 
          onConvertToOrder={handleConvertToOrder}
        />
      );
    }
  }

  const filteredQuotes = quotes.filter(quote => 
    quote.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    quote.klant_naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.klant_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Offertebeheer</h1>
          <p className="text-gray-500 text-sm mt-1">Beheer en zet offertes om naar orders</p>
        </div>
      </div>

      {showSuccessMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="text-green-600" size={24} />
          <span className="font-bold">{showSuccessMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Zoeken op offertenummer of klant..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Offerte Nr.</th>
                <th className="px-6 py-4">Klant</th>
                <th className="px-6 py-4">Datum</th>
                <th className="px-6 py-4">Bedrag</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">#{quote.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{quote.klant_naam}</td>
                  <td className="px-6 py-4">{quote.aanschaf_datum.toLocaleDateString('nl-NL')}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">€{quote.order_totaal.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      quote.status === 'Omgezet naar Order' ? 'bg-purple-100 text-purple-800' :
                      quote.status === 'Goedgekeurd door klant' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedQuoteId(quote.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-medium"
                      title="Bekijk Details"
                    >
                      <Eye size={18} />
                      <span className="ml-1">Bekijk</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQuotes.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 font-medium">Geen offertes gevonden.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
