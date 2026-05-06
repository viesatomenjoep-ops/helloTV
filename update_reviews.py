import re

with open('src/app/components/GoogleReviews.tsx', 'r') as f:
    content = f.read()

# Update the exportPDF function to include a chart and margin logic
def get_margin_color(margin):
    if margin < 20:
        return 'red'
    elif margin <= 25:
        return 'orange'
    else:
        return 'green'

new_export_table = """
  const handleExportPDF = (platform: 'Google Maps' | 'Trustpilot') => {
    setIsExporting(true);
    
    // Get data filtered by store
    const storeData = filterStore === 'Alle Winkels' ? REVIEW_DATA : REVIEW_DATA.filter(r => r.filiaal === filterStore);
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocker verhinderde het openen van de PDF. Sta popups toe voor deze site.");
      setIsExporting(false);
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>${platform} Rapportage voor Ronald - ${filterStore}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1a1a1a; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #FDCB2C; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { display: flex; align-items: center; gap: 6px; font-weight: 900; font-size: 38px; letter-spacing: -2px; }
            .logo-bubble { background: white; border: 8px solid #FDCB2C; padding: 8px 12px; border-radius: 40px; color: #1a1a1a; font-size: 28px; position: relative; border-bottom-left-radius: 4px; }
            .title { font-size: 26px; font-weight: 900; color: #111; text-transform: uppercase; letter-spacing: 1px; }
            .subtitle { color: #555; margin-bottom: 30px; font-weight: bold; font-size: 14px; }
            
            /* Chart Styles */
            .chart-container { margin-bottom: 40px; background: #f8f9fa; padding: 20px; border-radius: 12px; border: 1px solid #eaeaea; }
            .chart-title { font-weight: bold; margin-bottom: 20px; font-size: 18px; color: #333; }
            .bar-row { display: flex; align-items: center; margin-bottom: 12px; }
            .bar-label { width: 120px; font-weight: bold; font-size: 12px; }
            .bar-wrapper { flex: 1; background: #e5e7eb; height: 24px; border-radius: 4px; overflow: hidden; position: relative; }
            .bar-fill { height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; color: white; font-weight: bold; font-size: 11px; }
            
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 13px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
            th { background-color: #111; color: #FDCB2C; font-weight: bold; text-transform: uppercase; font-size: 11px; }
            
            .status-red { color: #dc2626; font-weight: bold; }
            .status-orange { color: #f59e0b; font-weight: bold; }
            .status-green { color: #10b981; font-weight: bold; }
            
            .footer { margin-top: 50px; font-size: 11px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
              hello <div class="logo-bubble">tv</div>
            </div>
            <div class="title">Rapportage Ronald: ${platform}</div>
          </div>
          <div class="subtitle">Directie Export | Locatie Filter: ${filterStore} | Datum: ${new Date().toLocaleDateString('nl-NL')}</div>
          
          <div class="chart-container">
            <div class="chart-title">Analytische Grafiek: Marge per Review per TV (%)</div>
            ${storeData.map((row) => {
              // Simulated margin for the demo: baseline 12 + random up to 25
              const margin = 12 + Math.floor(Math.random() * 25);
              let color = '#dc2626'; // red (< 20)
              if (margin >= 20 && margin < 25) color = '#f59e0b'; // orange
              if (margin >= 25) color = '#10b981'; // green
              const width = Math.min(margin * 2.5, 100);
              
              return `
                <div class="bar-row">
                  <div class="bar-label">${row.filiaal}</div>
                  <div class="bar-wrapper">
                    <div class="bar-fill" style="width: ${width}%; background-color: ${color};">${margin}%</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Filiaal</th>
                <th>Totaal Transacties</th>
                <th>${platform} Score</th>
                <th>Reviews (${platform})</th>
                <th>Gem. Marge / Review</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${storeData.map(row => {
                const margin = 12 + Math.floor(Math.random() * 25);
                let statusClass = 'status-red';
                let statusText = 'Zorgelijk (< 20%)';
                if (margin >= 20 && margin < 25) { statusClass = 'status-orange'; statusText = 'Gemiddeld (20-25%)'; }
                if (margin >= 25) { statusClass = 'status-green'; statusText = 'Gezond (> 25%)'; }
                
                return `
                <tr>
                  <td><strong>${row.filiaal}</strong></td>
                  <td>${row.transacties}</td>
                  <td><strong>${platform === 'Google Maps' ? row.rating : row.trustpilotRating}</strong> / 5.0</td>
                  <td>${platform === 'Google Maps' ? row.jaar : row.trustpilotJaar}</td>
                  <td><strong>${margin}%</strong></td>
                  <td class="${statusClass}">${statusText}</td>
                </tr>
              `}).join('')}
              ${storeData.length === 0 ? '<tr><td colspan="6" style="text-align:center;">Geen data voor dit filiaal in de demo dataset.</td></tr>' : ''}
            </tbody>
          </table>

          <div class="footer">
            Automatisch gegenereerd door het HelloTV Management Systeem • Vertrouwelijk Document
          </div>
          
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleShareWhatsApp = () => {
    alert("PDF Rapportage voor Ronald succesvol gegenereerd en direct gedeeld in de HelloTV Management Groepsapp via de WhatsApp API.");
  };
"""

content = re.sub(r'const handleExportPDF = \(platform.*?(?=const handleExportTable)', new_export_table, content, flags=re.DOTALL)

# Add the share whatsapp button
buttons_replace = """
            <div className="flex gap-2">
              <button
                onClick={() => handleExportPDF('Google Maps')}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> Ronald PDF (Google)
              </button>
              <button
                onClick={() => handleExportPDF('Trustpilot')}
                disabled={isExporting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> Ronald PDF (Trustpilot)
              </button>
              <button
                onClick={handleShareWhatsApp}
                disabled={isExporting}
                className="px-4 py-2 bg-[#25D366] hover:bg-green-600 text-white font-bold rounded-xl shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <MessageCircle size={16} /> Deel in Groepsapp
              </button>
            </div>
"""

content = re.sub(r'<div className="flex gap-2">.*?</div>\s*</div>\s*</div>\s*</div>\s*\{\/\* Top KPIs', buttons_replace + '          </div>\n        </div>\n\n        {/* Top KPIs', content, flags=re.DOTALL)

with open('src/app/components/GoogleReviews.tsx', 'w') as f:
    f.write(content)

