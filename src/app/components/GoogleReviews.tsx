import React, { useState } from 'react';
import { Star, MapPin, TrendingUp, Download, MessageCircle, ShoppingCart, ShoppingBag, Search, Server , ExternalLink } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const REVIEW_DATA = [
  { filiaal: 'Alkmaar', week: 32, maand: 130, jaar: 1600, rating: 4.8, trustpilotRating: 4.5, trustpilotJaar: 600, transacties: 650, online: 180, winkel: 370, tickets: 100 },
  { filiaal: 'Amsterdam', week: 45, maand: 180, jaar: 2150, rating: 4.8, trustpilotRating: 4.6, trustpilotJaar: 850, transacties: 890, online: 300, winkel: 450, tickets: 140 },
  { filiaal: 'Apeldoorn', week: 34, maand: 135, jaar: 1620, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 610, transacties: 670, online: 190, winkel: 380, tickets: 100 },
  { filiaal: 'Arnhem', week: 39, maand: 155, jaar: 1850, rating: 4.8, trustpilotRating: 4.7, trustpilotJaar: 720, transacties: 780, online: 210, winkel: 460, tickets: 110 },
  { filiaal: 'Breda', week: 38, maand: 145, jaar: 1820, rating: 4.7, trustpilotRating: 4.5, trustpilotJaar: 620, transacties: 750, online: 200, winkel: 450, tickets: 100 },
  { filiaal: 'Cruquius', week: 28, maand: 110, jaar: 1350, rating: 4.6, trustpilotRating: 4.4, trustpilotJaar: 510, transacties: 550, online: 150, winkel: 320, tickets: 80 },
  { filiaal: 'Den Bosch', week: 42, maand: 165, jaar: 1980, rating: 4.8, trustpilotRating: 4.7, trustpilotJaar: 780, transacties: 810, online: 220, winkel: 480, tickets: 110 },
  { filiaal: 'Den Haag', week: 46, maand: 185, jaar: 2200, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 880, transacties: 920, online: 310, winkel: 480, tickets: 130 },
  { filiaal: 'Eindhoven', week: 52, maand: 210, jaar: 2400, rating: 4.9, trustpilotRating: 4.8, trustpilotJaar: 1100, transacties: 1100, online: 400, winkel: 600, tickets: 100 },
  { filiaal: 'Groningen', week: 39, maand: 155, jaar: 1850, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 720, transacties: 780, online: 210, winkel: 460, tickets: 110 },
  { filiaal: 'Heerlen', week: 25, maand: 100, jaar: 1200, rating: 4.8, trustpilotRating: 4.5, trustpilotJaar: 450, transacties: 500, online: 140, winkel: 280, tickets: 80 },
  { filiaal: 'Leeuwarden', week: 22, maand: 90, jaar: 1100, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 410, transacties: 460, online: 130, winkel: 260, tickets: 70 },
  { filiaal: 'Nijmegen', week: 40, maand: 158, jaar: 1900, rating: 4.6, trustpilotRating: 4.5, trustpilotJaar: 740, transacties: 790, online: 230, winkel: 450, tickets: 110 },
  { filiaal: 'Rotterdam', week: 48, maand: 195, jaar: 2300, rating: 4.8, trustpilotRating: 4.7, trustpilotJaar: 950, transacties: 980, online: 350, winkel: 500, tickets: 130 },
  { filiaal: 'Tilburg', week: 37, maand: 148, jaar: 1780, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 680, transacties: 740, online: 190, winkel: 440, tickets: 110 },
  { filiaal: 'Utrecht', week: 44, maand: 175, jaar: 2100, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 890, transacties: 880, online: 280, winkel: 500, tickets: 100 },
  { filiaal: 'Zoeterwoude', week: 33, maand: 135, jaar: 1650, rating: 4.8, trustpilotRating: 4.7, trustpilotJaar: 640, transacties: 690, online: 180, winkel: 410, tickets: 100 },
  { filiaal: 'Zwolle', week: 36, maand: 142, jaar: 1700, rating: 4.7, trustpilotRating: 4.6, trustpilotJaar: 660, transacties: 710, online: 190, winkel: 420, tickets: 100 },
];

