import re

with open('src/app/components/SalesTracker.tsx', 'r') as f:
    content = f.read()

# Make sure SqlTerminal is imported
if "SqlTerminal" not in content[:300]:
    content = content.replace("import { api } from '../../utils/api';", "import { api } from '../../utils/api';\nimport { SqlTerminal } from './SqlTerminal';")

# Replace the initial loading state and useEffect
old_effect = """  useEffect(() => {
    setPerformance(MOCK_TOP_SELLERS);
    setLoading(false);
  }, []);"""

new_effect = """  const [showSql, setShowSql] = useState(true);

  useEffect(() => {
    // Wait for SQL to finish before showing data
    if (!showSql) {
      setPerformance(enrichWithDetailedData(MOCK_TOP_SELLERS));
      setLoading(false);
    }
  }, [showSql]);"""

content = content.replace(old_effect, new_effect)

# Render SqlTerminal
sql_render = """
      {showSql && (
        <SqlTerminal 
          query={`SELECT s.id, s.name, s.store, SUM(o.revenue) as total_revenue, COUNT(o.id) as sales_count FROM sellers s JOIN orders o ON s.id = o.seller_id WHERE o.date >= CURRENT_DATE - INTERVAL '30 days' GROUP BY s.id ORDER BY total_revenue DESC LIMIT 80;`}
          onComplete={() => setShowSql(false)} 
        />
      )}
"""

content = content.replace("  return (\n    <div", sql_render + "  return (\n    <div")

with open('src/app/components/SalesTracker.tsx', 'w') as f:
    f.write(content)

