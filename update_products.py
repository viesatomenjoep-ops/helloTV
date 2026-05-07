import re

with open('src/app/components/ProductDashboard.tsx', 'r') as f:
    content = f.read()

products_data = """
const MOCK_PRODUCTS = [
  // Samsung
  { id: 1, merk: 'Samsung', model: 'Neo QLED 8K QN900D (65") [2024]', prijs: 4999, inkoop: 3200 },
  { id: 2, merk: 'Samsung', model: 'Neo QLED 8K QN900E (65") [2025]', prijs: 5299, inkoop: 3100 },
  { id: 3, merk: 'Samsung', model: 'Neo QLED 8K QN900F (65") [2026]', prijs: 5499, inkoop: 3000 },
  { id: 4, merk: 'Samsung', model: 'OLED S95D (55") [2024]', prijs: 2499, inkoop: 1950 },
  { id: 5, merk: 'Samsung', model: 'OLED S95E (55") [2025]', prijs: 2699, inkoop: 1800 },
  { id: 6, merk: 'Samsung', model: 'OLED S95F (55") [2026]', prijs: 2899, inkoop: 1750 },
  { id: 7, merk: 'Samsung', model: 'The Frame LS03D (65") [2024]', prijs: 1999, inkoop: 1100 },
  { id: 8, merk: 'Samsung', model: 'The Frame LS03E (65") [2025]', prijs: 2199, inkoop: 1150 },
  { id: 9, merk: 'Samsung', model: 'The Frame LS03F (65") [2026]', prijs: 2299, inkoop: 1200 },

  // LG
  { id: 10, merk: 'LG', model: 'OLED evo G4 (65") [2024]', prijs: 3299, inkoop: 2100 },
  { id: 11, merk: 'LG', model: 'OLED evo G5 (65") [2025]', prijs: 3499, inkoop: 2050 },
  { id: 12, merk: 'LG', model: 'OLED evo G6 (65") [2026]', prijs: 3699, inkoop: 2100 },
  { id: 13, merk: 'LG', model: 'OLED C4 (55") [2024]', prijs: 1899, inkoop: 1350 },
  { id: 14, merk: 'LG', model: 'OLED C5 (55") [2025]', prijs: 2099, inkoop: 1300 },
  { id: 15, merk: 'LG', model: 'OLED C6 (55") [2026]', prijs: 2199, inkoop: 1320 },
  { id: 16, merk: 'LG', model: 'QNED81 (75") [2024]', prijs: 1499, inkoop: 1200 },
  { id: 17, merk: 'LG', model: 'QNED85 (75") [2025]', prijs: 1699, inkoop: 1150 },
  { id: 18, merk: 'LG', model: 'QNED90 (75") [2026]', prijs: 1899, inkoop: 1250 },

  // Sony
  { id: 19, merk: 'Sony', model: 'BRAVIA XR A95L (65") [2024]', prijs: 3999, inkoop: 2700 },
  { id: 20, merk: 'Sony', model: 'BRAVIA XR A95M (65") [2025]', prijs: 4199, inkoop: 2650 },
  { id: 21, merk: 'Sony', model: 'BRAVIA XR A95N (65") [2026]', prijs: 4399, inkoop: 2600 },
  { id: 22, merk: 'Sony', model: 'BRAVIA 8 OLED (55") [2024]', prijs: 2199, inkoop: 1550 },
  { id: 23, merk: 'Sony', model: 'BRAVIA 9 OLED (55") [2025]', prijs: 2399, inkoop: 1500 },
  { id: 24, merk: 'Sony', model: 'BRAVIA 10 OLED (55") [2026]', prijs: 2599, inkoop: 1450 },

  // Philips
  { id: 25, merk: 'Philips', model: 'OLED+908 (65") [2024]', prijs: 2999, inkoop: 1750 },
  { id: 26, merk: 'Philips', model: 'OLED+909 (65") [2025]', prijs: 3199, inkoop: 1700 },
  { id: 27, merk: 'Philips', model: 'OLED+910 (65") [2026]', prijs: 3399, inkoop: 1650 },
  { id: 28, merk: 'Philips', model: 'The One 8808 (55") [2024]', prijs: 899, inkoop: 710 },
  { id: 29, merk: 'Philips', model: 'The One 8809 (55") [2025]', prijs: 999, inkoop: 690 },
  { id: 30, merk: 'Philips', model: 'The One 8810 (55") [2026]', prijs: 1099, inkoop: 650 },

  // TCL
  { id: 31, merk: 'TCL', model: '98X955 Mini LED (98") [2024]', prijs: 4999, inkoop: 2500 },
  { id: 32, merk: 'TCL', model: '98X965 Mini LED (98") [2025]', prijs: 5499, inkoop: 2400 },
  { id: 33, merk: 'TCL', model: '115X975 Mini LED (115") [2026]', prijs: 7999, inkoop: 3500 },
  { id: 34, merk: 'TCL', model: '65C845 Mini LED (65") [2024]', prijs: 1199, inkoop: 950 },
  { id: 35, merk: 'TCL', model: '65C855 Mini LED (65") [2025]', prijs: 1299, inkoop: 900 },
  { id: 36, merk: 'TCL', model: '65C865 Mini LED (65") [2026]', prijs: 1399, inkoop: 880 },
];
"""

# Replace the MOCK_PRODUCTS array
old_array_start = "const MOCK_PRODUCTS = ["
old_array_end = "];"
content = content[:content.find(old_array_start)] + products_data + content[content.find(old_array_end) + 2:]

with open('src/app/components/ProductDashboard.tsx', 'w') as f:
    f.write(content)

