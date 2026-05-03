import { Customer } from '../types/database';

export const mockCustomers: Customer[] = [
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
    created_at: new Date('2026-01-15')
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
    created_at: new Date('2026-03-20')
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
    created_at: new Date('2026-04-10')
  }
];
