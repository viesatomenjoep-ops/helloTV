-- Schema for Hello Base Modules (Feedback, Beschikbaarheid, Plus-Min Uren, Nieuws, Bestanden, Kioskcodes)

CREATE TABLE IF NOT EXISTS public.hello_base_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    feedback_text TEXT NOT NULL,
    categorie VARCHAR(100),
    datum TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.hello_base_beschikbaarheid (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    datum DATE NOT NULL,
    is_beschikbaar BOOLEAN DEFAULT true,
    tijd_van TIME,
    tijd_tot TIME,
    opmerking TEXT
);

CREATE TABLE IF NOT EXISTS public.hello_base_plus_min_uren (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    saldo_uren DECIMAL(10,2) DEFAULT 0.00,
    laatst_bijgewerkt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.hello_base_nieuws (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titel VARCHAR(255) NOT NULL,
    inhoud TEXT NOT NULL,
    auteur VARCHAR(100),
    publicatie_datum TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_belangrijk BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.hello_base_bestanden (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bestandsnaam VARCHAR(255) NOT NULL,
    bestand_url TEXT NOT NULL,
    categorie VARCHAR(100),
    upload_datum TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.kioskcodes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    medewerker_id UUID REFERENCES public.medewerkers(id),
    kiosk_code VARCHAR(50) NOT NULL UNIQUE, -- The login code for the kiosk
    online_nummer VARCHAR(50), -- Voor upsells online
    chat_nummer VARCHAR(50), -- Voor chat verkopen
    wm_nummer VARCHAR(50), -- Winkelmedewerker verkoopnummer (WM)
    bbq_nummer VARCHAR(50), -- Barbecue verkoopnummer (BBQ)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- VMS Sales Tracker split (Marge formule TV vs BBQ)
-- Dit kan een uitbreiding zijn op de orders tabel, door een categorie (TV, BBQ) toe te voegen
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS product_categorie VARCHAR(50) DEFAULT 'TV';
