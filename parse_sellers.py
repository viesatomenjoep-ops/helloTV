import json
import re

raw = """
🥇 LM Luuk Meijer Groningen €240.450 194 totaal orders 116 stuks + €25.520 marge TV: 32% BBQ: 31% 2.986 pnt
🥈 AP Anne Peters Duiven €229.950 186 totaal orders 111 stuks + €28.416 marge TV: 24% BBQ: 23% 2.857 pnt
🥉 LV Lotte van Dijk Naarden €217.500 176 totaal orders 105 stuks + €22.260 marge TV: 20% BBQ: 27% 2.703 pnt
4 DS Daan Smit Rotterdam €211.650 170 totaal orders 102 stuks + €28.254 marge TV: 18% BBQ: 31% 2.626 pnt
5 TD Tim de Vries Naarden €203.100 164 totaal orders 98 stuks + €19.012 marge TV: 30% BBQ: 26% 2.523 pnt
6 JD Johan de Groot Groningen €146.600 119 totaal orders 71 stuks + €20.093 marge TV: 31% BBQ: 23% 1.822 pnt
7 TB Thijs Bos Eindhoven €146.600 119 totaal orders 71 stuks + €19.028 marge TV: 27% BBQ: 21% 1.822 pnt
8 MD Mark Dijkstra Alkmaar €146.600 119 totaal orders 71 stuks + €17.395 marge TV: 21% BBQ: 26% 1.822 pnt
9 DK Dennis Kuipers Cruquius €142.700 115 totaal orders 69 stuks + €16.491 marge TV: 34% BBQ: 28% 1.771 pnt
10 TH Tom Hendriks Zoeterwoude €138.950 113 totaal orders 67 stuks + €15.276 marge TV: 35% BBQ: 22% 1.727 pnt
11 DS Dennis Smit Den Bosch €138.900 112 totaal orders 67 stuks + €21.105 marge TV: 22% BBQ: 29% 1.725 pnt
12 MV Martijn Vos Breda €137.000 111 totaal orders 66 stuks + €14.850 marge TV: 32% BBQ: 23% 1.702 pnt
13 TD Tom de Vries Eindhoven €137.000 111 totaal orders 66 stuks + €16.170 marge TV: 20% BBQ: 23% 1.702 pnt
14 RD Rik Dijkstra Amsterdam €137.000 111 totaal orders 66 stuks + €22.308 marge TV: 25% BBQ: 31% 1.702 pnt
15 PJ Peter Jonker Eindhoven €137.000 111 totaal orders 66 stuks + €21.120 marge TV: 35% BBQ: 23% 1.702 pnt
16 KS Kevin Smit Apeldoorn €136.950 110 totaal orders 66 stuks + €22.902 marge TV: 25% BBQ: 21% 1.699 pnt
17 JS Jesper Smit Groningen €134.150 109 totaal orders 65 stuks + €13.390 marge TV: 19% BBQ: 22% 1.667 pnt
18 JJ Jasper Jonker Zoeterwoude €132.200 107 totaal orders 64 stuks + €21.568 marge TV: 24% BBQ: 21% 1.642 pnt
19 JD Jeroen de Boer Doetinchem €130.250 105 totaal orders 63 stuks + €19.971 marge TV: 27% BBQ: 23% 1.616 pnt
20 LK Lotte Kramer Doetinchem €128.400 104 totaal orders 62 stuks + €12.276 marge TV: 36% BBQ: 18% 1.596 pnt
21 MS Milan Scholten Zoeterwoude €124.500 100 totaal orders 60 stuks + €10.800 marge TV: 27% BBQ: 31% 1.545 pnt
22 MV Martijn van Dongen Zoeterwoude €124.500 100 totaal orders 60 stuks + €18.540 marge TV: 28% BBQ: 25% 1.545 pnt
23 MD Max de Boer Breda €121.700 99 totaal orders 59 stuks + €14.632 marge TV: 34% BBQ: 31% 1.513 pnt
24 JK Jasper Kuipers Utrecht €119.850 98 totaal orders 58 stuks + €12.876 marge TV: 30% BBQ: 24% 1.492 pnt
25 RV Ruben Veenstra Groningen €115.950 94 totaal orders 56 stuks + €18.648 marge TV: 32% BBQ: 23% 1.441 pnt
26 AV Anne Vos Bergen op Zoom €115.950 94 totaal orders 56 stuks + €15.008 marge TV: 26% BBQ: 21% 1.441 pnt
27 SH Sem Hoekstra Tilburg €115.950 94 totaal orders 56 stuks + €8.904 marge TV: 24% BBQ: 25% 1.441 pnt
28 KV Kevin van der Berg Utrecht €114.050 93 totaal orders 55 stuks + €17.820 marge TV: 30% BBQ: 32% 1.418 pnt
29 RK Rik Kuipers Bergen op Zoom €114.000 92 totaal orders 55 stuks + €9.680 marge TV: 28% BBQ: 32% 1.416 pnt
30 JS Johan Smit Bergen op Zoom €112.100 91 totaal orders 54 stuks + €16.308 marge TV: 20% BBQ: 18% 1.393 pnt
31 PH Peter Hoekstra Utrecht €105.350 85 totaal orders 51 stuks + €12.699 marge TV: 25% BBQ: 22% 1.307 pnt
32 TP Tim Peters Alkmaar €101.550 82 totaal orders 49 stuks + €8.673 marge TV: 24% BBQ: 30% 1.261 pnt
33 KD Kevin de Boer Apeldoorn €101.550 82 totaal orders 49 stuks + €11.466 marge TV: 19% BBQ: 21% 1.261 pnt
34 RP Ruben Peters Groningen €99.600 80 totaal orders 48 stuks + €14.640 marge TV: 25% BBQ: 21% 1.236 pnt
35 LV Lotte Visser Zoeterwoude €99.600 80 totaal orders 48 stuks + €10.368 marge TV: 34% BBQ: 20% 1.236 pnt
36 PV Peter van Dijk Eindhoven €99.600 80 totaal orders 48 stuks + €16.464 marge TV: 27% BBQ: 25% 1.236 pnt
37 JS Jasper Scholten Zoeterwoude €96.800 79 totaal orders 47 stuks + €14.993 marge TV: 19% BBQ: 21% 1.204 pnt
38 LD Lotte Dijkstra Tilburg €96.800 79 totaal orders 47 stuks + €14.852 marge TV: 37% BBQ: 26% 1.204 pnt
39 SP Sem Peters Utrecht €93.000 76 totaal orders 45 stuks + €9.360 marge TV: 34% BBQ: 27% 1.158 pnt
40 TV Tim Vos Doetinchem €93.000 76 totaal orders 45 stuks + €7.380 marge TV: 37% BBQ: 22% 1.158 pnt
41 MH Mark Hoekstra Leeuwarden €92.900 75 totaal orders 45 stuks + €10.890 marge TV: 36% BBQ: 24% 1.153 pnt
42 TD Thijs de Vries Leeuwarden €92.900 75 totaal orders 45 stuks + €7.065 marge TV: 31% BBQ: 21% 1.153 pnt
43 LK Lisa Kuipers Utrecht €92.900 75 totaal orders 45 stuks + €13.455 marge TV: 23% BBQ: 32% 1.153 pnt
44 MT Maikel Timmermans Duiven €91.050 74 totaal orders 44 stuks + €13.508 marge TV: 37% BBQ: 26% 1.132 pnt
45 MV Mark van Dijk Nijmegen €91.050 74 totaal orders 44 stuks + €12.144 marge TV: 37% BBQ: 21% 1.132 pnt
46 ND Niels de Boer Nijmegen €91.050 74 totaal orders 44 stuks + €13.596 marge TV: 27% BBQ: 18% 1.132 pnt
47 JJ Joris Jonker Leeuwarden €91.050 74 totaal orders 44 stuks + €10.120 marge TV: 28% BBQ: 32% 1.132 pnt
48 SJ Sem Jansen Zoeterwoude €89.150 73 totaal orders 43 stuks + €11.524 marge TV: 28% BBQ: 29% 1.109 pnt
49 JM Jasper Mulder Apeldoorn €87.200 71 totaal orders 42 stuks + €11.298 marge TV: 20% BBQ: 18% 1.084 pnt
50 DB Dennis Bos Leeuwarden €87.200 71 totaal orders 42 stuks + €11.592 marge TV: 29% BBQ: 20% 1.084 pnt
51 MP Martijn Peters Tilburg €87.150 70 totaal orders 42 stuks + €12.264 marge TV: 22% BBQ: 25% 1.081 pnt
52 SD Sander de Vries Breda €87.150 70 totaal orders 42 stuks + €7.686 marge TV: 26% BBQ: 32% 1.081 pnt
53 KM Kevin Mulder Apeldoorn €84.350 69 totaal orders 41 stuks + €10.578 marge TV: 26% BBQ: 25% 1.049 pnt
54 LJ Lisa Jonker Cruquius €84.350 69 totaal orders 41 stuks + €12.546 marge TV: 25% BBQ: 31% 1.049 pnt
55 PJ Peter Jonker Apeldoorn €82.500 68 totaal orders 40 stuks + €12.520 marge TV: 20% BBQ: 24% 1.029 pnt
56 SV Stan van Dijk Alkmaar €82.400 67 totaal orders 40 stuks + €6.760 marge TV: 35% BBQ: 32% 1.024 pnt
57 SJ Sem Jonker Cruquius €76.700 63 totaal orders 37 stuks + €9.213 marge TV: 23% BBQ: 23% 955 pnt
58 SB Sem Bakker Bergen op Zoom €76.700 63 totaal orders 37 stuks + €8.547 marge TV: 31% BBQ: 21% 955 pnt
59 BV Bas Visser Nijmegen €76.650 62 totaal orders 37 stuks + €8.140 marge TV: 25% BBQ: 19% 952 pnt
60 TB Tom Bos Tilburg €76.650 62 totaal orders 37 stuks + €9.509 marge TV: 27% BBQ: 21% 952 pnt
61 RK Ruben Kuipers Den Bosch €76.650 62 totaal orders 37 stuks + €8.917 marge TV: 19% BBQ: 18% 952 pnt
62 TT Tim Timmermans Alkmaar €70.050 58 totaal orders 34 stuks + €8.228 marge TV: 18% BBQ: 20% 874 pnt
63 JD Jeroen de Vries Apeldoorn €68.100 56 totaal orders 33 stuks + €9.999 marge TV: 35% BBQ: 25% 849 pnt
64 JP Jesper Peters Utrecht €64.250 53 totaal orders 31 stuks + €6.107 marge TV: 23% BBQ: 29% 800 pnt
65 NV Niels Vos Utrecht €55.650 46 totaal orders 27 stuks + €8.289 marge TV: 28% BBQ: 28% 694 pnt
66 BB Bas Bakker Tilburg €55.550 45 totaal orders 27 stuks + €4.671 marge TV: 19% BBQ: 28% 689 pnt
67 NM Niels Mulder Rotterdam €55.550 45 totaal orders 27 stuks + €6.642 marge TV: 32% BBQ: 20% 689 pnt
68 DV Daan Visser Apeldoorn €55.550 45 totaal orders 27 stuks + €7.587 marge TV: 33% BBQ: 32% 689 pnt
69 SB Sander Bakker Amsterdam €55.550 45 totaal orders 27 stuks + €5.184 marge TV: 21% BBQ: 20% 689 pnt
70 MT Max Timmermans Doetinchem €53.700 44 totaal orders 26 stuks + €3.952 marge TV: 30% BBQ: 26% 669 pnt
71 TT Thijs Timmermans Alkmaar €53.700 44 totaal orders 26 stuks + €4.784 marge TV: 37% BBQ: 22% 669 pnt
72 RV Rik van der Berg Tilburg €49.850 41 totaal orders 24 stuks + €8.160 marge TV: 19% BBQ: 30% 620 pnt
73 JH Jeroen Hendriks Doetinchem €49.850 41 totaal orders 24 stuks + €3.912 marge TV: 24% BBQ: 21% 620 pnt
74 TJ Tom Jonker Rotterdam €37.400 31 totaal orders 18 stuks + €2.790 marge TV: 24% BBQ: 20% 466 pnt
75 JV Johan van der Berg Tilburg €30.750 26 totaal orders 15 stuks + €2.565 marge TV: 37% BBQ: 25% 385 pnt
76 KD Kevin de Boer Zoeterwoude €28.800 24 totaal orders 14 stuks + €4.368 marge TV: 20% BBQ: 20% 360 pnt
77 LD Lotte Dekker Den Bosch €28.800 24 totaal orders 14 stuks + €3.724 marge TV: 20% BBQ: 26% 360 pnt
78 ST Sander Timmermans Naarden €26.900 23 totaal orders 13 stuks + €4.355 marge TV: 36% BBQ: 31% 337 pnt
79 BD Bram Dijkstra Doetinchem €26.850 22 totaal orders 13 stuks + €3.081 marge TV: 28% BBQ: 18% 334 pnt
80 JV Jeroen van Dongen Amsterdam €24.900 20 totaal orders 12 stuks + €3.276 marge TV: 31% BBQ: 18% 309 pnt
"""

