import re

with open('src/app/components/NewOrderWidget.tsx', 'r') as f:
    content = f.read()

content = content.replace("status: 'Nieuwe Order (Processing)'", "status: 'Afgehandeld - Nieuwe order'")

with open('src/app/components/NewOrderWidget.tsx', 'w') as f:
    f.write(content)

