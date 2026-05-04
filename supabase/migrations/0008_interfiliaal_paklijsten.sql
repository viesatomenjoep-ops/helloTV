-- Inter-filiaal Paklijsten & Retour Statussen (DOA, Reparatie, ODM)

CREATE TABLE IF NOT EXISTS public.inter_filiaal_paklijsten (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    van_filiaal VARCHAR(255) NOT NULL,
    naar_filiaal VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Wacht op pick',
    aangemaakt_door VARCHAR(100),
    datum TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.paklijst_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paklijst_id UUID REFERENCES public.inter_filiaal_paklijsten(id) ON DELETE CASCADE,
    product_naam VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    type VARCHAR(50) CHECK (type IN ('DOA', 'Reparatie', 'ODM', 'Standaard Voorraad')),
    aantal INTEGER DEFAULT 1,
    opmerking TEXT
);

-- Enable RLS
ALTER TABLE public.inter_filiaal_paklijsten ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paklijst_items ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow read access for authenticated users on paklijsten" 
    ON public.inter_filiaal_paklijsten FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access for authenticated users on paklijst items" 
    ON public.paklijst_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated users on paklijsten" 
    ON public.inter_filiaal_paklijsten FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users on paklijst items" 
    ON public.paklijst_items FOR INSERT TO authenticated WITH CHECK (true);