lines = [x for x in raw.split('\n') if x.strip()]
sellers = []
for idx, line in enumerate(lines):
    parts = line.split()
    # Find the Euro sign
    euro_idx = -1
    for i, p in enumerate(parts):
        if p.startswith('€'):
            euro_idx = i
            break
            
    name_parts = []
    i = 2
    while i < euro_idx and parts[i] not in ['Groningen', 'Duiven', 'Naarden', 'Rotterdam', 'Eindhoven', 'Alkmaar', 'Cruquius', 'Zoeterwoude', 'Den', 'Breda', 'Amsterdam', 'Apeldoorn', 'Doetinchem', 'Utrecht', 'Bergen', 'Tilburg', 'Leeuwarden', 'Nijmegen']:
        name_parts.append(parts[i])
        i += 1
    
    name = " ".join(name_parts)
    
    store_parts = []
    while i < euro_idx:
        store_parts.append(parts[i])
        i += 1
    store = " ".join(store_parts)
    if store == 'Den': store = 'Den Bosch'
    if store == 'Bergen': store = 'Bergen op Zoom'
    if store == 'op Zoom': store = 'Bergen op Zoom'
    if 'Zoom' in store and 'Bergen' not in store: store = 'Bergen op Zoom'
    if store == 'Bosch': store = 'Den Bosch'

    revenue = int(parts[euro_idx].replace('€','').replace('.',''))
    sales_count = int(parts[euro_idx+1])
    
    # TV: XX%
    tv_match = re.search(r'TV:\s*(\d+)%', line)
    bbq_match = re.search(r'BBQ:\s*(\d+)%', line)
    tv_margin_pct = int(tv_match.group(1)) if tv_match else 20
    bbq_margin_pct = int(bbq_match.group(1)) if bbq_match else 20
    
    pts_match = re.search(r'([\d.]+) pnt', line)
    pts = int(pts_match.group(1).replace('.', '')) if pts_match else 1000
    
    marge_match = re.search(r'\+ €([\d.]+) marge', line)
    tv_margin = int(marge_match.group(1).replace('.', '')) if marge_match else 10000
    
    tv_sold_match = re.search(r'(\d+) stuks', line)
    tv_sold = int(tv_sold_match.group(1)) if tv_sold_match else 50
    
    sellers.append({
        "id": f"EMP-{idx+1}",
        "name": name,
        "store": store,
        "totalRevenue": revenue,
        "salesCount": sales_count,
        "todayRevenue": 0,
        "todaySalesCount": 0,
        "tvSold": tv_sold,
        "tvMargin": tv_margin,
        "bbqSold": 0,
        "bbqMargin": 0,
        "tvMarginPct": tv_margin_pct,
        "bbqMarginPct": bbq_margin_pct,
        "accessoriesSold": 0,
        "accessoriesMargin": 0,
        "points": pts,
        "recentSales": []
    })

with open('src/utils/mockSellers.ts', 'w') as f:
    f.write(f"export const MOCK_TOP_SELLERS = {json.dumps(sellers, indent=2)};\n")