const TREND_DATA = [
  { week: 'Wk 10', reviews: 240, transacties: 4500 },
  { week: 'Wk 11', reviews: 255, transacties: 4700 },
  { week: 'Wk 12', reviews: 268, transacties: 4850 },
  { week: 'Wk 13', reviews: 280, transacties: 5100 },
  { week: 'Wk 14', reviews: 295, transacties: 5350 },
  { week: 'Wk 15', reviews: 310, transacties: 5600 },
];

const LIVE_REVIEWS = [
  { id: 1, source: 'Google Maps', author: 'Jan K.', rating: 5, filiaal: 'Alkmaar', date: 'Zojuist', text: 'Geweldig geholpen door Max met onze nieuwe OLED tv. Helemaal top!', verkoper: 'Max' },
  { id: 2, source: 'Trustpilot', author: 'Sanne de Vries', rating: 4, filiaal: 'Amsterdam', date: '1 uur geleden', text: 'Goede service in de winkel. Lisa gaf eerlijk advies over de kabels.', verkoper: 'Lisa' },
  { id: 3, source: 'Google Maps', author: 'Peter Bos', rating: 5, filiaal: 'Eindhoven', date: '3 uur geleden', text: 'Daan heeft ons perfect geholpen. Wist echt alles van de nieuwe Samsung modellen. Bedankt Daan!', verkoper: 'Daan' },
  { id: 4, source: 'Trustpilot', author: 'Mevr. Jansen', rating: 5, filiaal: 'Breda', date: 'Vandaag', text: 'Prachtige winkel. Tom was erg geduldig en heeft alles aangesloten.', verkoper: 'Tom' },
  { id: 5, source: 'Google Maps', author: 'Mohammed A.', rating: 5, filiaal: 'Rotterdam', date: 'Vandaag', text: 'Supersnel geholpen door Kevin. Gelijk de goede muurbeugel erbij gekregen.', verkoper: 'Kevin' },
];

const TOP_REVIEW_SELLERS = [
  { naam: 'Daan', filiaal: 'Eindhoven', reviews: 45, score: 4.9 },
  { naam: 'Lisa', filiaal: 'Amsterdam', reviews: 38, score: 4.8 },
  { naam: 'Max', filiaal: 'Alkmaar', reviews: 32, score: 4.9 },
  { naam: 'Tom', filiaal: 'Breda', reviews: 28, score: 4.7 },
  { naam: 'Kevin', filiaal: 'Rotterdam', reviews: 25, score: 4.6 }
];

