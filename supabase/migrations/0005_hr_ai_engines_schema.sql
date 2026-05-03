-- Schema for HR AI & Database Engine features

-- 1. Live Rooster Matchmaker
CREATE TABLE IF NOT EXISTS public.rooster_weer_historie (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filiaal VARCHAR(100) NOT NULL,
    datum DATE NOT NULL,
    weer_type VARCHAR(50), -- zonnig, regen, bewolkt, sneeuw
    temperatuur_celsius DECIMAL(5,2),
    verwachte_drukte_score DECIMAL(5,2), -- 1-10
    geplande_fte DECIMAL(5,2),
    historische_conversie DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Store procedures for Rooster Matchmaker (basic matching logic)
CREATE OR REPLACE FUNCTION calculate_rooster_fte_needs(p_filiaal VARCHAR, p_datum DATE, p_weer_type VARCHAR)
RETURNS DECIMAL AS $$
DECLARE
    avg_fte_needed DECIMAL;
BEGIN
    SELECT AVG(geplande_fte) INTO avg_fte_needed
    FROM public.rooster_weer_historie
    WHERE filiaal = p_filiaal AND weer_type = p_weer_type
    GROUP BY filiaal, weer_type;

    RETURN COALESCE(avg_fte_needed, 3.0); -- default 3 FTE
END;
$$ LANGUAGE plpgsql;

-- 2. Fraude & Tijdregistratie
CREATE TABLE IF NOT EXISTS public.hr_fraude_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    incident_type VARCHAR(100), -- 'GHOST_KLOK', 'PIN_MISMATCH', etc.
    omschrijving TEXT,
    betrouwbaarheid_score DECIMAL(5,2), -- 0-100% confidence
    gemeld_op TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    afgehandeld BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.pin_transacties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    transactie_tijd TIMESTAMP WITH TIME ZONE NOT NULL,
    bedrag DECIMAL(10,2),
    filiaal VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS public.inklok_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    klok_in_tijd TIMESTAMP WITH TIME ZONE NOT NULL,
    klok_uit_tijd TIMESTAMP WITH TIME ZONE,
    filiaal VARCHAR(100)
);

-- Stored Procedure: Detecteer Ghost Klokken
CREATE OR REPLACE FUNCTION scan_ghost_klokken()
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.hr_fraude_log (medewerker_id, incident_type, omschrijving, betrouwbaarheid_score)
    SELECT 
        i.medewerker_id, 
        'GHOST_KLOK', 
        'Ingeklokt op ' || i.filiaal || ' maar een pin transactie verricht op een andere locatie rond ' || t.transactie_tijd,
        99.9
    FROM public.inklok_logs i
    JOIN public.pin_transacties t ON i.medewerker_id = t.medewerker_id
    WHERE t.transactie_tijd BETWEEN i.klok_in_tijd AND COALESCE(i.klok_uit_tijd, NOW())
      AND t.filiaal != i.filiaal;
END;
$$ LANGUAGE plpgsql;

-- 3. Bonus & Promotie Engine
CREATE TABLE IF NOT EXISTS public.hr_loonschalen (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    schaal_naam VARCHAR(50) NOT NULL,
    basis_salaris DECIMAL(10,2) NOT NULL,
    target_marge DECIMAL(10,2) NOT NULL,
    bonus_percentage DECIMAL(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.hr_bonus_uitkeringen (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    maand DATE NOT NULL,
    behaalde_marge DECIMAL(10,2),
    berekende_bonus DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'BEREKEND'
);

-- Trigger: Berekent automatisch bonussen obv transacties
CREATE OR REPLACE FUNCTION bereken_maandelijkse_bonussen()
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.hr_bonus_uitkeringen (medewerker_id, maand, behaalde_marge, berekende_bonus)
    SELECT 
        t.medewerker_id,
        DATE_TRUNC('month', t.created_at)::DATE as maand,
        SUM(t.marge) as totale_marge,
        (SUM(t.marge) * 0.05) as berekende_bonus -- Basic 5% bonus assumption
    FROM public.transacties t
    GROUP BY t.medewerker_id, DATE_TRUNC('month', t.created_at)::DATE
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;
