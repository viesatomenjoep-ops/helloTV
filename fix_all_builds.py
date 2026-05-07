import re

# 1. Orders.tsx
with open('src/app/components/Orders.tsx', 'r') as f:
    orders = f.read()

orders = orders.replace("  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);", "  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);\n  const [editingOrder, setEditingOrder] = useState<any | null>(null);")

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(orders)

