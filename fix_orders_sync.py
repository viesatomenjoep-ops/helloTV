import re

with open('src/app/components/Orders.tsx', 'r') as f:
    content = f.read()

# Add useEffect hook after setOrdersList
hook = """
  useEffect(() => {
    if (activeTab === 'overzicht') {
      setOrdersList([...mockOrders]);
    }
  }, [activeTab]);
"""

content = content.replace("  const [ordersList, setOrdersList] = useState(mockOrders);", "  const [ordersList, setOrdersList] = useState(mockOrders);" + hook)

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(content)

