-- Masterplan Intergravity - Hello TV OS SQL Schema

-- 1. EXTENSIONS (Voor unieke ID's)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS (Vaste opties)
CREATE TYPE contract_type AS ENUM ('Fulltime', 'Parttime');
CREATE TYPE logistiek_dept AS ENUM ('Duiven', 'Barbecue', 'Dutchy_s');
CREATE TYPE order_status AS ENUM ('Offerte', 'Orderdesk', 'Logistiek_Breda', 'Logistiek_Verzenden', 'Logistiek_Reservering', 'Afgerond');

-- 3. PERSONEEL & HR
CREATE TABLE IF NOT EXISTS Medewerkers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    naam VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    contract contract_type,
    filiaal VARCHAR(100),
    iban VARCHAR(34),
    is_admin BOOLEAN DEFAULT FALSE,
    wachtwoord_hash TEXT, -- Voor het personeelsportaal
    gekoppeld_whatsapp VARCHAR(20)
);

-- 4. VOORRAADBEHEER
CREATE TABLE IF NOT EXISTS Voorraad (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_naam VARCHAR(255),
    sku VARCHAR(50) UNIQUE,
    aantal_voorraad INT DEFAULT 0,
    afdeling logistiek_dept,
    locatie_vak VARCHAR(50),
    inkoop_prijs DECIMAL(10,2),
    verkoop_prijs DECIMAL(10,2),
    marge_per_stuk DECIMAL(10,2) GENERATED ALWAYS AS (verkoop_prijs - inkoop_prijs) STORED
);

-- 5. ORDERS & UPSELLS
CREATE TABLE IF NOT EXISTS Orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medewerker_id UUID REFERENCES Medewerkers(id),
    klant_naam VARCHAR(255),
    totaal_bedrag DECIMAL(10,2),
    status order_status DEFAULT 'Orderdesk',
    is_archive BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Upsell_Orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hoofd_order_id UUID REFERENCES Orders(id),
    extra_bedrag DECIMAL(10,2),
    ideal_link TEXT,
    is_betaald BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. REPARATIE PORTAAL
CREATE TABLE IF NOT EXISTS Reparaties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    klant_naam VARCHAR(255),
    telefoon_whatsapp VARCHAR(20),
    probleem TEXT,
    status VARCHAR(50) DEFAULT 'Nog te verwachten', -- In behandeling, etc.
    bron VARCHAR(20) -- 'WhatsApp' of 'Email'
);

-- 7. REISKOSTEN
CREATE TABLE IF NOT EXISTS Reiskosten (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medewerker_id UUID REFERENCES Medewerkers(id),
    afstand_km DECIMAL(6,2),
    bedrag DECIMAL(10,2) GENERATED ALWAYS AS (afstand_km * 0.19) STORED,
    datum DATE DEFAULT CURRENT_DATE,
    is_geexporteerd BOOLEAN DEFAULT FALSE
);

-- 8. GAMIFICATION & BONUSSEN
CREATE TABLE IF NOT EXISTS Bonus_Punten (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medewerker_id UUID REFERENCES Medewerkers(id),
    punten INT DEFAULT 0,
    maand INT,
    jaar INT,
    reden TEXT
);

-- 9. NIEUWS & MARKT
CREATE TABLE IF NOT EXISTS Nieuwsberichten (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titel VARCHAR(255),
    inhoud TEXT,
    categorie VARCHAR(50), -- bijv. 'TV-Markt' of 'Intern'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
