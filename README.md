# Anti Gravity Management System

Complete ERP/CRM systeem gebouwd met React, Tailwind CSS en Supabase.

## Features

- 📊 **Dashboard** - Real-time analytics en KPI's
- 👥 **CRM** - Klantenbeheer
- 📋 **Offertes** - Offerte management met accept/reject workflow
- 📈 **Sales Tracker** - Live verkoop performance tracking
- 📦 **Voorraad** - Automatisch voorraadsbeheer met alerts
- 📱 **WhatsApp** - Notificatie integratie

## Installatie

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Supabase Setup

1. Maak een Supabase project aan op https://supabase.com
2. Kopieer je project URL en API keys
3. Update `/utils/supabase/info.tsx` met jouw credentials:

```tsx
export const projectId = "jouw-project-id"
export const publicAnonKey = "jouw-anon-key"
```

4. Deploy de edge functions uit `/supabase/functions/server/`

## WhatsApp Integratie (Optioneel)

Voeg deze environment variables toe aan je Supabase project:

- `WHATSAPP_API_KEY` - Je WhatsApp Business API key
- `WHATSAPP_PHONE_NUMBER` - Telefoonnummer voor notificaties

## Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

## Aanpassingen voor Anti Gravity

Je kunt de branding aanpassen in:
- `/src/app/App.tsx` - Logo en bedrijfsnaam in sidebar
- `/src/styles/theme.css` - Kleurenschema en fonts
- `/src/app/components/Dashboard.tsx` - Dashboard titel

## Tech Stack

- React 18
- Tailwind CSS v4
- TypeScript
- Supabase (Database + Edge Functions)
- Recharts (Grafieken)
- Lucide Icons
- Hono (Backend framework)
