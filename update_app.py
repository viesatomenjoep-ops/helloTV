import re

with open('src/app/App.tsx', 'r') as f:
    content = f.read()

# Add ProductDashboard import
import_statement = "import { ProductDashboard } from './components/ProductDashboard';\nimport { HelloTVLogo } from './components/ui/HelloTVLogo';"
content = content.replace("import { HelloTVLogo } from './components/ui/HelloTVLogo';", import_statement)

# Update View type
type_statement = "type View = 'dashboard' | 'maick' | 'crm' | 'sales' | 'inventory' | 'quotes' | 'orders' | 'showcase' | 'hr' | 'shiftbase' | 'trainers' | 'transport' | 'media' | 'vendit' | 'reviews' | 'website' | 'reparatie' | 'magiclinks' | 'storeportal' | 'livechat' | 'producten';"
content = re.sub(r"type View = .*?;", type_statement, content)

# Add menu item
menu_item = "    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Box },\n    { id: 'producten', label: 'Producten & Marges', icon: Tv },"
content = content.replace("    { id: 'inventory', label: 'Voorraad & Inkoop', icon: Box },", menu_item)

# Add route
route = "      {currentView === 'livechat' && <LiveChatPortal />}\n      {currentView === 'producten' && <ProductDashboard />}"
content = content.replace("      {currentView === 'livechat' && <LiveChatPortal />}", route)

with open('src/app/App.tsx', 'w') as f:
    f.write(content)

