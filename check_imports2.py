import os
import re

files_to_check = [
    'src/app/components/MediaPortal.tsx',
    'src/app/components/Shiftbase.tsx',
    'src/app/components/NewOrderWidget.tsx',
    'src/app/components/SalesTracker.tsx',
    'src/app/components/Orders.tsx',
    'src/app/components/Transport.tsx',
    'src/app/components/MagicLinks.tsx',
    'src/app/components/Quotes.tsx'
]

for filepath in files_to_check:
    with open(filepath, 'r') as f:
        content = f.read()
    
    lucide_import_match = re.search(r"import\s+\{([^}]+)\}\s+from\s+['\"]lucide-react['\"]", content)
    imported_icons = []
    if lucide_import_match:
        imported_icons = [i.strip() for i in lucide_import_match.group(1).split(',')]
        imported_icons = [i.split(' as ')[-1].strip() for i in imported_icons]
    
    used_icons_matches = re.findall(r"<([A-Z][a-zA-Z0-9]+)", content)
    used_components = set(used_icons_matches)
    
    ignore = {'React', 'Fragment', 'SqlTerminal', 'HelloTVLogo', 'NewOrderWidget', 'ExternalLink', 'div', 'span', 'button', 'input', 'textarea', 'form', 'select', 'option', 'h1', 'h2', 'h3', 'p', 'img', 'a', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'QuoteDetailView'}
    
    missing_icons = []
    for comp in used_components:
        if comp not in ignore and comp not in imported_icons:
            if f"const {comp}" not in content and f"function {comp}" not in content and f"class {comp}" not in content and f"import {comp}" not in content and f"import {{ {comp} }}" not in content:
                missing_icons.append(comp)
    
    if missing_icons:
        print(f"{filepath} missing imports: {missing_icons}")

