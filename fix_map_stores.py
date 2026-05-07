import re

with open('src/app/components/Transport.tsx', 'r') as f:
    content = f.read()

stores_map = """
const MAP_STORES = [
  { name: 'Alkmaar', x: 40, y: 35 },
  { name: 'Amsterdam', x: 44, y: 42 },
  { name: 'Apeldoorn', x: 65, y: 48 },
  { name: 'Bergen op Zoom', x: 30, y: 72 },
  { name: 'Breda', x: 42, y: 68 },
  { name: 'Cruquius', x: 40, y: 44 },
  { name: 'Den Bosch', x: 53, y: 65 },
  { name: 'Doetinchem', x: 78, y: 56 },
  { name: 'Duiven', x: 68, y: 57 },
  { name: 'Eindhoven', x: 56, y: 74 },
  { name: 'Groningen', x: 80, y: 15 },
  { name: 'Leeuwarden', x: 58, y: 18 },
  { name: 'Nijmegen', x: 65, y: 62 },
  { name: 'Naarden', x: 50, y: 43 },
  { name: 'Rotterdam', x: 35, y: 58 },
  { name: 'Tilburg', x: 48, y: 70 },
  { name: 'Utrecht', x: 50, y: 51 },
  { name: 'Zoeterwoude', x: 38, y: 49 }
];
"""

if "const MAP_STORES" not in content:
    content = content.replace("export function Transport() {", stores_map + "\nexport function Transport() {")
    with open('src/app/components/Transport.tsx', 'w') as f:
        f.write(content)

