import re

# Fix Transport.tsx
with open('src/app/components/Transport.tsx', 'r') as f:
    content = f.read()

import_re = re.search(r"import \{ .* \} from 'lucide-react';", content)
if import_re:
    import_str = import_re.group(0)
    if "ZoomIn" not in import_str:
        content = content.replace(import_str, import_str.replace("}", ", ZoomIn, ZoomOut }"))
        with open('src/app/components/Transport.tsx', 'w') as f:
            f.write(content)

# Fix MagicLinks.tsx
with open('src/app/components/MagicLinks.tsx', 'r') as f:
    content = f.read()

import_re = re.search(r"import \{ .* \} from 'lucide-react';", content)
if import_re:
    import_str = import_re.group(0)
    if "Mic" not in import_str:
        content = content.replace(import_str, import_str.replace("}", ", Mic, PhoneOff, Speaker }"))
        with open('src/app/components/MagicLinks.tsx', 'w') as f:
            f.write(content)

