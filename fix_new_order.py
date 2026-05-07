import re

with open('src/app/components/NewOrderWidget.tsx', 'r') as f:
    content = f.read()

# Fix the silently failing return
content = content.replace("    if (!selectedCustomer || !selectedProduct) return;", "    if (!selectedCustomer) { alert('Selecteer eerst een klant!'); return; }\n    if (!selectedProduct) { alert('Vul een product in!'); return; }")

with open('src/app/components/NewOrderWidget.tsx', 'w') as f:
    f.write(content)

