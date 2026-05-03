import { useState, useEffect } from 'react';
import { FileText, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { api } from '../../utils/api';

export function Quotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    amount: 0,
    description: '',
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const result = await api.getQuotes();
      if (result.success) {
        setQuotes(result.quotes);
      }
    } catch (error) {
      console.error('Failed to load quotes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createQuote(formData);
      setFormData({ customerName: '', amount: 0, description: '' });
      setShowForm(false);
      loadQuotes();
    } catch (error) {
      console.error('Failed to create quote:', error);
    }
  };

  const updateStatus = async (quoteId: string, status: string) => {
    try {
      await api.updateQuote(quoteId, status);
      loadQuotes();
    } catch (error) {
      console.error('Failed to update quote:', error);
    }
  };

  const pending = quotes.filter(q => q.status === 'pending');
  const accepted = quotes.filter(q => q.status === 'accepted');
  const rejected = quotes.filter(q => q.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Offertes</h1>
            <p className="text-gray-600">Beheer je offertes en aanvragen</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus size={20} />
            Nieuwe Offerte
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={32} />
              <span className="text-sm opacity-90">In Behandeling</span>
            </div>
            <div className="text-4xl font-bold">{pending.length}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={32} />
              <span className="text-sm opacity-90">Geaccepteerd</span>
            </div>
            <div className="text-4xl font-bold">{accepted.length}</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <XCircle size={32} />
              <span className="text-sm opacity-90">Afgewezen</span>
            </div>
            <div className="text-4xl font-bold">{rejected.length}</div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Nieuwe Offerte Maken</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Klant Naam</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrag (€)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beschrijving</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  Offerte Aanmaken
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

        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{quote.customerName}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        quote.status === 'pending'
                          ? 'bg-orange-100 text-orange-800'
                          : quote.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {quote.status === 'pending' ? 'In Behandeling' : quote.status === 'accepted' ? 'Geaccepteerd' : 'Afgewezen'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{quote.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>Bedrag: <span className="font-semibold text-gray-800">€{quote.amount?.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span></span>
                    <span>Aangemaakt: {new Date(quote.createdAt).toLocaleDateString('nl-NL')}</span>
                  </div>
                </div>
                {quote.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(quote.id, 'accepted')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Accepteren
                    </button>
                    <button
                      onClick={() => updateStatus(quote.id, 'rejected')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XCircle size={18} />
                      Afwijzen
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {quotes.length === 0 && !showForm && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nog geen offertes</p>
              <p className="text-gray-400">Klik op "Nieuwe Offerte" om te beginnen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
