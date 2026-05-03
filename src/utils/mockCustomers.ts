import { Customer } from '../types/database';

export const mockCustomers: any[] = [
  {
    id: 'CUST-1001',
    voornaam: 'Jan',
    achternaam: 'Jansen',
    email: 'jan.jansen@example.com',
    telefoon: '06-12345678',
    postcode: '1011AA',
    huisnummer: '10',
    straat: 'Kalverstraat',
    woonplaats: 'Amsterdam',
    created_at: new Date('2026-01-15'),
    total_spent: 3499.00,
    orders: [
      { id: 'ORD-9821', datum: new Date('2026-01-20'), totaal: 2499.00, product: 'Sony BRAVIA XR-65A95L', status: 'Afgehandeld' },
      { id: 'ORD-9902', datum: new Date('2026-03-05'), totaal: 1000.00, product: 'Samsung HW-Q990D Soundbar', status: 'Afgehandeld' }
    ]
  },
  {
    id: 'CUST-1002',
    voornaam: 'Pieter',
    achternaam: 'De Vries',
    email: 'p.devries@example.com',
    telefoon: '06-87654321',
    postcode: '3011BB',
    huisnummer: '45',
    straat: 'Coolsingel',
    woonplaats: 'Rotterdam',
    created_at: new Date('2026-03-20'),
    total_spent: 1899.00,
    orders: [
      { id: 'ORD-9945', datum: new Date('2026-03-22'), totaal: 1899.00, product: 'LG OLED65G45LW', status: 'Klaar voor logistiek - Verzenden' }
    ]
  },
  {
    id: 'CUST-1003',
    voornaam: 'Sanne',
    achternaam: 'Bakker',
    email: 'sanne.bakker@example.com',
    telefoon: '06-11223344',
    postcode: '5611CC',
    huisnummer: '2',
    straat: 'Stratumseind',
    woonplaats: 'Eindhoven',
    created_at: new Date('2026-04-10'),
    total_spent: 599.00,
    orders: [
      { id: 'ORD-10012', datum: new Date('2026-04-12'), totaal: 599.00, product: 'Philips 55PUS8809', status: 'Reparatie in behandeling' }
    ]
  }
];
