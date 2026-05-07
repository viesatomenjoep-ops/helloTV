import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

# Add state
state_search = "const [isFullscreen, setIsFullscreen] = useState(false);"
state_replace = "const [isFullscreen, setIsFullscreen] = useState(false);\n  const [isSmartWidgetExpanded, setIsSmartWidgetExpanded] = useState(false);"
content = content.replace(state_search, state_replace)

# Modify Smart Widget Header
header_search = """            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Store className="text-blue-600" /> HelloTV Smart Widget
            </h2>"""
header_replace = """            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Store className="text-blue-600" /> Smart Menu
              </h2>
              <button 
                onClick={() => setIsSmartWidgetExpanded(!isSmartWidgetExpanded)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title={isSmartWidgetExpanded ? "Verklein" : "Vergroot"}
              >
                {isSmartWidgetExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>"""
content = content.replace(header_search, header_replace)

# Modify the Smart Widget container classes
container_search = """      {/* HelloTV Custom LiveChat Widget */}
      {activeChatId && !isFullscreen && (
        <div className="w-96 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto">"""
container_replace = """      {/* HelloTV Custom LiveChat Widget */}
      {activeChatId && !isFullscreen && (
        <div className={`${isSmartWidgetExpanded ? 'fixed inset-0 z-[9999] w-full p-8' : 'w-96'} bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 overflow-y-auto transition-all duration-300`}>
          {isSmartWidgetExpanded && (
            <div className="absolute top-4 right-4">
               <button onClick={() => setIsSmartWidgetExpanded(false)} className="p-2 bg-white shadow-md rounded-lg text-gray-500 hover:bg-gray-100"><X size={24}/></button>
            </div>
          )}
"""
content = content.replace(container_search, container_replace)

# If isSmartWidgetExpanded, let's make the content grid nicely!
# I'll just change the inner padding to be wider if expanded.
content = content.replace('<div className="p-6">', '<div className={`p-6 ${isSmartWidgetExpanded ? "max-w-6xl mx-auto w-full grid grid-cols-2 gap-8" : ""}`}>')

with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

