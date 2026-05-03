-- 0004_hellotv_repair_schema.sql
-- Schema for Service, Repairs and DOA Management

CREATE TABLE IF NOT EXISTS public.repair_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(50) NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    ticket_type VARCHAR(50) NOT NULL CHECK (ticket_type IN ('DOA', 'Reparatie')),
    status VARCHAR(50) NOT NULL DEFAULT 'Ingekomen',
    
    -- Inname & Klacht Info
    klacht_omschrijving TEXT NOT NULL,
    accessoires_meegeleverd TEXT,
    schade_bij_inname TEXT,
    verpakking_staat VARCHAR(50),
    
    -- Logistiek
    inname_locatie VARCHAR(100) NOT NULL DEFAULT 'Filiaal Breda',
    verzend_naar VARCHAR(100) NOT NULL DEFAULT 'CE Repair Dordrecht',
    
    -- Tijd & Notificaties
    aangemeld_op TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    laatste_update TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ce_repair_reminder_sent BOOLEAN DEFAULT false,
    
    -- Klant communicatie
    bron VARCHAR(50) NOT NULL CHECK (bron IN ('WhatsApp AI Bot', 'Email', 'Winkel', 'Telefoon')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Bot interactie log
CREATE TABLE IF NOT EXISTS public.ai_repair_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    klant_telefoon VARCHAR(50),
    klant_email VARCHAR(100),
    gekozen_optie VARCHAR(100) NOT NULL, -- e.g., 'Heeft u een tv die binnen 8 dagen kapot is?'
    transcript TEXT,
    ticket_id UUID REFERENCES public.repair_tickets(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.repair_tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE public.repair_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_repair_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reparatie tickets zichtbaar voor service medewerkers"
    ON public.repair_tickets FOR ALL
    USING (auth.uid() IN (
        SELECT id FROM public.employees WHERE role IN ('Service', 'Admin', 'Manager')
    ));
