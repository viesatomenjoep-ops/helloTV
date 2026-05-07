import re

with open('src/app/components/LiveChatPortal.tsx', 'r') as f:
    content = f.read()

# Fix truncation
old_url = '<span className="font-bold text-blue-600 truncate max-w-[150px]">{activeChat?.url}</span>'
new_url = '<span className="font-bold text-blue-600 break-all max-w-[60%] text-right text-xs leading-tight">{activeChat?.url}</span>'
content = content.replace(old_url, new_url)

# Fix Smart Menu accessibility on mobile
old_header_btns = """                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
                >"""
new_header_btns = """                <button 
                  onClick={() => setIsSmartWidgetExpanded(true)} 
                  className="xl:hidden px-3 py-1.5 bg-[#FDCB2C] text-black font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-1"
                >
                  <Store size={16} /> <span className="hidden sm:inline">Smart Menu</span>
                </button>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  className="hidden sm:flex px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-sm rounded-lg hover:bg-blue-100 transition-colors items-center gap-1"
                >"""
content = content.replace(old_header_btns, new_header_btns)

# Fix the Smart Widget container classes so it shows up when expanded on small screens
old_container = "<div className={`${isSmartWidgetExpanded ? 'fixed inset-0 z-[9999] w-full p-8' : 'w-96'} bg-gray-50 border-l border-gray-200 flex-col shrink-0 overflow-y-auto transition-all duration-300 hidden xl:flex`}>"
new_container = "<div className={`${isSmartWidgetExpanded ? 'fixed inset-0 z-[9999] w-full p-4 md:p-8 flex' : 'w-96 hidden xl:flex'} bg-gray-50 border-l border-gray-200 flex-col shrink-0 overflow-y-auto transition-all duration-300`}>"
content = content.replace(old_container, new_container)

with open('src/app/components/LiveChatPortal.tsx', 'w') as f:
    f.write(content)

