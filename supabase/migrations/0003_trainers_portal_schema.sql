-- Trainers Portal & OLED Targets Schema

CREATE TABLE IF NOT EXISTS Trainer_Targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    week_nummer VARCHAR(10) NOT NULL,
    doelstelling TEXT NOT NULL,
    target_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Filiaal_Prestaties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_id UUID REFERENCES Trainer_Targets(id),
    filiaal_naam VARCHAR(100) NOT NULL,
    behaald_percentage DECIMAL(5,2) NOT NULL,
    kleurcode VARCHAR(20) GENERATED ALWAYS AS (
        CASE 
            WHEN behaald_percentage >= 50.00 THEN 'groen'
            WHEN behaald_percentage >= 40.00 AND behaald_percentage < 50.00 THEN 'oranje'
            ELSE 'rood'
        END
    ) STORED
);

-- Seed initial data based on the provided chart: "Week 14/15 target, 1 op de 2 TV's moet OLED zijn"
INSERT INTO Trainer_Targets (id, week_nummer, doelstelling, target_percentage)
VALUES ('11111111-1111-1111-1111-111111111111', '14/15', '1 op de 2 TV''s moet OLED zijn', 50.00)
ON CONFLICT DO NOTHING;

INSERT INTO Filiaal_Prestaties (target_id, filiaal_naam, behaald_percentage) VALUES 
('11111111-1111-1111-1111-111111111111', 'Amsterdam', 40.52),
('11111111-1111-1111-1111-111111111111', 'Breda', 39.20),
('11111111-1111-1111-1111-111111111111', 'Cruquius', 56.14),
('11111111-1111-1111-1111-111111111111', 'Den Bosch', 47.47),
('11111111-1111-1111-1111-111111111111', 'Doetinchem', 48.21),
('11111111-1111-1111-1111-111111111111', 'Duiven', 48.08),
('11111111-1111-1111-1111-111111111111', 'Eindhoven', 64.41),
('11111111-1111-1111-1111-111111111111', 'Groningen', 44.19),
('11111111-1111-1111-1111-111111111111', 'Naarden', 40.38),
('11111111-1111-1111-1111-111111111111', 'Nijmegen', 53.13),
('11111111-1111-1111-1111-111111111111', 'Rotterdam', 56.20),
('11111111-1111-1111-1111-111111111111', 'Tilburg', 43.66),
('11111111-1111-1111-1111-111111111111', 'Utrecht', 50.00),
('11111111-1111-1111-1111-111111111111', 'Zoeterwoude', 39.81),
('11111111-1111-1111-1111-111111111111', 'Mail', 46.11),
('11111111-1111-1111-1111-111111111111', 'Chat', 44.14);

-- Enable RLS
ALTER TABLE public.Trainer_Targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.Filiaal_Prestaties ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow read access for all users on Trainer_Targets" 
    ON public.Trainer_Targets FOR SELECT USING (true);

CREATE POLICY "Allow read access for all users on Filiaal_Prestaties" 
    ON public.Filiaal_Prestaties FOR SELECT USING (true);

CREATE POLICY "Allow insert for all users on Trainer_Targets" 
    ON public.Trainer_Targets FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert for all users on Filiaal_Prestaties" 
    ON public.Filiaal_Prestaties FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for all users on Trainer_Targets" 
    ON public.Trainer_Targets FOR UPDATE USING (true);

CREATE POLICY "Allow update for all users on Filiaal_Prestaties" 
    ON public.Filiaal_Prestaties FOR UPDATE USING (true);
