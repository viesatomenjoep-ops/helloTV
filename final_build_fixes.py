import re

# 1. Fix MediaPortal.tsx
with open('src/app/components/MediaPortal.tsx', 'r') as f:
    media = f.read()

# Add Database and CheckCircle to imports
media = media.replace("Activity, Tv, Youtube as YoutubeIcon, Calculator, Check, Presentation", "Activity, Tv, Youtube as YoutubeIcon, Calculator, Check, CheckCircle, Presentation, Database")

with open('src/app/components/MediaPortal.tsx', 'w') as f:
    f.write(media)

# 2. Fix Shiftbase.tsx
with open('src/app/components/Shiftbase.tsx', 'r') as f:
    shift = f.read()

if "import { SqlTerminal }" not in shift:
    shift = shift.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { SqlTerminal } from './SqlTerminal';")

with open('src/app/components/Shiftbase.tsx', 'w') as f:
    f.write(shift)

