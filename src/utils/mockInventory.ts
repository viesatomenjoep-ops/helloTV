import { Product } from '../types/database';

// Helper function to calculate margin and purchase price
function generateProduct(id: string, name: string, price: number, marginPercent: number, category: string): Product & { category: string } {
  const marginProcentDecimal = marginPercent / 100;
  // If selling price is P, and margin % is M. Margin = P * M. Purchase = P - Margin.
  const marge_euro = price * marginProcentDecimal;
  const inkoopprijs = price - marge_euro;

  return {
    id,
    productnaam: name,
    prijs: price,
    inkoopprijs: Number(inkoopprijs.toFixed(2)),
    marge_euro: Number(marge_euro.toFixed(2)),
    marge_procent: marginProcentDecimal,
    eta: new Date('2026-05-15'),
    opmerking: 'Nieuwe voorraad verwacht',
    alternatieven: [],
    actietekst: '',
    category
  };
}

export const mockInventory: (Product & { category: string, stock: number })[] = [
  // --- LG TVs ---
  { ...generateProduct('LG-OLED65G4', 'LG OLED65G45LW (2024)', 2499, 25, 'TV'), stock: 12 },
  { ...generateProduct('LG-OLED65C4', 'LG OLED65C44LA (2024)', 1899, 28, 'TV'), stock: 34 },
  { ...generateProduct('LG-OLED55B4', 'LG OLED55B42LA (2024)', 1299, 22, 'TV'), stock: 5 },
  { ...generateProduct('LG-OLED65G5', 'LG OLED65G5 (2025)', 2899, 30, 'TV'), stock: 8 },
  { ...generateProduct('LG-OLED65C5', 'LG OLED65C5 (2025)', 2199, 27, 'TV'), stock: 15 },
  { ...generateProduct('LG-OLED65C6', 'LG OLED65C6 (2026 Concept)', 2499, 35, 'TV'), stock: 2 },
  
  // --- Samsung TVs ---
  { ...generateProduct('SAM-S95D', 'Samsung QE65S95D (2024)', 2699, 24, 'TV'), stock: 10 },
  { ...generateProduct('SAM-QN90D', 'Samsung QE65QN90D (2024)', 1999, 26, 'TV'), stock: 18 },
  { ...generateProduct('SAM-S95E', 'Samsung QE65S95E (2025)', 2999, 32, 'TV'), stock: 4 },
  { ...generateProduct('SAM-QN90E', 'Samsung QE65QN90E (2025)', 2299, 29, 'TV'), stock: 11 },
  { ...generateProduct('SAM-S95F', 'Samsung QE65S95F (2026 Concept)', 3199, 36, 'TV'), stock: 0 },
  
  // --- Sony TVs ---
  { ...generateProduct('SONY-BRAVIA9', 'Sony Bravia 9 65" (2024)', 3299, 21, 'TV'), stock: 6 },
  { ...generateProduct('SONY-BRAVIA8', 'Sony Bravia 8 65" (2024)', 2499, 23, 'TV'), stock: 14 },
  { ...generateProduct('SONY-BRAVIA9-25', 'Sony Bravia 9 65" (2025)', 3499, 25, 'TV'), stock: 3 },
  { ...generateProduct('SONY-BRAVIA9-26', 'Sony Bravia 9 65" (2026)', 3699, 28, 'TV'), stock: 1 },

  // --- Philips TVs ---
  { ...generateProduct('PHIL-OLED909', 'Philips 65OLED909 (2024)', 2599, 26, 'TV'), stock: 9 },
  { ...generateProduct('PHIL-OLED809', 'Philips 65OLED809 (2024)', 1999, 24, 'TV'), stock: 21 },
  { ...generateProduct('PHIL-OLED910', 'Philips 65OLED910 (2025)', 2799, 31, 'TV'), stock: 5 },
  { ...generateProduct('PHIL-OLED911', 'Philips 65OLED911 (2026 Concept)', 2999, 33, 'TV'), stock: 0 },

  // --- TCL TVs ---
  { ...generateProduct('TCL-C855', 'TCL 65C855 (2024)', 1499, 38, 'TV'), stock: 25 },
  { ...generateProduct('TCL-C955', 'TCL 65C955 (2024)', 1999, 40, 'TV'), stock: 12 },
  { ...generateProduct('TCL-C865', 'TCL 65C865 (2025)', 1599, 39, 'TV'), stock: 18 },
  { ...generateProduct('TCL-C875', 'TCL 65C875 (2026 Concept)', 1699, 42, 'TV'), stock: 4 },

  // --- Accessories (Kabels, Cleaners, etc.) ---
  { ...generateProduct('ACC-HDMI-21', 'HelloTV Premium HDMI 2.1 Kabel (2m)', 49.99, 85, 'Accessoire'), stock: 150 },
  { ...generateProduct('ACC-CLEANER', 'HelloTV Screen Cleaner Kit', 19.99, 75, 'Accessoire'), stock: 300 },
  { ...generateProduct('ACC-WALLMOUNT', 'HelloTV Ultra Slim Muurbeugel', 129.99, 65, 'Accessoire'), stock: 85 },
  { ...generateProduct('ACC-SOUNDBAR-CBL', 'Optische Audio Kabel (1.5m)', 24.99, 80, 'Accessoire'), stock: 110 }
];
