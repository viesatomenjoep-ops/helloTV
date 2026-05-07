import glob
import os

# Replace occurrences of Hessey Logistics
for filename in glob.glob('src/app/components/*.tsx'):
    with open(filename, 'r') as f:
        content = f.read()
    
    if "Hessey Logistics" in content or "Hessey" in content:
        content = content.replace("Transport via Hessey Logistics", "transport via helloTV bakwagen")
        content = content.replace("Handtekening Chauffeur (Hessey)", "Handtekening Chauffeur (helloTV bakwagen)")
        content = content.replace("Hessey Transport & Logistiek", "helloTV Transport & Logistiek")
        content = content.replace("Hessey Transport Status", "helloTV Bakwagen Status")
        content = content.replace("Logistiek (Hessey)", "Logistiek (helloTV Bakwagen)")
        content = content.replace("Transport Reserveringen (Hessey)", "Transport Reserveringen (helloTV Bakwagen)")
        content = content.replace("Hessey Systeemintegratie", "helloTV Bakwagen Systeemintegratie")
        content = content.replace("Hessey Endpoint URL", "helloTV Bakwagen Endpoint URL")
        content = content.replace("Hessey Transport Docs", "helloTV Bakwagen Docs")
        with open(filename, 'w') as f:
            f.write(content)

