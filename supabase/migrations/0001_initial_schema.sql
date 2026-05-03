-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  productnaam TEXT NOT NULL,
  prijs NUMERIC(10, 2) NOT NULL,
  inkoopprijs NUMERIC(10, 2) NOT NULL,
  marge_euro NUMERIC(10, 2) NOT NULL,
  marge_procent NUMERIC(5, 4) NOT NULL,
  eta TIMESTAMP WITH TIME ZONE,
  opmerking TEXT,
  alternatieven TEXT[],
  actietekst TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table (klant_id is referenced)
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL DEFAULT 'PTV',
  vms BOOLEAN NOT NULL DEFAULT false,
  klant_id UUID REFERENCES public.customers(id),
  order_totaal NUMERIC(10, 2) NOT NULL,
  aanschaf_datum TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  laatst_gewijzigd TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verzending TEXT NOT NULL,
  betaalmethode TEXT NOT NULL,
  bezorg_datum TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL,
  sco_status TEXT,
  online_order BOOLEAN NOT NULL DEFAULT false,
  shipping_pdf_url TEXT,
  verwerkings_datum TIMESTAMP WITH TIME ZONE,
  referer TEXT NOT NULL
);

-- Order Details extension (1-to-1 with orders)
CREATE TABLE public.order_details (
  order_id UUID PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE,
  magento_ordernummer TEXT,
  magento_entity_id TEXT,
  trustpilot_review_link TEXT,
  communicatiekanaal TEXT
);

-- Order Regels (Line Items)
CREATE TABLE public.order_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  aantal INTEGER NOT NULL,
  productnaam TEXT NOT NULL,
  model_type TEXT,
  korting_procent NUMERIC(5, 2),
  btw_procent NUMERIC(5, 2),
  prijs_ex NUMERIC(10, 2),
  prijs_inc NUMERIC(10, 2),
  totaal_ex NUMERIC(10, 2),
  totaal_inc NUMERIC(10, 2)
);

-- Memos
CREATE TABLE public.memos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  datum TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tekst TEXT NOT NULL,
  auteur TEXT NOT NULL
);

-- Fraud Checks
CREATE TABLE public.fraud_checks (
  order_id UUID PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE,
  aavcheck TEXT,
  cvccheck TEXT,
  cccty TEXT,
  ipcty TEXT
);

-- Interne Bonnen
CREATE TABLE public.internal_receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  afdeling TEXT NOT NULL,
  datum TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  afzender TEXT NOT NULL,
  ontvanger_dc TEXT NOT NULL
);

-- Interne Bon Regels
CREATE TABLE public.internal_receipt_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  receipt_id UUID REFERENCES public.internal_receipts(id) ON DELETE CASCADE,
  aantal INTEGER NOT NULL,
  type_omschrijving TEXT NOT NULL,
  ordernummer TEXT NOT NULL,
  soort TEXT,
  "if" TEXT,
  v TEXT
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_receipt_lines ENABLE ROW LEVEL SECURITY;
