import re

# Update NewOrderWidget.tsx
with open('src/app/components/NewOrderWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace("export function NewOrderWidget() {", "export function NewOrderWidget({ onOrderCreated }: { onOrderCreated?: () => void }) {")

# inside handleCreateOrder, after setOrderCreated(true);
completion_logic = """    setOrderCreated(true);
    if (onOrderCreated) {
      setTimeout(() => onOrderCreated(), 1500);
    }
    setTimeout(() => {
"""
content = content.replace("    setOrderCreated(true);\n    setTimeout(() => {\n", completion_logic)

with open('src/app/components/NewOrderWidget.tsx', 'w') as f:
    f.write(content)

# Update Orders.tsx
with open('src/app/components/Orders.tsx', 'r') as f:
    orders_content = f.read()

orders_content = orders_content.replace("<NewOrderWidget />", "<NewOrderWidget onOrderCreated={() => { setOrdersList([...mockOrders]); setActiveTab('overzicht'); }} />")

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(orders_content)

