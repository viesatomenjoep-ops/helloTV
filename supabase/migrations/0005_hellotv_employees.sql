-- 0005_hellotv_employees.sql
-- Maakt een gedetailleerde medewerkerstabel aan inclusief WhatsApp/Signal statussen.

CREATE TABLE IF NOT EXISTS public.hello_employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    naam TEXT NOT NULL,
    whatsapp_naam TEXT,
    status_tekst TEXT,
    rol TEXT DEFAULT 'Verkoper',
    is_beheerder BOOLEAN DEFAULT false,
    telefoonnummer TEXT,
    beschikbaarheid_status TEXT DEFAULT 'Onbekend',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) aanzetten
ALTER TABLE public.hello_employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Iedereen kan medewerkers zien"
    ON public.hello_employees
    FOR SELECT
    USING (true);

-- Dummy Data / Scraped Data
INSERT INTO public.hello_employees (naam, whatsapp_naam, status_tekst, rol, is_beheerder, telefoonnummer, beschikbaarheid_status) VALUES
('André Wendelaar', 'André Wendelaar', 'Beschikbaar', 'Verkoper', false, NULL, 'Beschikbaar'),
('Anita Rutjes', 'Anita Rutjes Werktelefoon', '☀️ Afwezig tot 11 mei', 'Staf', false, NULL, 'Afwezig'),
('Anne', 'Anne Hellotv', '🔥', 'Verkoper', false, NULL, 'Online'),
('Björn', 'Bjurn Hellotv', 'Aan het sporten', 'Verkoper', false, NULL, 'Bezig'),
('Boris', 'Boris Hellotv', '🔴⚪', 'Verkoper', false, NULL, 'Online'),
('Calvin', 'Calvin Htv', 'Kan het niet gewoon weer zomer wor...', 'Verkoper', false, NULL, 'Online'),
('Chaima', 'Chaima', 'Delen is vermenigvuldigen 🧸', 'Reparatie / Service', false, NULL, 'Online'),
('Danny', 'Danny hellotv', 'Bezig', 'Verkoper', false, NULL, 'Bezig'),
('Denyon', 'Denyon', 'Beschikbaar', 'Verkoper', false, NULL, 'Beschikbaar'),
('Eertwijn', 'Eertwijn', 'Beschikbaar', 'Verkoper', false, NULL, 'Beschikbaar'),
('Farshid', 'Farshid', NULL, 'Verkoper', false, NULL, 'Online'),
('Gosse', 'Gosse HTV', 'Eindelijk wakker', 'Verkoper', false, NULL, 'Online'),
('Ronald Gebhardt', 'Ronald Gebhardt', 'Bezig', 'Verkoper', false, NULL, 'Bezig'),
('Guido', '~ Guido', NULL, 'Beheerder / Directie', true, '+31 6 43027973', 'Online'),
('Heleen', 'Heleen', 'Aan het slapen', 'Reparatie / Service', false, NULL, 'Afwezig'),
('Ivo', 'Ivo Htv', 'Beschikbaar', 'Verkoper', false, NULL, 'Beschikbaar'),
('Jari', 'Jari', NULL, 'Verkoper', false, NULL, 'Online'),
('Joep Morsink', 'Joep Morsink', 'Torn From Oblivion', 'Beheerder / CRM', true, NULL, 'Online'),
('Joeri', 'Joeri Inkoper', 'Beschikbaar', 'Inkoop', false, NULL, 'Beschikbaar'),
('Johan Kuivenhoven', 'Johan Kuivenhoven HTV', 'Beschikbaar', 'Verkoper', false, NULL, 'Beschikbaar'),
('Josef dB', 'Josef dB Hellotv', 'Busy', 'Verkoper', false, NULL, 'Bezig'),
('Kim', 'Kim', NULL, 'Staf', false, NULL, 'Online'),
('Kin Lam', 'Kin Lam', 'HKV', 'Verkoper', false, NULL, 'Online'),
('Loek Kok', 'Loek Kok', 'Loek Breda', 'Verkoper', false, NULL, 'Online'),
('Maick', 'Maick Hellotv', 'Having fun 🥂😎', 'Beheerder', true, NULL, 'Online'),
('Masie', 'Masie Hellotv', NULL, 'Verkoper', false, NULL, 'Online'),
('Max', 'Max HelloTV', '🔒', 'Verkoper', false, NULL, 'Online'),
('Menno', 'Menno HelloTV', NULL, 'Verkoper', false, NULL, 'Online'),
('Michael D.', 'Michael!! D', 'Available', 'Verkoper', false, NULL, 'Beschikbaar'),
('Nick F', 'Nick F', NULL, 'Verkoper', false, NULL, 'Online'),
('Paul de Boer', 'Paul de Boer', 'Bezig', 'Verkoper', false, NULL, 'Bezig'),
('Tom van Biene', 'Jij', 'Voeg lidtag toe', 'Beheerder', true, NULL, 'Online');
