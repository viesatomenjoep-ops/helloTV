export type OrderStatus = 
  | 'Nog niet in behandeling'
  | 'Ingenico payment - Nog niet bevestigd'
  | 'Logistiek - Betaling Akkoord'
  | 'Klaar voor logistiek - Verzenden'
  | 'Klaar voor logistiek - In behandeling'
  | 'Reparatie in behandeling'
  | 'Wacht op akkoord klant voor afspraak levering'
  | 'Afgehandeld - Nieuwe order'
  | 'Vervallen'
  | 'Retourbetaling afgehandeld';

export interface Product {
  id: string;
  productnaam: string;
  prijs: number;
  inkoopprijs: number;
  marge_euro: number;
  marge_procent: number;
  eta: Date | null;
  opmerking: string | null;
  alternatieven: string[];
  actietekst: string;
}

export interface Order {
  id: string;
  label: 'PTV' | string;
  vms: boolean;
  klant_id: string;
  order_totaal: number;
  aanschaf_datum: Date;
  laatst_gewijzigd: Date;
  verzending: string;
  betaalmethode: string;
  bezorg_datum: Date | null;
  status: OrderStatus;
  sco_status: string | null;
  online_order: boolean;
  shipping_pdf_url: string | null;
  verwerkings_datum: Date | null;
  referer: string;
}

export interface OrderDetail extends Order {
  magento_ordernummer: string;
  magento_entity_id: string;
  trustpilot_review_link: string;
  communicatiekanaal: string;
  order_regels: OrderRegel[];
  interne_memos: Memo[];
  fraud_check: FraudCheck;
}

export interface OrderRegel {
  aantal: number;
  productnaam: string;
  model_type: string;
  korting_procent: number;
  btw_procent: number;
  prijs_ex: number;
  prijs_inc: number;
  totaal_ex: number;
  totaal_inc: number;
}

export interface FraudCheck {
  aavcheck: string;
  cvccheck: string;
  cccty: string;
  ipcty: string;
}

export interface Memo {
  id: string;
  datum: Date;
  tekst: string;
  auteur: string;
}

export interface InterneBon {
  afdeling: string;
  datum: Date;
  afzender: string;
  ontvanger_dc: string;
  regels: {
    aantal: number;
    type_omschrijving: string;
    ordernummer: string;
    soort: string;
    if: string;
    v: string;
  }[];
}

export interface Customer {
  id: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  postcode: string;
  huisnummer: string;
  straat: string;
  woonplaats: string;
  created_at?: Date;
}
