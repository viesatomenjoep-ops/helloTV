-- 0005_hr_ai_engines_schema.sql
-- Description: HR AI engines schema voor database scans (fraude & tijdregistratie) en automatische promotie/bonus berekeningen.

CREATE TABLE IF NOT EXISTS public.hr_time_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_code VARCHAR(10) NOT NULL,
    clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
    clock_out TIMESTAMP WITH TIME ZONE,
    location_ip VARCHAR(45),
    device_id VARCHAR(100),
    is_ghost_clock BOOLEAN DEFAULT false,
    ai_flagged BOOLEAN DEFAULT false,
    ai_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.hr_sales_bonuses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_code VARCHAR(10) NOT NULL,
    period_month DATE NOT NULL,
    total_sales_revenue DECIMAL(10,2) DEFAULT 0.00,
    total_margin DECIMAL(10,2) DEFAULT 0.00,
    calculated_bonus DECIMAL(10,2) DEFAULT 0.00,
    ai_promotion_recommended BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, paid
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.hr_time_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_sales_bonuses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow read access to authenticated users for hr_time_logs" 
ON public.hr_time_logs FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to authenticated users for hr_sales_bonuses" 
ON public.hr_sales_bonuses FOR SELECT USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_hr_time_logs_employee ON public.hr_time_logs(employee_code);
CREATE INDEX IF NOT EXISTS idx_hr_sales_bonuses_period ON public.hr_sales_bonuses(employee_code, period_month);
