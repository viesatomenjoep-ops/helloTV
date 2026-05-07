import re

with open('src/app/components/Shiftbase.tsx', 'r') as f:
    content = f.read()

# Make sure SqlTerminal is imported
if "SqlTerminal" not in content[:300]:
    content = content.replace("import { Calendar, Clock,", "import { SqlTerminal } from './SqlTerminal';\nimport { Calendar, Clock,")

# Add showSql state
state_search = "  const [selectedEmployee, setSelectedEmployee] = useState('Niet geselecteerd');"
new_state = "  const [showSql, setShowSql] = useState(true);\n  const [selectedEmployee, setSelectedEmployee] = useState('Niet geselecteerd');"

content = content.replace(state_search, new_state)

# Render SqlTerminal
sql_render = """
      {showSql && (
        <SqlTerminal 
          query={`SELECT e.id, e.name, e.role, s.clock_in, s.status FROM employees e LEFT JOIN shifts s ON e.id = s.emp_id WHERE s.date = CURRENT_DATE;`}
          onComplete={() => setShowSql(false)} 
        />
      )}
"""

content = content.replace("  return (\n    <div", sql_render + "  return (\n    <div")

with open('src/app/components/Shiftbase.tsx', 'w') as f:
    f.write(content)

