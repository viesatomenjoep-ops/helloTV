import { OrderDetail } from '../types/database';

export const mockOrders: OrderDetail[] = [
  {
    id: '261363438',
    label: 'PTV',
    vms: false,
    klant_id: 'klant-123',
    order_totaal: 2399.00,
    aanschaf_datum: new Date('2026-05-01T10:00:00Z'),
    laatst_gewijzigd: new Date('2026-05-02T14:30:00Z'),
    verzending: 'bezorgen',
    betaalmethode: 'IDEAL',
    bezorg_datum: new Date('2026-05-05T08:00:00Z'),
    status: 'Logistiek - Betaling Akkoord',
    sco_status: null,
    online_order: true,
    shipping_pdf_url: null,
    verwerkings_datum: new Date('2026-05-01T10:05:00Z'),
    referer: 'Magento API',
    magento_ordernummer: 'MG-100452',
    magento_entity_id: '9923',
    trustpilot_review_link: 'https://trustpilot.com/review/...',
    communicatiekanaal: 'email',
    order_regels: [
      {
        aantal: 1,
        productnaam: 'LG OLED65C34LA',
        model_type: 'OLED',
        korting_procent: 0,
        btw_procent: 21,
        prijs_ex: 1982.64,
        prijs_inc: 2399.00,
        totaal_ex: 1982.64,
        totaal_inc: 2399.00
      }
    ],
    interne_memos: [
      {
        id: 'memo-1',
        datum: new Date('2026-05-01T10:30:00Z'),
        tekst: 'Klant wil graag in de middag bezorgd hebben.',
        auteur: 'Sales Team'
      }
    ],
    fraud_check: {
      aavcheck: 'Match',
      cvccheck: 'Match',
      cccty: 'NL',
      ipcty: 'NL'
    }
  },
  {
    id: '261363439',
    label: 'PTV',
    vms: true,
    klant_id: 'klant-456',
    order_totaal: 899.50,
    aanschaf_datum: new Date('2026-05-02T11:15:00Z'),
    laatst_gewijzigd: new Date('2026-05-03T09:00:00Z'),
    verzending: 'Afhalen in onze winkel',
    betaalmethode: 'CREDITCARD',
    bezorg_datum: null,
    status: 'Klaar voor logistiek - In behandeling',
    sco_status: 'checked',
    online_order: false,
    shipping_pdf_url: '/pdfs/261363439.pdf',
    verwerkings_datum: new Date('2026-05-02T11:20:00Z'),
    referer: 'POS System',
    magento_ordernummer: 'MG-100453',
    magento_entity_id: '9924',
    trustpilot_review_link: '',
    communicatiekanaal: 'phone',
    order_regels: [
      {
        aantal: 1,
        productnaam: 'Samsung HW-Q990C',
        model_type: 'Soundbar',
        korting_procent: 5,
        btw_procent: 21,
        prijs_ex: 743.39,
        prijs_inc: 899.50,
        totaal_ex: 743.39,
        totaal_inc: 899.50
      }
    ],
    interne_memos: [],
    fraud_check: {
      aavcheck: 'Match',
      cvccheck: 'Match',
      cccty: 'NL',
      ipcty: 'BE'
    }
  }
];
