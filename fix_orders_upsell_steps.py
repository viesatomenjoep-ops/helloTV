import re

with open('src/app/components/Orders.tsx', 'r') as f:
    content = f.read()

# Add orderStep state
state_replace = """  const [isProcessing, setIsProcessing] = useState(false);
  const [upsellStep, setUpsellStep] = useState<'idle' | 'pdf_saved' | 'sent'>('idle');"""
content = content.replace("  const [isProcessing, setIsProcessing] = useState(false);", state_replace)

# Modify the form submit logic
old_submit = """  const handleCreateUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate creating order and ideal link
    setTimeout(() => {
      setIdealLink(`https://pay.mollie.com/v1/checkout/${Math.random().toString(36).substring(7)}`);
      setIsProcessing(false);
    }, 1500);
  };"""

new_submit = """  const handleSavePdfUpsell = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setUpsellStep('pdf_saved');
      setIsProcessing(false);
    }, 800);
  };

  const handleCreateUpsell = (e: React.FormEvent) => {
    e.preventDefault();
    if (upsellStep !== 'pdf_saved') return;
    setIsProcessing(true);
    
    // Simulate creating order and ideal link
    setTimeout(() => {
      setIdealLink(`https://pay.mollie.com/v1/checkout/${Math.random().toString(36).substring(7)}`);
      setIsProcessing(false);
      setUpsellStep('sent');
    }, 1500);
  };"""

content = content.replace(old_submit, new_submit)

# Replace the buttons
old_buttons = """                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <><RefreshCw className="animate-spin" size={20} /> Order & Link genereren...</>
                    ) : (
                      <><ShoppingCart size={20} /> Maak Order & iDEAL Link</>
                    )}
                  </button>"""

new_buttons = """                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleSavePdfUpsell}
                      disabled={isProcessing || upsellStep !== 'idle'}
                      className={`w-full py-3 rounded-xl font-bold shadow-md flex justify-center items-center gap-2 transition-colors ${upsellStep !== 'idle' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      {isProcessing && upsellStep === 'idle' ? (
                        <><RefreshCw className="animate-spin" size={20} /> PDF Genereren...</>
                      ) : upsellStep !== 'idle' ? (
                        <><CheckCircle size={20} /> PDF Opgeslagen</>
                      ) : (
                        <><Download size={20} /> Sla op als PDF</>
                      )}
                    </button>

                    {upsellStep !== 'idle' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <button
                          type="submit"
                          disabled={isProcessing || upsellStep === 'sent'}
                          className="w-full py-3 bg-[#1D6F42] hover:bg-green-800 text-white font-bold rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-50"
                        >
                          {isProcessing && upsellStep === 'pdf_saved' ? (
                            <><RefreshCw className="animate-spin" size={20} /> Order & Link genereren...</>
                          ) : upsellStep === 'sent' ? (
                            <><CheckCircle size={20} /> Order & iDEAL Link Verstuurd</>
                          ) : (
                            <><ShoppingCart size={20} /> Verstuur Order & iDEAL Link</>
                          )}
                        </button>
                      </div>
                    )}
                  </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(content)

