import re

with open('src/app/components/Orders.tsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { NewOrderWidget } from './NewOrderWidget';\n"
if "import { NewOrderWidget" not in content:
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\n" + import_stmt)

# Update useState typing
content = content.replace("const [activeTab, setActiveTab] = useState<'overzicht' | 'upsell'>('overzicht');", "const [activeTab, setActiveTab] = useState<'overzicht' | 'upsell' | 'nieuw'>('overzicht');")

# Add onClick to button
content = content.replace("""<button className="flex items-center gap-2 px-4 py-2 bg-[#FDCB2C] text-black rounded-lg font-bold shadow-sm hover:shadow-md transition-all">
                  <Plus size={18} /> Nieuwe Order
                </button>""", """<button onClick={() => setActiveTab('nieuw')} className="flex items-center gap-2 px-4 py-2 bg-[#FDCB2C] text-black rounded-lg font-bold shadow-sm hover:shadow-md transition-all">
                  <Plus size={18} /> Nieuwe Order
                </button>""")

# Add the Tab content
new_tab_content = """            {activeTab === 'nieuw' && (
              <div className="mt-6">
                <button onClick={() => setActiveTab('overzicht')} className="mb-4 text-blue-600 font-bold hover:underline flex items-center gap-1">
                  ← Terug naar overzicht
                </button>
                <NewOrderWidget />
              </div>
            )}
"""

content = content.replace("          </div>\n        </div>\n      </div>\n    </div>", new_tab_content + "          </div>\n        </div>\n      </div>\n    </div>")

with open('src/app/components/Orders.tsx', 'w') as f:
    f.write(content)

