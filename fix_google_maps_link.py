import re

with open('src/app/components/GoogleReviews.tsx', 'r') as f:
    content = f.read()

# Make sure ExternalLink is imported
import_search = "import { Star, MapPin, TrendingUp, Download, MessageSquare, ExternalLink, Calendar, Search, Filter, ShoppingBag } from 'lucide-react';"
if "import { Star," in content and "ExternalLink" not in import_search:
    pass # we'll just try replacing the lucide import
import_re = re.search(r"import \{ .* \} from 'lucide-react';", content).group(0)
if "ExternalLink" not in import_re:
    content = content.replace(import_re, import_re.replace("}", ", ExternalLink }"))

# Add the Open Google Maps button
old_buttons = """            <div className="flex gap-2">
              <button
                onClick={() => handleExportPDF('Google Maps')}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> PDF Google
              </button>
              <button
                onClick={() => handleExportPDF('Trustpilot')}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> PDF Trustpilot
              </button>
            </div>"""

new_buttons = """            <div className="flex gap-2">
              <button
                onClick={() => window.open(filterStore === 'Alle Filialen' ? 'https://www.google.com/maps/search/HelloTV/' : `https://www.google.com/maps/search/HelloTV+${filterStore}`, '_blank')}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors text-sm"
              >
                <ExternalLink size={16} className="text-blue-500" /> Live Maps
              </button>
              <button
                onClick={() => handleExportPDF('Google Maps')}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> PDF Google
              </button>
              <button
                onClick={() => handleExportPDF('Trustpilot')}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> PDF Trustpilot
              </button>
            </div>"""

content = content.replace(old_buttons, new_buttons)

with open('src/app/components/GoogleReviews.tsx', 'w') as f:
    f.write(content)

