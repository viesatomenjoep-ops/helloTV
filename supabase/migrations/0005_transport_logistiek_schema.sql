-- Migration 0005_transport_logistiek_schema.sql
-- Maakt een waterdicht systeem voor Transport & Logistiek (Bessie / Hessie) inclusief Master admin live tracking.

-- 1. Voertuigen (Bussen) / Live Locaties
CREATE TABLE IF NOT EXISTS public.vans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kenteken TEXT NOT NULL UNIQUE,
    driver_name TEXT,
    driver_phone TEXT,
    status TEXT DEFAULT 'Actief', -- Actief, In de file, Aan het lossen
    current_location TEXT,
    last_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Transport Orders (Koppeling met de verkoop orders)
CREATE TABLE IF NOT EXISTS public.transport_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    filiaal TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    status TEXT DEFAULT 'Ingepland', -- Ingepland, Onderweg, Afgeleverd, Wacht op pick
    payment_status TEXT DEFAULT 'Openstaand', -- Betaald, Openstaand, iDEAL gestuurd
    van_id UUID REFERENCES public.vans(id) ON DELETE SET NULL,
    coordinator TEXT, -- Guido, Rob, Jury, Bas
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Transport Order Items (Checklist voor de installateur)
-- Hier wordt vastgelegd of product X (tv) en Y (beugel) echt 2x in de bus liggen
CREATE TABLE IF NOT EXISTS public.transport_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transport_order_id UUID REFERENCES public.transport_orders(id) ON DELETE CASCADE,
    product_sku TEXT NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL, -- TV, Barbecue, Kabel, Cleaner, Accessoire
    quantity INTEGER NOT NULL DEFAULT 1,
    is_checked BOOLEAN DEFAULT FALSE, -- Afgevinkt door installateur?
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.vans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_items ENABLE ROW LEVEL SECURITY;

-- Policies (Voor demo: alles open)
CREATE POLICY "Allow all on vans" ON public.vans FOR ALL USING (true);
CREATE POLICY "Allow all on transport_orders" ON public.transport_orders FOR ALL USING (true);
CREATE POLICY "Allow all on transport_items" ON public.transport_items FOR ALL USING (true);

-- Indexen voor snelle lookups in het dashboard
CREATE INDEX idx_transport_date ON public.transport_orders(delivery_date);
CREATE INDEX idx_transport_filiaal ON public.transport_orders(filiaal);
CREATE INDEX idx_transport_van ON public.transport_orders(van_id);
CREATE INDEX idx_transport_items_order ON public.transport_items(transport_order_id);
