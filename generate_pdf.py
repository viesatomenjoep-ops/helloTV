from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        # Logo
        try:
            self.image('public/HelloTV.png', 10, 8, 33)
        except:
            pass
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(30, 10, 'HelloTV Systeem Samenvatting', 0, 0, 'C')
        # Line break
        self.ln(20)

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Pagina ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')

    def chapter_title(self, num, title):
        # Arial 12
        self.set_font('Arial', 'B', 12)
        # Background color
        self.set_fill_color(253, 203, 44) # HelloTV Yellow
        # Title
        self.cell(0, 10, 'Hoofdstuk %d : %s' % (num, title), 0, 1, 'L', 1)
        self.ln(4)

    def chapter_body(self, body):
        # Times 12
        self.set_font('Arial', '', 11)
        # Output justified text
        self.multi_cell(0, 6, body.encode('latin-1', 'replace').decode('latin-1'))
        # Line break
        self.ln()

pdf = PDF()
pdf.alias_nb_pages()
pdf.add_page()

content = [
    ("LiveChat & Automatische Orders", "Met dit systeem praten we online met klanten op de website. Een slimme robot (AI) herkent direct de naam en het adres van de klant in de chat. Met een simpele druk op de knop maken we een order of betaallink. De klant ontvangt direct in de chat een mooie PDF-offerte of PDF-order."),
    ("Hoofddashboard & Cijfers", "Het centrale scherm voor de organisatie. Hier zien we live de omzet, het aantal orders en de drukte oplopen, precies alsof het een hele drukke zaterdag is. Dit scherm geeft het management in een oogopslag de hartslag van de organisatie weer."),
    ("Sales Leaderboard & Verkopers", "Een strak dashboard waarop verkopers kunnen zien wat ze gepresteerd hebben. Het toont verkochte TV's, accessoires en de brutowinst. Omdat het realtime is, tikken de bedragen en bonussen voor hun neus omhoog! Alles is netjes in 1 scherm gepropt zodat we niet hoeven te scrollen."),
    ("Personeel & Planning (HelloBase)", "Ons eigen systeem om roosters en uren bij te houden. Medewerkers vragen vakantie aan (waar de roostermaker via WhatsApp een seintje van krijgt) en we zien per dag precies wie er werkt in een filiaal (zoals Breda of Amsterdam). Met handige ronde fotootjes zie je precies wie er op de winkelvloer staat."),
    ("Producten & Marges", "Dit is de nieuwe goudmijn voor verkopers. Een overzicht van alle TV's (Samsung, LG, Sony, etc.) met daarbij de inkoopprijs en de brutowinst. Een gekleurde balk (Rood = oppassen, Oranje = gemiddeld, Groen = super goed!) laat met een percentage direct zien op welke modellen we het meeste verdienen."),
    ("LAUD Media (Digitale Schermen)", "De koppeling waarmee we acties en beelden direct de wereld insturen. Je uploadt simpelweg een video of foto in het portaal, schrijft een tekstje, en met 1 druk op de knop is de actie zichtbaar op de website én op alle digitale schermen in onze 18 winkels."),
    ("Google Reviews & Klanttevredenheid", "We verzamelen live de reviews van klanten. Om de bazen goed op de hoogte te houden, kan er met 1 knop een PDF-rapport worden uitgedraaid (inclusief mooie grafieken met kleuren) die direct virtueel naar de WhatsApp-groepsapp van het management gestuurd kan worden.")
]

pdf.set_font('Arial', '', 11)
intro = "Beste Directie / Management,\n\nIn de afgelopen periode is het HelloTV Master Manager systeem volledig opgebouwd, ingericht en klaargemaakt voor de presentatie. In dit document vinden jullie een makkelijk leesbare samenvatting (in Jip-en-Janneke taal) van alle modules en wat deze voor ons bedrijf betekenen.\n\nAlle systemen praten nu met elkaar: een chat leidt tot een order, een order zorgt voor een live omzetstijging op het dashboard en verhoogt de bonus van de medewerker, terwijl de roosters bepalen wie er in de winkel staat. Dit alles in de strakke geel-zwarte huisstijl van HelloTV."
pdf.multi_cell(0, 6, intro.encode('latin-1', 'replace').decode('latin-1'))
pdf.ln(10)

for idx, (title, body) in enumerate(content, 1):
    pdf.chapter_title(idx, title)
    pdf.chapter_body(body)

# Save to Desktop
output_path = '/Users/tomvanbiene/Desktop/HelloTV_Systeem_Samenvatting.pdf'
pdf.output(output_path, 'F')
print("PDF saved successfully to", output_path)

