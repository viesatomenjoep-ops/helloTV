import re

with open('src/app/components/MediaPortal.tsx', 'r') as f:
    content = f.read()

# Add laudItems state
state_code = """  const [laudItems, setLaudItems] = useState([
    { id: 1, title: 'Zomer_Sale_4K.mp4', status: 'Live (Web + 18 Stores)' },
    { id: 2, title: 'OLED_Promo_2026.mp4', status: 'Live (Web + 18 Stores)' }
  ]);

  const [laudInput, setLaudInput] = useState('');
  const [laudText, setLaudText] = useState('');

  const handleLaudUpload = () => {
    if (!laudInput) return;
    const newItem = {
      id: Date.now(),
      title: laudInput.split('\\\\').pop()?.split('/').pop() || 'Nieuwe_Upload.mp4',
      status: 'Synchroniseren...'
    };
    setLaudItems([newItem, ...laudItems]);
    setLaudInput('');
    setLaudText('');
    
    // Simuleer upload & sync process
    setTimeout(() => {
      setLaudItems(prev => prev.map(item => 
        item.id === newItem.id ? { ...item, status: 'Live (Web + 18 Stores)' } : item
      ));
      alert(`Bestand ${newItem.title} is succesvol geüpload naar LAUD Media en wordt nu afgespeeld in de filialen!`);
    }, 2000);
  };"""

content = re.sub(r'  const \[formData, setFormData\] = useState.*?\}\);', state_code + "\n\n  const [formData, setFormData] = useState({\n    title: '',\n    type: 'youtube',\n    url: '',\n    description: ''\n  });", content, flags=re.DOTALL)

# Update the LAUD media block
laud_block = """            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Upload /> LAUD Upload: 4K Video & Foto's
                </h3>
                
                <div className="border-2 border-dashed border-indigo-300 rounded-xl p-6 text-center bg-white hover:bg-indigo-50/50 transition-colors mb-4 relative overflow-hidden">
                  <input 
                    type="file" 
                    accept="video/*,image/*" 
                    onChange={(e) => setLaudInput(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Video size={36} className="mx-auto text-indigo-400 mb-2" />
                  <p className="font-bold text-indigo-900 mb-1 text-sm">Klik of sleep MP4/MOV/JPG hierheen</p>
                  <p className="text-xs text-gray-500 mb-2">Max 5GB per bestand (Automatische compressie voor web & schermen)</p>
                  <div className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-colors inline-block">
                    {laudInput ? laudInput.split('\\\\').pop()?.split('/').pop() : 'Bestand Selecteren'}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-indigo-900 mb-2">Website Tekst / Prijskaart Info</label>
                  <textarea
                    rows={3}
                    value={laudText}
                    onChange={(e) => setLaudText(e.target.value)}
                    placeholder="Voer hier de actietekst in die op de website én in de winkel moet verschijnen..."
                    className="w-full px-4 py-3 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                  />
                </div>

                <button 
                  onClick={handleLaudUpload}
                  disabled={!laudInput}
                  className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md ${!laudInput ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                  <Save size={18} /> Implementeer Direct op Website & Schermen
                </button>

                <div className="bg-white p-4 rounded-xl border border-indigo-100 text-sm mt-4">
                  <p className="font-bold text-gray-800 mb-2">LAUD API Target (Endpoint):</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block text-indigo-700">POST https://api.loudmedia.com/v1/laud/sync</code>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Database className="text-blue-500" /> Web & Store Sync
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Synchroniseer het HelloTV assortiment inclusief geüploade 4K video's realtime met de website en de Loud Media prijskaarten.
                  </p>
                  <button className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Server size={18} /> Push Prijzen & Content via LAUD API
                  </button>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">Actieve Uitzendingen (Loud Media)</h3>
                  <p className="text-sm text-yellow-800 mb-4">Er draaien momenteel {laudItems.length + 21} video's in de filialen en op de website. Laatste sync was net nog.</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {laudItems.map(item => (
                      <div key={item.id} className="bg-white p-3 rounded-lg border border-yellow-100 flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-800 truncate max-w-[200px]">{item.title}</span>
                        <span className={`font-bold ${item.status.includes('Live') ? 'text-green-600' : 'text-orange-500 animate-pulse'}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>"""

content = re.sub(r'            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">.*?</div>\n          </div>', laud_block + '\n          </div>', content, flags=re.DOTALL)

with open('src/app/components/MediaPortal.tsx', 'w') as f:
    f.write(content)

