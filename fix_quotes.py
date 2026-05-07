import re

with open('src/app/components/Quotes.tsx', 'r') as f:
    content = f.read()

# Add ShoppingCart import
if "ShoppingCart" not in content[:300]:
    content = content.replace("Plus } from 'lucide-react';", "Plus, ShoppingCart, UserPlus, Package } from 'lucide-react';")
if "SqlTerminal" not in content[:300]:
    content = content.replace("import { getMedewerkerByCode } from '../../utils/employees';", "import { getMedewerkerByCode } from '../../utils/employees';\nimport { SqlTerminal } from './SqlTerminal';")

# Add state
state_search = "const [quotes, setQuotes] = useState(mockQuotes);"
new_state = "const [quotes, setQuotes] = useState(mockQuotes);\n  const [showNewQuote, setShowNewQuote] = useState(false);\n  const [newQuoteStep, setNewQuoteStep] = useState<'idle' | 'pdf_saved' | 'sent'>('idle');\n  const [quoteCustomer, setQuoteCustomer] = useState('Dhr. de Vries');\n  const [quoteProduct, setQuoteProduct] = useState('LG OLED65G4');\n  const [quotePrice, setQuotePrice] = useState(2499.00);"
content = content.replace(state_search, new_state)

# Replace the alert button
btn_search = """          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-bold rounded-xl shadow-sm transition-all"
            onClick={() => alert('Nieuwe Offerte maken is momenteel in ontwikkeling.')}
          >
            <Plus size={20} />
            Maak Offerte
          </button>"""

new_btn = """          <button 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-bold rounded-xl shadow-sm transition-all"
            onClick={() => setShowNewQuote(true)}
          >
            <Plus size={20} />
            Maak Offerte
          </button>"""
content = content.replace(btn_search, new_btn)

# Render New Quote Form
new_quote_render = """
      {showNewQuote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative">
            <button onClick={() => {setShowNewQuote(false); setNewQuoteStep('idle');}} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold">SLUITEN (X)</button>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FileText className="text-blue-600" /> Nieuwe Offerte Aanmaken</h2>
            
            {newQuoteStep === 'idle' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Klantnaam</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" value={quoteCustomer} onChange={e => setQuoteCustomer(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product (TV Model)</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" value={quoteProduct} onChange={e => setQuoteProduct(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Offerte Prijs (€)</label>
                  <input type="number" value={quotePrice} onChange={e => setQuotePrice(Number(e.target.value))} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-lg" />
                </div>
                
                <button 
                  onClick={() => setNewQuoteStep('pdf_saved')}
                  className="w-full py-4 bg-white border border-gray-300 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-gray-50 mt-4"
                >
                  Genereer Offerte PDF
                </button>
              </div>
            )}

            {newQuoteStep === 'pdf_saved' && (
              <div className="space-y-4 text-center">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Offerte PDF Succesvol Gegenereerd</h3>
                <p className="text-gray-500">Klaar om in te schieten in de database.</p>
                <button 
                  onClick={() => setNewQuoteStep('sent')}
                  className="w-full py-4 mt-6 bg-[#FDCB2C] hover:bg-yellow-500 text-black rounded-xl font-black shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart size={20} /> Bevestig & Push naar Backend
                </button>
              </div>
            )}
            
            {newQuoteStep === 'sent' && (
              <SqlTerminal 
                query={`INSERT INTO quotes (id, klant_naam, bedrag, status) VALUES ('OFF-${Math.floor(Math.random() * 10000)}', '${quoteCustomer}', ${quotePrice}, 'Concept');`}
                onComplete={() => {
                  setQuotes([{
                    id: `OFF-9${Math.floor(Math.random() * 1000)}`,
                    klant_id: 'CUST-NIEUW',
                    klant_naam: quoteCustomer,
                    klant_email: 'klant@mail.nl',
                    order_totaal: quotePrice,
                    status: 'Concept',
                    aanschaf_datum: new Date(),
                    geldig_tot: new Date(Date.now() + 14*24*60*60*1000),
                    filiaal: storeFilter !== 'Alle Filialen' ? storeFilter : 'Amsterdam',
                    kanaal: 'Winkel',
                    verkoper_id: medewerkerCode || 'Onbekend',
                    producten: [{ naam: quoteProduct, prijs: quotePrice, aantal: 1 }]
                  } as any, ...quotes]);
                  setShowSuccessMsg(`Offerte voor ${quoteCustomer} succesvol aangemaakt!`);
                  setShowNewQuote(false);
                  setNewQuoteStep('idle');
                  setTimeout(() => setShowSuccessMsg(''), 5000);
                }} 
              />
            )}
          </div>
        </div>
      )}
"""

# Insert right after the top header bar
content = content.replace("      {showSuccessMsg && (", new_quote_render + "\n      {showSuccessMsg && (")

with open('src/app/components/Quotes.tsx', 'w') as f:
    f.write(content)

