import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

# Fix Sidebar classes
sidebar_search = '<div className="w-80 bg-white border-r border-gray-200 flex flex-col hidden lg:flex shrink-0">'
sidebar_replace = '<div className={`w-full lg:w-80 bg-white border-r border-gray-200 flex-col shrink-0 ${activeChatId ? "hidden lg:flex" : "flex"}`}>'
content = content.replace(sidebar_search, sidebar_replace)

# Fix Main Chat Area classes
main_chat_search = '<div className="flex-1 flex flex-col bg-white">'
main_chat_replace = '<div className={`flex-1 flex-col bg-white ${!activeChatId ? "hidden lg:flex" : "flex"}`}>'
content = content.replace(main_chat_search, main_chat_replace)

# Also fix the Smart Widget to be hidden on mobile unless specifically requested (currently it's shown side-by-side but we want it responsive)
# Line 251: w-96 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0
smart_search = "bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto transition-all duration-300"
smart_replace = "bg-gray-50 border-l border-gray-200 flex-col shrink-0 overflow-y-auto transition-all duration-300 hidden xl:flex"
# Actually the Smart Widget container replacement looks like this in my previous script:
# <div className={`${isSmartWidgetExpanded ? 'fixed inset-0 z-[9999] w-full p-8' : 'w-96'} bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto transition-all duration-300`}>
container_search = "bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto transition-all duration-300"
container_replace = "bg-gray-50 border-l border-gray-200 flex-col shrink-0 overflow-y-auto transition-all duration-300 hidden xl:flex"
content = content.replace(container_search, container_replace)

# Change 'Chat Sluiten' to 'Sluiten / Terug'
content = content.replace("> Chat Sluiten", "> Terug / Sluiten")


with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

