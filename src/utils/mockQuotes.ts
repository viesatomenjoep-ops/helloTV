import { OrderStatus } from '../types/database';

export const mockQuotes = [
  {
    id: 'QTE-8001',
    klant_id: 'CUST-1004',
    klant_naam: 'Thomas van den Berg',
    order_totaal: 4299.00,
    aanschaf_datum: new Date('2026-05-01'),
    status: 'In afwachting van klant',
    geldig_tot: new Date('2026-05-15'),
    producten: [
      { naam: 'Sony BRAVIA XR-85X95L', prijs: 3999.00, aantal: 1 },
      { naam: 'Vogel\'s THIN 505 Muurbeugel', prijs: 300.00, aantal: 1 }
    ]
  },
  {
    id: 'QTE-8002',
    klant_id: 'CUST-1005',
    klant_naam: 'Emma de Jong',
    order_totaal: 1450.00,
    aanschaf_datum: new Date('2026-05-02'),
    status: 'Goedgekeurd door klant',
    geldig_tot: new Date('2026-05-16'),
    producten: [
      { naam: 'Samsung HW-Q990D Soundbar', prijs: 1400.00, aantal: 1 },
      { naam: 'HDMI 2.1 Kabel 2M', prijs: 50.00, aantal: 1 }
    ]
  }
];
