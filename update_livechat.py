import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

# Add new states
state_code = """  const [isFullScreen, setIsFullScreen] = useState(false);
  const [addressExtracted, setAddressExtracted] = useState(false);
  const [pdfState, setPdfState] = useState<'idle' | 'generating_offerte' | 'sent_offerte' | 'generating_order' | 'sent_order'>('idle');

  const extractAddress = () => {
    // Simulatie van AI extractie van naam en adres uit chat
    alert("AI heeft adresgegevens succesvol uit de chat gehaald: Tom van Biene, Breda. Deze zijn direct in Vendit gekoppeld aan de order.");
    setAddressExtracted(true);
  };

  const sendPdfOfferte = () => {
    setPdfState('generating_offerte');
    setTimeout(() => {
      setPdfState('sent_offerte');
      
      // Voeg bericht toe aan chat
      const botMsg = { id: Date.now(), sender: 'agent', text: 'Hierbij de PDF Offerte. Laat gerust weten als u vragen heeft.', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isSystem: true, pdf: 'Offerte_HelloTV.pdf' };
      setChatHistory([...chatHistory, botMsg]);

      setTimeout(() => setPdfState('idle'), 4000);
    }, 1500);
  };

  const sendPdfOrder = () => {
    setPdfState('generating_order');
    setTimeout(() => {
      setPdfState('sent_order');
      
      // Voeg bericht toe aan chat
      const botMsg = { id: Date.now(), sender: 'agent', text: 'Gefeliciteerd met uw aankoop! Hierbij de officiële PDF Order.', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isSystem: true, pdf: 'Order_HelloTV.pdf' };
      setChatHistory([...chatHistory, botMsg]);

      setTimeout(() => setPdfState('idle'), 4000);
    }, 1500);
  };
"""

content = re.sub(r'  const \[isFullScreen, setIsFullScreen\] = useState\(false\);', state_code, content)

# Modify the quick order actions
actions_block = """            {/* Quick Order Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShoppingCart size={16} className="text-purple-500" /> Directe Ordercreatie
              </h3>
              
              <button 
                onClick={extractAddress}
                className={`w-full py-2 mb-4 border font-bold rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2 ${addressExtracted ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                <Database size={16} /> 
                {addressExtracted ? 'Klantgegevens Gekoppeld' : 'Klantgegevens & Adres Ophalen'}
              </button>

              {orderState === 'idle' && (
                <button 
                  onClick={createOrder}
                  className="w-full py-3 bg-[#FDCB2C] hover:bg-yellow-500 text-black font-black rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} /> Maak Betaallink
                </button>
              )}

              {orderState === 'creating' && (
                <div className="w-full py-3 bg-gray-100 text-gray-500 font-bold rounded-xl flex items-center justify-center gap-2">
                  Order genereren...
                </div>
              )}

              {orderState === 'sent' && (
                <div className="w-full py-3 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-xl flex flex-col items-center justify-center gap-1">
                  <span>Betaallink Verstuurd!</span>
                  <span className="text-xs font-normal">Wachten op betaling klant...</span>
                </div>
              )}

              {orderState === 'paid' && (
                <div className="w-full p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl mb-3">
                  <p className="font-black flex items-center justify-center gap-2 mb-2"><CheckCircle size={18}/> Betaling Geslaagd!</p>
                  <p className="text-xs text-center font-bold text-green-700">Order is automatisch in Vendit geplaatst.</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button 
                  onClick={sendPdfOfferte}
                  disabled={pdfState !== 'idle'}
                  className="py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                >
                  <FileText size={16} /> 
                  {pdfState === 'generating_offerte' ? 'Genereren...' : pdfState === 'sent_offerte' ? 'Verzonden!' : 'Stuur PDF Offerte'}
                </button>
                <button 
                  onClick={sendPdfOrder}
                  disabled={pdfState !== 'idle'}
                  className="py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-1 text-xs"
                >
                  <FileText size={16} /> 
                  {pdfState === 'generating_order' ? 'Genereren...' : pdfState === 'sent_order' ? 'Verzonden!' : 'Stuur PDF Order'}
                </button>
              </div>
            </div>"""

content = re.sub(r'            \{\/\* Quick Order Actions \*\/.*?<\/div>\n            \n          <\/div>', actions_block + '\n            \n          </div>', content, flags=re.DOTALL)

# Modify chat render to support PDF rendering
chat_msg_replacement = """                    {msg.isSystem ? (
                      <div className="text-center my-4">
                        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">{msg.text}</span>
                        {msg.pdf && (
                           <div className="mt-2 inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm cursor-pointer hover:bg-red-100">
                             <FileText size={16} /> {msg.pdf}
                           </div>
                        )}
                      </div>
                    ) : ("""

content = re.sub(r'                    \{msg\.isSystem \? \(\n                      <div className="text-center my-4">\n                        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">\{msg\.text\}<\/span>\n                      <\/div>\n                    \) : \(', chat_msg_replacement, content)

# Also ensure `Database` is imported from lucide-react
if 'Database' not in content:
    content = content.replace('MessageSquare, Phone, User, ExternalLink, Settings, Maximize2, Minimize2', 'MessageSquare, Phone, User, ExternalLink, Settings, Maximize2, Minimize2, Database')

with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

