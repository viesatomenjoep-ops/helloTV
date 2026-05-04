-- Cashback Acties Schema

CREATE TABLE IF NOT EXISTS public.cashback_acties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merk VARCHAR(100) NOT NULL, -- TCL, LG, Philips, Sony
    actie_naam VARCHAR(255) NOT NULL,
    omschrijving TEXT,
    start_datum DATE,
    eind_datum DATE,
    pdf_url TEXT,
    instructies_whatsapp TEXT,
    status VARCHAR(50) DEFAULT 'Actief'
);

-- Registraties voor cashbacks
CREATE TABLE IF NOT EXISTS public.cashback_registraties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actie_id UUID REFERENCES public.cashback_acties(id) ON DELETE CASCADE,
    order_id VARCHAR(100),
    klant_naam VARCHAR(255),
    klant_telefoon VARCHAR(50),
    whatsapp_verzonden BOOLEAN DEFAULT false,
    datum_verzonden TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.cashback_acties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashback_registraties ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow read access for authenticated users on cashback_acties" 
    ON public.cashback_acties FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated users on cashback_acties" 
    ON public.cashback_acties FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow read access for authenticated users on cashback_registraties" 
    ON public.cashback_registraties FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated users on cashback_registraties" 
    ON public.cashback_registraties FOR INSERT TO authenticated WITH CHECK (true);
