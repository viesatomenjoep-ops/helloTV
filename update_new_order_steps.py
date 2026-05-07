import re

with open('src/app/components/NewOrderWidget.tsx', 'r') as f:
    content = f.read()

# Replace setOrderCreated with setOrderStep
content = content.replace("const [orderCreated, setOrderCreated] = useState(false);", "const [orderStep, setOrderStep] = useState<'idle' | 'pdf_saved' | 'sent'>('idle');")

# Modify handleCreateOrder
old_handle_create = """  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order creation and add to global mockOrders
    const newOrder = {"""

new_handle_create = """  const handleSavePdf = (e: React.MouseEvent) => {
    e.preventDefault();
    // Simulate saving PDF
    setOrderStep('pdf_saved');
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderStep !== 'pdf_saved') return;
    
    // Simulate order creation and add to global mockOrders
    const newOrder = {"""

content = content.replace(old_handle_create, new_handle_create)

# Modify completion logic
old_completion = """    setOrderCreated(true);
    if (onOrderCreated) {
      setTimeout(() => onOrderCreated(), 1500);
    }
    setTimeout(() => {
      setOrderCreated(false);
      setSelectedCustomer(null);
      setSelectedProduct('');
    }, 3000);"""

new_completion = """    setOrderStep('sent');
    if (onOrderCreated) {
      setTimeout(() => {
        onOrderCreated();
        setOrderStep('idle');
        setSelectedCustomer(null);
        setSelectedProduct('');
      }, 1500);
    } else {
      setTimeout(() => {
        setOrderStep('idle');
        setSelectedCustomer(null);
        setSelectedProduct('');
      }, 3000);
    }"""
content = content.replace(old_completion, new_completion)

# Modify the buttons
old_buttons = """            <button 
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
            </button>"""

new_buttons = """            <div className="space-y-3">
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
            </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/app/components/NewOrderWidget.tsx', 'w') as f:
    f.write(content)

