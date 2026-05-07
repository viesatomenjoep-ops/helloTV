import os
import re

components_dir = 'src/app/components'
all_files = [os.path.join(components_dir, f) for f in os.listdir(components_dir) if f.endswith('.tsx')]

def get_used_components(content):
    # Find all <ComponentName ...
    return set(re.findall(r'<([A-Z][a-zA-Z0-9]+)', content))

def get_imported_components(content):
    imports = set()
    for line in content.split('\n'):
        if line.startswith('import '):
            # import { A, B } from '...';
            # import A from '...';
            match = re.search(r'import\s+\{([^}]+)\}', line)
            if match:
                for c in match.group(1).split(','):
                    imports.add(c.split(' as ')[-1].strip())
            match2 = re.search(r'import\s+([A-Z][a-zA-Z0-9]+)\s+from', line)
            if match2:
                imports.add(match2.group(1).strip())
    return imports

for f in all_files:
    with open(f, 'r') as file:
        content = file.read()
    
    used = get_used_components(content)
    imported = get_imported_components(content)
    
    # Ignore React types or HTML
    ignore = {'Fragment'}
    
    missing = []
    for c in used:
        if c not in imported and c not in ignore:
            # Check if defined in file
            if not re.search(fr'(function|const|class)\s+{c}\b', content):
                missing.append(c)
    
    if missing:
        print(f"{f}: Missing imports for {missing}")

