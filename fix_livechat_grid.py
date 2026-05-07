import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

bad_jsx = '{isSmartWidgetExpanded ? <div className="grid grid-cols-2 gap-6 items-start"> : <div className="flex flex-col gap-0">}'
good_jsx = '<div className={isSmartWidgetExpanded ? "grid grid-cols-2 gap-6 items-start" : "flex flex-col gap-0"}>'
content = content.replace(bad_jsx, good_jsx)

with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

