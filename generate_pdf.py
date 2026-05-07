from fpdf import FPDF
from datetime import datetime
import os

class PDF(FPDF):
    def header(self):
        # HelloTV Logo Simulation (Yellow rectangle with black text)
        self.set_fill_color(253, 203, 44) # FDCB2C
        self.rect(10, 10, 50, 15, 'F')
        self.set_font('helvetica', 'B', 16)
        self.set_text_color(0, 0, 0)
        self.set_xy(12, 12)
        self.cell(46, 11, 'HELLO TV', 0, 0, 'C')
        
        # Header Title
        self.set_font('helvetica', 'B', 15)
        self.set_text_color(100, 100, 100)
        self.cell(130, 15, 'Overzicht Vernieuwde Systemen', 0, 0, 'R')
        self.ln(25)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(128)
        self.cell(0, 10, f'Gegenereerd op {datetime.now().strftime("%d-%m-%Y %H:%M")} - Pagina {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()

# Title
pdf.set_font('helvetica', 'B', 24)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 20, 'Samenvatting voor de Directie (A tot Z)', 0, 1, 'L')
pdf.ln(5)

# Introduction
pdf.set_font('helvetica', '', 12)
pdf.multi_cell(0, 7, "Hieronder vindt u in simpele 'Jip-en-Janneke-taal' een compleet overzicht van alle nieuwe functionaliteiten die we in het HelloTV Dashboard hebben gebouwd. Dit platform verbindt verkopers, de webshop, en de winkels aan elkaar om sneller, makkelijker en met meer winst te kunnen werken.")
pdf.ln(10)

features = [
    ("1. Slimme LiveChat (Met AI Klant-herkenning)", 
     "Klanten kunnen direct met verkopers chatten. Als een klant in de chat zegt: 'Ik ben Tom uit Breda', herkent het systeem dit automatisch. De adresgegevens worden met 1 klik direct klaargezet voor de aankoop. Geen handmatig overtypen meer!"),
    ("2. Direct PDF Offertes & Orders Versturen", 
     "Wanneer een klant akkoord gaat in de chat, hoeft de verkoper niet naar een ander systeem. Met één druk op de knop 'Stuur PDF Order' wordt de bestelling klaargezet en krijgt de klant direct de factuur en een betaallink in beeld."),
    ("3. Producten & Winstmarges Dashboard", 
     "We hebben een nieuw overzicht gemaakt waar verkopers precies kunnen zien welke TV's we verkopen. We hebben kleurtjes toegevoegd: Groen betekent veel winst (gezonde marge), Rood betekent oppassen. Zo weet de verkoper altijd welke TV hij of zij het beste kan adviseren voor de klant én voor HelloTV."),
    ("4. Media & Content Portaal (Winkel Schermen)", 
     "Onze marketingafdeling kan nu makkelijk nieuwe actie-video's (zoals 'Zomer Sale') uploaden. Door een koppeling met de LAUD-systemen in de winkels, worden deze video's met 1 druk op de knop direct afgespeeld op alle TV's in onze 18 fysieke winkels. Sneller kan niet."),
    ("5. Live Verkoop & Bonussen (Sales Tracker)", 
     "Verkopers kunnen live zien hoeveel zij en hun collega's verkopen. Ze zien direct wat hun bonus gaat worden als ze bijvoorbeeld veel kabels of schoonmaakmiddelen verkopen. Het systeem heeft een live 'teller' (zoals op tv) die meeloopt met de actuele omzet van vandaag."),
    ("6. Google Reviews Integratie", 
     "We halen direct klantervaringen en Google Reviews op en tonen deze in het systeem. Zo zien verkopers meteen wat goed gaat en wat beter kan op de winkelvloer."),
    ("7. Centrale Controle (Alles-in-één)", 
     "Waar verkopers vroeger moesten wisselen tussen Shiftbase (roosters), Vendit (kassa) en hun e-mail, zit nu alles in één makkelijk overzicht. Dit bespaart uren aan zoekwerk per maand.")
]

for title, desc in features:
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 10, title, 0, 1, 'L')
    
    pdf.set_font('helvetica', '', 11)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 6, desc)
    pdf.ln(5)

# Save PDF to Desktop
desktop_path = os.path.expanduser("~/Desktop/HelloTV_Directie_Samenvatting.pdf")
pdf.output(desktop_path)
print("PDF gegenereerd op bureaublad!")
