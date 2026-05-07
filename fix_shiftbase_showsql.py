import re

with open('src/app/components/Shiftbase.tsx', 'r') as f:
    content = f.read()

content = content.replace("  const [selectedEmployee, setSelectedEmployee] = useState<string>('Niet geselecteerd');", "  const [showSql, setShowSql] = useState(true);\n  const [selectedEmployee, setSelectedEmployee] = useState<string>('Niet geselecteerd');")

with open('src/app/components/Shiftbase.tsx', 'w') as f:
    f.write(content)

