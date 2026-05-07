import re

# Update NewOrderWidget.tsx
with open('src/app/components/NewOrderWidget.tsx', 'r') as f:
    content = f.read()

# Make sure to import SqlTerminal
content = content.replace("import { Customer } from '../../types/database';", "import { Customer } from '../../types/database';\nimport { SqlTerminal } from './SqlTerminal';")

# In handleCreateOrder, we want to show SqlTerminal when sent, but not immediately close!
old_completion = """    setOrderStep('sent');
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

new_completion = """    setOrderStep('sent');
    // The SqlTerminal will now handle the timeout via its onComplete prop!"""
content = content.replace(old_completion, new_completion)

# Add a function to handle SqlTerminal complete
handle_sql_complete = """
  const handleSqlComplete = () => {
    if (onOrderCreated) {
      onOrderCreated();
    }
    setOrderStep('idle');
    setSelectedCustomer(null);
    setSelectedProduct('');
  };
"""

content = content.replace("  const handleCreateOrder = (e: React.FormEvent) => {", handle_sql_complete + "\n  const handleCreateOrder = (e: React.FormEvent) => {")

# Render SqlTerminal at the end of the return
sql_render = """
      {orderStep === 'sent' && (
        <SqlTerminal 
          query={`INSERT INTO orders (id, klant_id, product, merk, totaal, status) VALUES ('${Math.floor(Math.random() * 1000000000)}', '${selectedCustomer?.id || 'onbekend'}', '${selectedProduct}', '${selectedMerk}', 999.00, 'Processing');`}
          onComplete={handleSqlComplete} 
        />
      )}
"""

content = content.replace("    </div>\n  );\n}", sql_render + "    </div>\n  );\n}")

with open('src/app/components/NewOrderWidget.tsx', 'w') as f:
    f.write(content)

# Update Orders.tsx (Upsell Order)
with open('src/app/components/Orders.tsx', 'r') as f:
    orders_content = f.read()

orders_content = orders_content.replace("import { OrderDetailView } from './OrderDetail';", "import { OrderDetailView } from './OrderDetail';\nimport { SqlTerminal } from './SqlTerminal';")

old_upsell_completion = """    // Simulate creating order and ideal link
    setTimeout(() => {
      setIdealLink(`https://pay.mollie.com/v1/checkout/${Math.random().toString(36).substring(7)}`);
      setIsProcessing(false);
      setUpsellStep('sent');
    }, 1500);"""

new_upsell_completion = """    // We set step to sent, which shows SqlTerminal
    // SqlTerminal's onComplete will then show the Ideal Link
    setUpsellStep('sent');"""
orders_content = orders_content.replace(old_upsell_completion, new_upsell_completion)

# We need a new state to show the ideal link because 'sent' is now the SQL step.
# Wait, if `upsellStep === 'sent'`, SqlTerminal shows. Then `onComplete` sets `upsellStep` to 'ideal_ready'?
state_replace = "const [upsellStep, setUpsellStep] = useState<'idle' | 'pdf_saved' | 'sent'>('idle');"
new_state_replace = "const [upsellStep, setUpsellStep] = useState<'idle' | 'pdf_saved' | 'sent' | 'ideal_ready'>('idle');"
orders_content = orders_content.replace(state_replace, new_state_replace)

# Render SqlTerminal for Upsell
sql_upsell_render = """
        {upsellStep === 'sent' && (
          <SqlTerminal 
            query={`INSERT INTO upsell_orders (order_id, product, brand, price_inc) VALUES ('${upsellOrderId}', '${selectedProduct?.model}', '${selectedProduct?.merk}', ${bijbetaling});`}
            onComplete={() => {
              setIdealLink(`https://pay.mollie.com/v1/checkout/${Math.random().toString(36).substring(7)}`);
              setIsProcessing(false);
              setUpsellStep('ideal_ready');
            }} 
          />
        )}
"""

orders_content = orders_content.replace("      </div>\n    </div>\n  );\n}", sql_upsell_render + "      </div>\n    </div>\n  );\n}")

# Fix condition for showing IDEAL link
orders_content = orders_content.replace("{idealLink && (", "{upsellStep === 'ideal_ready' && idealLink && (")

# Fix button condition for Upsell sent
orders_content = orders_content.replace("upsellStep === 'sent' ? (", "(upsellStep === 'sent' || upsellStep === 'ideal_ready') ? (")

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(orders_content)

