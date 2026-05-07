import re

with open('src/app/components/Transport.tsx', 'r') as f:
    content = f.read()

# Add mapZoom state
content = content.replace("const [isPrintingPaklijst, setIsPrintingPaklijst] = useState(false);", "const [isPrintingPaklijst, setIsPrintingPaklijst] = useState(false);\n  const [mapZoom, setMapZoom] = useState(1);")

with open('src/app/components/Transport.tsx', 'w') as f:
    f.write(content)

