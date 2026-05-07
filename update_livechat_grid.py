import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

# Revert the p-6 line
bad_line = '<div className={`p-6 ${isSmartWidgetExpanded ? "max-w-6xl mx-auto w-full grid grid-cols-2 gap-8" : ""}`}>'
content = content.replace(bad_line, '<div className={`p-6 ${isSmartWidgetExpanded ? "max-w-6xl mx-auto w-full" : ""}`}>')

# Wrap the CRM Profile and other blocks in a grid
# Let's find CRM Profile
crm_start = "{/* CRM Profile */}"
# We'll put a wrapper right before CRM Profile
wrapper_start = '{isSmartWidgetExpanded ? <div className="grid grid-cols-2 gap-6 items-start"> : <div className="flex flex-col gap-0">}'

content = content.replace(crm_start, wrapper_start + "\n            " + crm_start)

# We need to close this wrapper at the end of the widget list
# The last widget is the Quick Order Actions
# Let's see the end of Quick Order Actions
order_end_search = """                </button>
              </div>
            </div>"""

order_end_replace = """                </button>
              </div>
            </div>
          </div>""" # adding the closing div for our wrapper

content = content.replace(order_end_search, order_end_replace)

with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