export function GoogleReviews() {
  const [isExporting, setIsExporting] = useState(false);
  const [filterStore, setFilterStore] = useState('Alle Winkels');
  
  const STORES = ['Alle Winkels', ...REVIEW_DATA.map(r => r.filiaal).sort()];

  
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
const handleExportTable = () => {
    setIsExporting(true);
    const storeData = filterStore === 'Alle Winkels' ? REVIEW_DATA : REVIEW_DATA.filter(r => r.filiaal === filterStore);
    
    // Calculate totals
    const totalTransacties = storeData.reduce((acc, row) => acc + row.transacties, 0);
    const totalWinkel = storeData.reduce((acc, row) => acc + row.winkel, 0);
    const totalOnline = storeData.reduce((acc, row) => acc + row.online, 0);
    const totalTickets = storeData.reduce((acc, row) => acc + row.tickets, 0);
    const totalReviews = storeData.reduce((acc, row) => acc + row.jaar, 0);
    const avgRating = storeData.length > 0 ? (storeData.reduce((acc, row) => acc + row.rating, 0) / storeData.length).toFixed(1) : "0.0";
    const avgTrustpilot = storeData.length > 0 ? (storeData.reduce((acc, row) => acc + row.trustpilotRating, 0) / storeData.length).toFixed(1) : "0.0";

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocker verhinderde het openen van de PDF. Sta popups toe voor deze site.");
      setIsExporting(false);
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>Kanaalsplitsing Rapportage - ${filterStore}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1a1a1a; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #FDCB2C; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { display: flex; align-items: center; gap: 6px; font-weight: 900; font-size: 38px; letter-spacing: -2px; }
            .logo-bubble { background: white; border: 8px solid #FDCB2C; padding: 8px 12px; border-radius: 40px; color: #1a1a1a; font-size: 28px; position: relative; border-bottom-left-radius: 4px; }
            .title { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .subtitle { color: #666; margin-bottom: 20px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 14px; }
            th, td { padding: 12px; text-align: right; border-bottom: 1px solid #eee; }
            th:first-child, td:first-child { text-align: left; }
            th { background-color: #f8f9fa; font-weight: bold; color: #555; text-transform: uppercase; font-size: 11px; }
            .total-row td { font-weight: bold; border-top: 2px solid #333; background-color: #f8f9fa; }
            .footer { margin-top: 50px; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">hello <div class="logo-bubble">tv</div></div>
            <div class="title">Kanaalsplitsing & Reviews Rapportage</div>
          </div>
          <div class="subtitle">Locatie Filter: ${filterStore} | Datum: ${new Date().toLocaleDateString('nl-NL')}</div>
          
          <table>
            <thead>
              <tr>
                <th>Filiaal</th>
                <th>Totaal Transacties</th>
                <th>Winkel Orders</th>
                <th>Online / Webshop</th>
                <th>Tickets / Order Desk</th>
                <th>Totaal Reviews (Jaar)</th>
                <th>Google Score</th>
                <th>Trustpilot Score</th>
              </tr>
            </thead>
            <tbody>
              ${storeData.map(row => `
                <tr>
                  <td><strong>${row.filiaal}</strong></td>
                  <td>${row.transacties}</td>
                  <td>${row.winkel}</td>
                  <td>${row.online}</td>
                  <td>${row.tickets}</td>
                  <td>${row.jaar}</td>
                  <td>${row.rating}</td>
                  <td>${row.trustpilotRating}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td>TOTAAL</td>
                <td>${totalTransacties}</td>
                <td>${totalWinkel}</td>
                <td>${totalOnline}</td>
                <td>${totalTickets}</td>
                <td>${totalReviews}</td>
                <td>${avgRating}</td>
                <td>${avgTrustpilot}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">Automatisch gegenereerd door het HelloTV Management Systeem • Vertrouwelijk</div>
          <script>window.onload = function() { window.print(); window.close(); }</script>
        </body>
      </html>
    `;
    
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Star className="text-yellow-500" size={36} fill="currentColor" />
              Google Maps & Trustpilot Live Reviews
            </h1>
            <p className="text-gray-600">
              Live data koppeling met Google & Trustpilot API: Reviews gekoppeld aan transacties.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <MapPin size={18} className="text-gray-400" />
              <select
                value={filterStore}
                onChange={(e) => setFilterStore(e.target.value)}
                className="bg-transparent font-bold text-gray-700 outline-none w-40"
              >
                {STORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
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
            </div>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <Star size={24} fill="currentColor" />
              </div>
              <span className="text-green-500 font-bold text-sm">+12% vs Wk 14</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">4.8</h3>
            <p className="text-gray-500 font-medium mt-1">Gemiddelde Rating (Landelijk)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <MessageCircle size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">+54 deze week</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">310</h3>
            <p className="text-gray-500 font-medium mt-1">Reviews deze week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <ShoppingCart size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">Target gehaald</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">5.600</h3>
            <p className="text-gray-500 font-medium mt-1">Transacties deze week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Server size={24} />
              </div>
              <span className="text-green-500 font-bold text-sm">Live Sync</span>
            </div>
            <h3 className="text-3xl font-black text-gray-800">5.4%</h3>
            <p className="text-gray-500 font-medium mt-1">Conversie (Review / Transactie)</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart: Reviews per filiaal */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-500" /> Reviews per Filiaal (Deze Week vs Maand)
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVIEW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="filiaal" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="week" name="Reviews (Week)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maand" name="Reviews (Maand)" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart: Trend */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Correlatie: Reviews vs Transacties
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="reviews" name="Reviews" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="transacties" name="Transacties" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Live Reviews & Verkoper Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Live Reviews Feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <MessageCircle className="text-blue-500" /> Live Review Feed
              </h2>
              <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full animate-pulse">Live API Sync</span>
            </div>
            <div className="divide-y divide-gray-100">
              {LIVE_REVIEWS.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).map(review => (
                <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{review.author}</span>
                        <span className="text-xs text-gray-400">• {review.date}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          review.source === 'Google Maps' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {review.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i >= review.rating ? 'text-gray-300' : ''} />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-500 flex items-center gap-1 justify-end">
                        <MapPin size={12} /> {review.filiaal}
                      </div>
                      {review.verkoper && (
                        <div className="mt-1 text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                          Verkoper: {review.verkoper}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                </div>
              ))}
              {LIVE_REVIEWS.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).length === 0 && (
                <div className="p-6 text-center text-gray-500 font-medium">Geen reviews gevonden voor dit filiaal in de live feed.</div>
              )}
            </div>
          </div>

          {/* Top Review Sellers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Star className="text-yellow-500" /> Top Review Verkopers
              </h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Verkoper</th>
                    <th className="px-4 py-3 text-center">Reviews</th>
                    <th className="px-4 py-3 text-center">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TOP_REVIEW_SELLERS.filter(s => filterStore === 'Alle Winkels' || s.filiaal === filterStore).map((seller, idx) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : <span className="w-4 text-center text-gray-400">{idx + 1}</span>}
                          {seller.naam}
                        </div>
                        <div className="text-xs text-gray-500 ml-6">{seller.filiaal}</div>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-blue-600">{seller.reviews}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center gap-1 font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                          <Star size={12} fill="currentColor" /> {seller.score}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {TOP_REVIEW_SELLERS.filter(s => filterStore === 'Alle Winkels' || s.filiaal === filterStore).length === 0 && (
                    <tr><td colSpan={3} className="px-4 py-4 text-center text-gray-500">Geen verkopers gevonden.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Datatable: Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Server className="text-gray-500" /> Transactie Splitsing per Kanaal
            </h2>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Zoek filiaal..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button
                onClick={handleExportTable}
                disabled={isExporting}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 text-sm"
              >
                <Download size={16} /> Exporteer PDF (Totalen)
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Filiaal</th>
                  <th className="px-6 py-4 text-center">Totaal Transacties</th>
                  <th className="px-6 py-4 text-center">Winkel Orders</th>
                  <th className="px-6 py-4 text-center">Online / Webshop</th>
                  <th className="px-6 py-4 text-center">Tickets / Order Desk</th>
                  <th className="px-6 py-4 text-center">Totaal Reviews (Jaar)</th>
                  <th className="px-6 py-4 text-center">Gem. Score</th>
                  <th className="px-6 py-4 text-center">Trustpilot Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{row.filiaal}</td>
                    <td className="px-6 py-4 text-center font-bold">{row.transacties}</td>
                    <td className="px-6 py-4 text-center text-blue-600">{row.winkel}</td>
                    <td className="px-6 py-4 text-center text-purple-600">{row.online}</td>
                    <td className="px-6 py-4 text-center text-orange-600">{row.tickets}</td>
                    <td className="px-6 py-4 text-center font-medium">{row.jaar}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg w-16 mx-auto">
                        <Star size={12} fill="currentColor" /> {row.rating}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg w-16 mx-auto">
                        <Star size={12} fill="currentColor" /> {row.trustpilotRating}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Totaal Rij */}
                <tr className="bg-gray-50 border-t-2 border-gray-300">
                  <td className="px-6 py-4 font-black text-gray-900 uppercase">Totaal</td>
                  <td className="px-6 py-4 text-center font-black">
                    {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.transacties, 0)}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-blue-600">
                    {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.winkel, 0)}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-purple-600">
                    {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.online, 0)}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-orange-600">
                    {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.tickets, 0)}
                  </td>
                  <td className="px-6 py-4 text-center font-black">
                    {REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.jaar, 0)}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-yellow-600">
                    {(REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.rating, 0) / (REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).length || 1)).toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-center font-black text-green-600">
                    {(REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).reduce((acc, r) => acc + r.trustpilotRating, 0) / (REVIEW_DATA.filter(r => filterStore === 'Alle Winkels' || r.filiaal === filterStore).length || 1)).toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
